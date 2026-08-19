// Vercel Serverless Function: this file is deployed separately from the Vite app.
// Keep the code on the server, never in src/.
const authorizationCode = process.env.MOONCAT_AUTH_CODE || 'xai66';

export default function authorize(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ authorized: false });
  }

  const { code } = req.body || {};
  const authorized = typeof code === 'string' && code === authorizationCode;
  return res.status(authorized ? 200 : 401).json({ authorized });
}
