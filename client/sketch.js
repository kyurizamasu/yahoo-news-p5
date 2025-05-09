let headlines = [];
let updateCount = 0;

let radius = 150;
let circleSize = 30;
let angleStep;
let angle = 0;
let placed = [];
let numChars = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(0);
  angleMode(DEGREES);

  fetchNews();
  setInterval(fetchNews, 60 * 1000); // 60秒ごとに更新
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  textSize(16);
  text(`更新回数: ${updateCount}`, 0, -radius - 50);

  if (headlines.length > 0) {
    angleStep = 360 / numChars;

    // 配置済みの文字を描画
    for (let i = 0; i < placed.length; i++) {
      let p = placed[i];
      p.t = min(p.t + 0.05, 1);
      let amt = easeOutExpo(p.t);
      let x = lerp(p.sx, p.ex, amt);
      let y = lerp(p.sy, p.ey, amt);
      text(p.char, x, y);
    }

    // 全て配置済みならアニメーション終了
    if (placed.length === numChars) {
      noLoop();
      return;
    }

    // 回転中の仮位置
    let mx = cos(angle + 90) * radius;
    let my = sin(angle + 90) * radius;

    // 次の配置タイミングをチェック
    let nextIndex = placed.length;
    let nextAngle = nextIndex * angleStep + 90;
    if (angle >= nextIndex * angleStep && nextIndex < numChars) {
      let tx = cos(nextAngle) * radius;
      let ty = sin(nextAngle) * radius;
      placed.push({
        sx: mx,
        sy: my,
        ex: tx,
        ey: ty,
        t: 0,
        char: headlines[nextIndex].charAt(0)
      });
    }

    angle += angleStep / 10;
  }
}

async function fetchNews() {
  try {
    const res = await fetch('/api/news');
    const json = await res.json();
    headlines = json.headlines.filter(h => h.length > 0); // 空文字防止
    updateCount++;

    // アニメーションの初期化
    placed = [];
    angle = 0;
    numChars = min(headlines.length, 20); // 最大20件まで配置
    if (numChars > 0) {
      let initX = cos(90) * radius;
      let initY = sin(90) * radius;
      placed.push({ sx: initX, sy: initY, ex: initX, ey: initY, t: 1, char: headlines[0].charAt(0) });
    }

    loop(); // 再スタート
  } catch (e) {
    console.error('ニュースの取得に失敗しました:', e);
  }
}

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - pow(2, -10 * t);
}
