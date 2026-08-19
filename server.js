import { createServer as createHttpServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, resolve } from 'node:path';

const AUTHORIZATION_CODE = 'xai66';
const port = Number(process.env.PORT || 4173);

const staticRoot = resolve('dist');
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

function serveApp(req, res) {
  const pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname);
  const requested = resolve(staticRoot, pathname === '/' ? 'index.html' : `.${pathname}`);
  const safeFile = requested.startsWith(staticRoot) && existsSync(requested) && statSync(requested).isFile()
    ? requested
    : resolve(staticRoot, 'index.html');

  res.writeHead(200, {
    'Content-Type': contentTypes[extname(safeFile)] || 'application/octet-stream',
    'Cache-Control': 'no-store',
  });
  createReadStream(safeFile).pipe(res);
}

const server = createHttpServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/authorize') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      try {
        const { code } = JSON.parse(body || '{}');
        const authorized = typeof code === 'string' && code === AUTHORIZATION_CODE;
        res.writeHead(authorized ? 200 : 401, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ authorized }));
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ authorized: false }));
      }
    });
    return;
  }
  serveApp(req, res);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Moonlight Town is running at http://127.0.0.1:${port}`);
});
