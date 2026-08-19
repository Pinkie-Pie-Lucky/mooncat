import './styles.css';
import desktopResultBackground from './assets/result-envelope-background.png';
import mobileResultBackground from './assets/mobile-result-envelope.png';

const catAssets = import.meta.glob('./assets/cats/*.png', { eager: true, query: '?url', import: 'default' });

const questions = [
  { title: '会呼噜的树屋', text: '雾气漫过月亮小镇。树屋的门轻轻打开，里面传来柔软的呼噜声。你会……', axis: 'home', options: ['抱着靠垫坐到最里面，听雨滴跳舞。', '找一只熟悉的猫并肩坐下，分一块栗子蛋糕。', '把门留一条缝，邀请路过的猫也进来暖一暖。'] },
  { title: '银匙小巷', text: '你在石阶上捡到一把发亮的小银匙。它似乎能打开某一扇门。你会……', axis: 'explore', options: ['先收进口袋，等一个安心的时机。', '沿着门牌慢慢找，看看它属于哪里。', '循着银光跑去，马上试试它能打开什么。'] },
  { title: '口袋里的小月亮', text: '口袋里的小月亮突然变得沉甸甸的。你想让它轻一点，于是……', axis: 'heart', options: ['安静看着它，等心里的潮水慢慢退去。', '把感受写在一片叶子上，理一理再放走。', '找来线、纸和胶水，替它做一个轻巧的盒子。'] },
  { title: '温暖传递晚会', text: '广场正在举办“把温暖传下去”的晚会。你会……', axis: 'tail', options: ['坐在边缘，悄悄替大家记住好看的瞬间。', '向认识的人招招手，加入一小圈聊天。', '端起热可可，先去问有没有谁还没被照顾到。'] },
  { title: '月光列车', text: '末班月光列车只剩一节空车厢。窗外有一整片会发亮的湖。你想……', axis: 'home', options: ['一个人靠窗坐好，听轨道轻轻唱歌。', '留一个位置给可能上车的好朋友。', '在车厢里摆好点心，等大家一起看湖。'] },
  { title: '萤火虫岔路口', text: '三条路通向不同的地方：面包香、薄雾、会唱歌的远山。你会……', axis: 'explore', options: ['走向最熟悉的面包香。', '先看看星图，再慢慢决定。', '跟上最先飞起的萤火虫。'] },
  { title: '失眠的湖', text: '湖水今晚睡不着，倒映着你心里没说出口的话。你会……', axis: 'heart', options: ['在岸边陪它坐一会儿，什么也不急着说。', '捡几颗鹅卵石，给每句话取一个名字。', '折一只纸船，把心事送到湖的另一边。'] },
  { title: '猫咪邮局', text: '一封没有署名的信落在你手上。邮差黑猫犹豫着看向人群。你会……', axis: 'tail', options: ['等它愿意开口时，再轻声问一句。', '陪它一起找线索，看看谁在等这封信。', '主动帮它询问每一扇亮着的窗。'] },
  { title: '倒流的时钟塔', text: '时钟塔把时间倒回了一小会儿。你获得一个自由的傍晚，会……', axis: 'home', options: ['回到自己的小角落，好好发一会儿呆。', '约最亲近的人散一段慢慢的步。', '把晚餐桌多摆几副餐具，等朋友来。'] },
  { title: '会唱歌的地图', text: '地图唱起一段从没听过的旋律，指向小镇外一座没有名字的山。你会……', axis: 'explore', options: ['把旋律记下来，等准备妥当再出发。', '问问去过那里的人，带好该带的东西。', '披上外套就走，路上再慢慢认识它。'] },
  { title: '忘忧花圃', text: '花圃里的花只会在被理解时开放。面对一朵紧闭的花，你会……', axis: 'heart', options: ['坐在它身边，等它自己愿意抬头。', '观察它喜欢的光和水，慢慢照料。', '唱一首新的歌，试试看能不能逗它开心。'] },
  { title: '灯塔坡的风', text: '风把好多猫咪的围巾吹乱了。远处的灯塔刚好亮起。你会……', axis: 'tail', options: ['把自己的围巾压好，静静看灯塔转一圈。', '帮身边那只猫理一理打结的围巾。', '跑去坡顶，举起一盏灯替大家指路。'] }
];

const results = [
  ['奶油云猫','云朵巷','它把你藏进一朵温温软软的云里。你不必马上好起来。','让疲惫的人拥有一小块可以安心蜷起的云。'],
  ['窗台白袜猫','云朵巷','它每天在窗边为你留一束月光，静静等你回头。','把安静的等待变成可靠的陪伴。'],
  ['枕头月猫','云朵巷','它有一对像月牙枕头的耳朵，最懂得接住心事。','替过重的念头垫上一层柔软。'],
  ['雾铃铛猫','云朵巷','它走过时没有声音，铃铛却会为你响一响。','在不打扰里递来刚好的安慰。'],
  ['星灯探险猫','星轨站','它背着装满星屑的小包，邀请你去看下一段路。','把未知照成可以靠近的光。'],
  ['纸飞机狸花猫','星轨站','它把犹豫折成纸飞机，从屋顶飞向远方。','替你把第一步送出去。'],
  ['彗尾橘猫','星轨站','它拖着亮晶晶的尾巴，总能发现新方向。','让平凡的路口出现惊喜。'],
  ['望远镜小黑猫','星轨站','它先用望远镜确认星图，再勇敢出发。','让好奇心也带着一点笃定。'],
  ['雨滴小巫猫','雨巫街','它把雨声装进玻璃瓶，替你听懂没说出口的话。','把难过调成一场会停的雨。'],
  ['蓝墨水猫','雨巫街','它的爪垫总沾着蓝墨水，写得出心里的天气。','把模糊的感受变成可以读的信。'],
  ['蘑菇伞猫','雨巫街','它把伞撑在你的沉默上方，陪你等雨过去。','给敏感的人留一处不淋雨的地方。'],
  ['月桂占星猫','雨巫街','它从星星排列里，读出你藏起来的小愿望。','替直觉找到温柔的名字。'],
  ['蜂蜜茶屋猫','蜂蜜广场','它经营一间永远有空位的小茶屋。','让陌生人也感到被欢迎。'],
  ['围巾三花猫','蜂蜜广场','它的围巾很长，总会多绕一圈给身边的人。','把分享变成刚刚好的温度。'],
  ['铃铛招待猫','蜂蜜广场','它一摇铃铛，所有落单的猫都会被邀请进来。','听见那些轻轻的、需要回应的声音。'],
  ['烤栗子虎斑猫','蜂蜜广场','它的口袋里藏着热乎乎的烤栗子和一句“你还好吗”。','把照顾落在实实在在的小事上。'],
  ['黑猫邮差','灯塔坡','它走过长长夜路，只为把写给你的信准时送到。','把承诺带过所有黑夜。'],
  ['灯塔守夜猫','灯塔坡','它替月亮看守灯塔，也替你守住边界。','让迷路的人看见回家的方向。'],
  ['银钥匙猫','灯塔坡','它把重要的门锁好，也把值得的人请进来。','用清醒守护珍贵的心。'],
  ['月台灰猫','灯塔坡','它总在列车到站前等着，安静又可靠。','让每一段告别和重逢都有着落。']
];

const root = document.getElementById('root');
let step = 0;
let answers = [];
const cat = (tone = '') => `<div class="cat-mark ${tone}" aria-hidden="true"><i></i><b></b><em></em></div>`;
const intro = () => `<main class="app intro cover-page"><button id="start-quiz" class="cover-start" aria-label="打开来信，开始测试" disabled><span>打开来信，开始测试</span></button><div class="auth-scrim"><form class="auth-modal" id="auth-form" autocomplete="off"><p class="auth-overline">MOONLIGHT TOWN · ENTRY LETTER</p><h2>请出示月光授权码</h2><p>猫咪邮差会替你核对来信。</p><label for="auth-code">授权码</label><input id="auth-code" name="authorization-token" type="text" inputmode="text" autocomplete="one-time-code" data-lpignore="true" data-1p-ignore="true" spellcheck="false" placeholder="输入授权码" required><p class="auth-error" id="auth-error" role="alert"></p><button type="submit">核对来信 <span>→</span></button></form></div></main>`;
function renderIntro(){ root.innerHTML = intro(); const start=document.getElementById('start-quiz'); const form=document.getElementById('auth-form'); const error=document.getElementById('auth-error'); form.addEventListener('submit',async(event)=>{event.preventDefault(); const submit=form.querySelector('[type="submit"]'); submit.disabled=true; error.textContent='正在核对月光邮戳……'; try{const response=await fetch('/api/authorize',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code:new FormData(form).get('authorization-token')})}); if(!response.ok) throw new Error('invalid'); document.querySelector('.auth-scrim').remove(); start.disabled=false; start.focus(); }catch{error.textContent='这枚授权码没有通过核对，请再试一次。';}finally{submit.disabled=false;}}); start.addEventListener('click', renderQuiz); }
function renderQuiz(){ const q=questions[step]; root.innerHTML=`<main class="app quiz"><div class="moon small"></div><div class="stars"></div><header><button class="back" id="back" aria-label="返回上一题">←</button><div class="progress"><i style="width:${(step/questions.length)*100}%"></i></div><span>${String(step+1).padStart(2,'0')} / 12</span></header><section class="question-card"><div class="chapter">第 ${step+1} 站</div><h1>${q.title}</h1><p>${q.text}</p><div class="options">${q.options.map((option,index)=>`<button data-choice="${index}"><b>${String.fromCharCode(65+index)}</b><span>${option}</span><i>→</i></button>`).join('')}</div></section><footer>${cat('mist')}<span>月亮正在替你收集脚印</span></footer></main>`; document.getElementById('back').addEventListener('click',()=>{if(step===0) renderIntro(); else {step--;answers.pop();renderQuiz();}}); root.querySelectorAll('[data-choice]').forEach(button=>button.addEventListener('click',()=>{answers.push({axis:q.axis,value:Number(button.dataset.choice)+1}); if(step===questions.length-1) renderResult(); else {step++;renderQuiz();}})); }
function renderResult(){ const totals={home:0,explore:0,heart:0,tail:0}; answers.forEach(({axis,value})=>totals[axis]+=value); const district=totals.explore>=7?1:totals.heart<=4?4:totals.tail>=7?3:totals.home<=4?0:2; const record=district*4+(totals.home+totals.explore*2+totals.heart*3+totals.tail)%4+1; const result=results[record-1]; const catImage=Object.entries(catAssets).find(([path])=>path.includes(`No${String(record).padStart(2,'0')}${result[0]}.png`))?.[1]; const scenes=['它在月桂树下拍松一朵云，听见你脚步里想休息的叹息。','它在星轨站擦亮星灯，照见你望向远方又有点犹豫的眼睛。','它在雨棚下收集不同声音的雨滴，认出你细微而真诚的感受。','它在蜂蜜广场留好一只茶杯，发现你总能让人安心靠近。','它提着灯走过长长夜路，认出你认真守护的承诺。']; const background=window.matchMedia('(max-width: 700px)').matches?mobileResultBackground:desktopResultBackground; root.innerHTML=`<main class="app result result-scene" style="background-image:url('${background}')"><section class="result-letter">${catImage?`<img class="result-cat-illustration" src="${catImage}" alt="${result[0]}">`:''}<div class="letter-top"><span>MOONLIGHT TOWN</span><span>收留来信 · No. ${String(record).padStart(2,'0')}</span></div><div class="postmark">月<br>光</div><div class="result-cat">${cat('coral')}</div><p class="letter-kicker">今夜，月亮替你找到了</p><h1>${result[0]}</h1><p class="district">来自 ${result[1]}</p><div class="gold-rule">✦</div><div class="letter-lines"><p><b>你们相遇的地方：</b>${scenes[district]}</p><p><b>今夜的你：</b>${result[2]}</p><p><b>它会怎样陪你：</b>它不催你说话，只把尾巴轻轻搭在你的手背上，陪你把这一段月光慢慢走完。</p><p><b>它的专属小魔法：</b>${result[3]}</p></div><blockquote>“今晚不用赶路。<br>我会陪你把月光走完。”</blockquote><div class="certificate"><b>月亮小镇收留凭证</b><span>称号：${result[1]}的月光旅人</span><span>陪伴有效期：每一个想回家的夜晚</span></div></section></main>`; const stage=root.querySelector('.result-scene'); const image=new Image(); const reveal=()=>stage.classList.add('result-ready'); image.onload=reveal; image.onerror=reveal; image.src=background; if(image.complete) reveal(); }
renderIntro();
