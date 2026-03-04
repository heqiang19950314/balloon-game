// ===== 100句治愈语录库 =====
const QUOTES = [
  "你已经做得很好了，真的。",
  "慢一点没关系，方向对就行。",
  "今天先活着，就已经很勇敢。",
  "别急，你会一步步把日子过好的。",
  "允许自己不完美，这是成长。",
  "情绪上来时，先喝口水。",
  "你不是懒，你只是累了。",
  "世界很大，你的烦恼会变小。",
  "把今天过完，就很了不起。",
  "你值得被温柔以待。",
  "不要用别人的节奏惩罚自己。",
  "你已经在变强了，只是你没察觉。",
  "别把一次失误当成全部。",
  "先休息，再继续。",
  "你不需要一直证明自己。",
  "能撑到现在，你真的很厉害。",
  "允许自己偶尔崩一下。",
  "你没有落后，你在积蓄力量。",
  "焦虑不是你差，是你太在乎。",
  "今天的你，也值得夸奖。",
  "你可以不坚强，但你可以继续。",
  "很多事会过去的，像风一样。",
  "你正在经历的，会变成你的底气。",
  "先把呼吸放慢。",
  "你不是一个人。",
  "你已经比昨天更好一点。",
  "别把自己逼到墙角。",
  "把注意力还给自己。",
  "你做不到也没关系，你还在学习。",
  "你不必讨好所有人。",
  "有些路慢一点，反而更稳。",
  "你可以选择善待自己。",
  "你不是失败，你只是累了。",
  "没关系，人生不是竞速。",
  "你值得拥有轻松的夜晚。",
  "今天先到这里就好。",
  "你可以暂停，但别放弃。",
  "你不是问题本身，你只是遇到问题。",
  "你会走出这段阴天的。",
  "把心放回身体里。",
  "你可以哭，但别否定自己。",
  "你正在变得更成熟。",
  "明天的你会感谢现在没放弃的你。",
  "别怕，你在路上。",
  "你已经尽力了。",
  "世界不需要你一直满分。",
  "你可以慢慢来。",
  "你的存在本身就有价值。",
  "今天的小胜利，也算胜利。",
  "先把这一口气顺过去。",
  "你不是玻璃，你会更坚固。",
  "允许自己脆弱，这是人性。",
  "你会遇到更好的自己。",
  "压力不是敌人，压垮才是。",
  "把‘必须’换成‘可以’。",
  "你可以选择不回应。",
  "你无需为别人的情绪负责。",
  "你正在把人生过成你想要的样子。",
  "你也可以被照顾。",
  "别急着否定明天。",
  "你会拥有属于你的好运。",
  "今天先把自己抱紧一点。",
  "你能扛住的，比你以为的多。",
  "你值得被理解。",
  "你的努力不会白费。",
  "别把自己当机器。",
  "你不是孤岛，你会被看见。",
  "情绪会来，也会走。",
  "你已经很勇敢了。",
  "你的节奏，就是最好的节奏。",
  "你可以给自己一次机会。",
  "把今天的你，先安放好。",
  "别用最狠的话对自己。",
  "你在变好，只是过程很慢。",
  "你不是不行，你只是还没到。",
  "你可以不强大，但你可以真实。",
  "你值得拥有被肯定的时刻。",
  "先吃饭，先睡觉，先把身体照顾好。",
  "你不需要一直赢。",
  "你可以选择把难题拆小一点。",
  "今天做不到，明天再试。",
  "你已经走了很远。",
  "你没有浪费时间，你在生活。",
  "你不必解释给所有人听。",
  "你可以把自己放在第一位。",
  "你值得一个轻松的结局。",
  "你会遇到懂你的人。",
  "你会在某一天突然轻松很多。",
  "你会拥有平静的力量。",
  "你值得一个好消息。",
  "你做得比想象中好。",
  "你不需要一直扛。",
  "你可以求助，这不是软弱。",
  "把今天交给时间。",
  "你已经很棒了。",
  "别怕慢，怕的是停。",
  "你会有新的开始。",
  "你是值得被爱的人。",
  "去睡吧，明天再战。",
  "先活下去，其他慢慢来。",
  "你会好起来的，真的。",
  "你可以把烦恼先放一放。",
  "你不是没用，你只是没被看见。",
  "你值得被温柔地拥抱。"
];

// ===== DOM =====
const stage = document.getElementById("stage");
const balloon = document.getElementById("balloon");
const toast = document.getElementById("toast");
const quoteEl = document.getElementById("quote");
const againBtn = document.getElementById("againBtn");
const posterBtn = document.getElementById("posterBtn");
const hint = document.getElementById("hint");
const todayCountEl = document.getElementById("todayCount");
const streakEl = document.getElementById("streak");

const rankBtn = document.getElementById("rankBtn");
const rankPanel = document.getElementById("rankPanel");
const rankList = document.getElementById("rankList");
const rankMeta = document.getElementById("rankMeta");
const closeRank = document.getElementById("closeRank");

const posterModal = document.getElementById("posterModal");
const posterCanvas = document.getElementById("posterCanvas");
const closePoster = document.getElementById("closePoster");
const downloadPoster = document.getElementById("downloadPoster");
const copyLink = document.getElementById("copyLink");
const copyTip = document.getElementById("copyTip");

// 闪光层
const flash = document.createElement("div");
flash.className = "flash";
stage.appendChild(flash);

// ===== 数据（本地版）=====
const STORAGE_KEY = "balloon_game_v1";
const state = loadState();

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return initState();
    const s = JSON.parse(raw);
    return { ...initState(), ...s };
  }catch{
    return initState();
  }
}
function initState(){
  return {
    today: ymd(new Date()),
    todayCount: 0,
    bestToday: 0,
    streak: 0,
    history: [] // [{date, count}]
  };
}
function save(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function ymd(d){
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth()+1).padStart(2,"0");
  const dd = String(d.getDate()).padStart(2,"0");
  return `${yyyy}-${mm}-${dd}`;
}

// 刷新“今日/连续”
function refreshDaily(){
  const today = ymd(new Date());
  if(state.today !== today){
    // 结算昨天
    state.history.push({ date: state.today, count: state.todayCount });
    // 更新连续天数
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    const y = ymd(yesterday);
    if(state.today === y && state.todayCount > 0){
      state.streak = (state.streak || 0) + 1;
    }else{
      // 如果昨天没有玩，或断了
      state.streak = state.todayCount > 0 ? 1 : 0;
    }
    state.today = today;
    state.todayCount = 0;
  }
  // bestToday
  state.bestToday = Math.max(state.bestToday || 0, state.todayCount);
  save();
  todayCountEl.textContent = state.todayCount;
  streakEl.textContent = state.streak || 0;
}
refreshDaily();

// ===== 爆气球逻辑 =====
let lastQuote = "";
balloon.addEventListener("click", () => popBalloon());
balloon.addEventListener("touchstart", (e) => {
  // 防止双触发
  e.preventDefault();
  popBalloon();
}, {passive:false});

againBtn.addEventListener("click", () => resetBalloon());
posterBtn.addEventListener("click", () => openPoster());

function popBalloon(){
  if(balloon.dataset.popping === "1") return;
  balloon.dataset.popping = "1";

  hint.style.display = "none";

  // 计数
  refreshDaily();
  state.todayCount += 1;
  state.bestToday = Math.max(state.bestToday || 0, state.todayCount);
  save();
  todayCountEl.textContent = state.todayCount;

  // 随机语录
  lastQuote = QUOTES[Math.floor(Math.random()*QUOTES.length)];
  quoteEl.textContent = `“${lastQuote}”`;

  // 爆炸动画：气球缩放消失 + 粒子 + 闪光
  balloon.style.animation = "none";
  balloon.style.animation = "pop .18s ease-out forwards";

  triggerFlash();
  spawnParticles(balloonCenter(), 36);
  shakeStage();
  vibrate();

  toast.hidden = false;
  balloon.style.pointerEvents = "none";
}

function resetBalloon(){
  balloon.dataset.popping = "0";
  balloon.style.animation = "";
  balloon.style.opacity = "1";
  balloon.style.transform = "translate(-50%,-50%)";
  balloon.style.pointerEvents = "auto";
  toast.hidden = true;
  hint.style.display = "block";

  // 重新浮动
  requestAnimationFrame(()=> balloon.style.animation = "float 2.6s ease-in-out infinite");
}

function balloonCenter(){
  const rect = balloon.getBoundingClientRect();
  const st = stage.getBoundingClientRect();
  return {
    x: rect.left - st.left + rect.width/2,
    y: rect.top - st.top + rect.height*0.42
  };
}

function triggerFlash(){
  flash.classList.remove("on");
  // 重新触发
  void flash.offsetWidth;
  flash.classList.add("on");
}

function spawnParticles(origin, count){
  for(let i=0;i<count;i++){
    const p = document.createElement("div");
    p.className = "particle";
    // 随机颜色（不指定一套固定色，避免太“死板”）
    const hue = Math.floor(Math.random()*360);
    p.style.background = `hsla(${hue}, 95%, 70%, .95)`;

    stage.appendChild(p);

    const angle = Math.random()*Math.PI*2;
    const dist = 80 + Math.random()*160;
    const dx = Math.cos(angle)*dist;
    const dy = Math.sin(angle)*dist;

    p.style.left = `${origin.x}px`;
    p.style.top = `${origin.y}px`;
    p.style.transform = `translate(-50%,-50%)`;

    const duration = 420 + Math.random()*260;
    const start = performance.now();

    function tick(t){
      const k = Math.min(1, (t-start)/duration);
      const ease = 1 - Math.pow(1-k, 3);
      const x = dx*ease;
      const y = dy*ease + 60*k; // 下落
      const s = 1 - 0.6*k;
      p.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${s})`;
      p.style.opacity = String(1-k);
      if(k<1){
        requestAnimationFrame(tick);
      }else{
        p.remove();
      }
    }
    requestAnimationFrame(tick);
  }
}

function shakeStage(){
  stage.animate(
    [
      { transform: "translate(0,0)" },
      { transform: "translate(-2px,1px)" },
      { transform: "translate(2px,-1px)" },
      { transform: "translate(-1px,-2px)" },
      { transform: "translate(0,0)" }
    ],
    { duration: 220, iterations: 1 }
  );
}

function vibrate(){
  if(navigator.vibrate) navigator.vibrate([30, 20, 30]);
}

// ===== 排行榜（本机版：同一台设备）=====
rankBtn.addEventListener("click", () => openRank());
closeRank.addEventListener("click", () => rankPanel.hidden = true);

function openRank(){
  refreshDaily();
  // 计算最近7天榜（含今日）
  const list = [...state.history];
  // 把今天也放进去
  list.push({ date: state.today, count: state.todayCount });

  // 只取最近30条
  const last = list.slice(-30).reverse();

  rankMeta.textContent = `记录最近 ${Math.min(30, list.length)} 天（仅本设备）。想做全网榜我也能带你升级。`;

  rankList.innerHTML = "";
  last
    .sort((a,b)=> b.count - a.count || (b.date.localeCompare(a.date)))
    .slice(0, 10)
    .forEach((it, idx)=>{
      const li = document.createElement("li");
      li.innerHTML = `${idx+1}. ${it.date} <span class="score">${it.count} 个</span>`;
      rankList.appendChild(li);
    });

  rankPanel.hidden = false;
}

// ===== 朋友圈分享图（Canvas 海报）=====
posterBtn.addEventListener("click", openPoster);
closePoster.addEventListener("click", () => posterModal.hidden = true);
downloadPoster.addEventListener("click", downloadCanvasImage);
copyLink.addEventListener("click", copyGameLink);

function openPoster(){
  refreshDaily();
  drawPoster({
    quote: lastQuote || QUOTES[Math.floor(Math.random()*QUOTES.length)],
    count: state.todayCount,
    url: location.origin // vercel域名
  });
  copyTip.textContent = "提示：保存图片后，去朋友圈/群聊发图 + 配一句话，传播更快。";
  posterModal.hidden = false;
}

function drawPoster({quote, count, url}){
  const ctx = posterCanvas.getContext("2d");
  const W = posterCanvas.width;
  const H = posterCanvas.height;

  // 背景渐变
  const g = ctx.createLinearGradient(0,0,0,H);
  g.addColorStop(0, "#0b1020");
  g.addColorStop(1, "#141e3a");
  ctx.fillStyle = g;
  ctx.fillRect(0,0,W,H);

  // 星星
  ctx.globalAlpha = 0.9;
  for(let i=0;i<120;i++){
    const x = Math.random()*W;
    const y = Math.random()*H*0.65;
    const r = Math.random()*2.1;
    ctx.fillStyle = `rgba(255,255,255,${0.2 + Math.random()*0.6})`;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // 标题
  ctx.fillStyle = "rgba(255,255,255,.92)";
  ctx.font = "bold 56px system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei'";
  ctx.fillText("戳破烦恼 · 收藏温暖", 70, 120);

  ctx.fillStyle = "rgba(255,255,255,.65)";
  ctx.font = "28px system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei'";
  ctx.fillText("点击气球，爆掉压力，收下治愈", 70, 170);

  // 数据卡片
  roundRect(ctx, 70, 220, W-140, 160, 26, "rgba(255,255,255,.10)", "rgba(255,255,255,.14)");
  ctx.fillStyle = "rgba(255,255,255,.75)";
  ctx.font = "26px system-ui";
  ctx.fillText("我今天爆掉了", 110, 290);

  ctx.fillStyle = "#35d49a";
  ctx.font = "bold 88px system-ui";
  ctx.fillText(String(count), 330, 305);

  ctx.fillStyle = "rgba(255,255,255,.75)";
  ctx.font = "30px system-ui";
  ctx.fillText("个压力气球", 420, 292);

  // 语录卡
  roundRect(ctx, 70, 420, W-140, 420, 26, "rgba(255,255,255,.08)", "rgba(255,255,255,.12)");
  ctx.fillStyle = "rgba(255,255,255,.92)";
  ctx.font = "bold 44px system-ui";
  ctx.fillText("今天的治愈：", 110, 500);

  ctx.fillStyle = "rgba(255,255,255,.90)";
  ctx.font = "38px system-ui";
  const text = `“${quote}”`;
  wrapText(ctx, text, 110, 565, W-220, 54);

  // 底部引导 + 链接
  roundRect(ctx, 70, 900, W-140, 210, 26, "rgba(255,255,255,.10)", "rgba(255,255,255,.14)");
  ctx.fillStyle = "rgba(255,255,255,.90)";
  ctx.font = "bold 34px system-ui";
  ctx.fillText("你也来戳一个？", 110, 975);

  ctx.fillStyle = "rgba(255,255,255,.70)";
  ctx.font = "28px system-ui";
  ctx.fillText("打开链接直接玩（或发这张图）👇", 110, 1030);

  ctx.fillStyle = "rgba(255,255,255,.92)";
  ctx.font = "bold 28px system-ui";
  const showUrl = url;
  wrapText(ctx, showUrl, 110, 1080, W-220, 40);

  // 小角标
  ctx.fillStyle = "rgba(255,255,255,.55)";
  ctx.font = "22px system-ui";
  ctx.fillText("Made by you · Vercel", 70, H-40);
}

function roundRect(ctx, x, y, w, h, r, fill, stroke){
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.arcTo(x+w, y, x+w, y+h, r);
  ctx.arcTo(x+w, y+h, x, y+h, r);
  ctx.arcTo(x, y+h, x, y, r);
  ctx.arcTo(x, y, x+w, y, r);
  ctx.closePath();
  if(fill){
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if(stroke){
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight){
  const words = text.split("");
  let line = "";
  let yy = y;
  for(let i=0;i<words.length;i++){
    const test = line + words[i];
    const w = ctx.measureText(test).width;
    if(w > maxWidth && i>0){
      ctx.fillText(line, x, yy);
      line = words[i];
      yy += lineHeight;
    }else{
      line = test;
    }
  }
  ctx.fillText(line, x, yy);
}

function downloadCanvasImage(){
  const a = document.createElement("a");
  a.download = `压力气球-${ymd(new Date())}.png`;
  a.href = posterCanvas.toDataURL("image/png");
  a.click();
}

async function copyGameLink(){
  const url = location.origin;
  try{
    await navigator.clipboard.writeText(url);
    copyTip.textContent = "✅ 已复制链接，去微信粘贴发送即可。";
  }catch{
    copyTip.textContent = `复制失败：请手动复制 ${url}`;
  }
}

// 初始提示
toast.hidden = true;
