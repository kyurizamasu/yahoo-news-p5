let headlines = [];
let updateCount = 0;

let gridCols = 5;  // 列数
let gridRows = 4;  // 行数（最大表示件数＝cols * rows）
let circleSize = 80;
let spacing = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(32);
  fetchNews();
  setInterval(fetchNews, 60000); // 60秒ごとに更新
}

function draw() {
  background(255);
  fill(0);
  textSize(16);
  text(`更新回数: ${updateCount}`, 100, 30);

  translate(100, 80); // 少し余白を取って表示開始位置調整

  let maxItems = min(headlines.length, gridCols * gridRows);
  for (let i = 0; i < maxItems; i++) {
    let col = i % gridCols;
    let row = Math.floor(i / gridCols);
    let x = col * spacing;
    let y = row * spacing;

    // 円の描画
    fill(230);
    stroke(0);
    ellipse(x, y, circleSize);

    // 見出し1文字目の描画
    fill(0);
    textSize(24);
    let char = headlines[i].charAt(0);
    text(char, x, y);
  }
}

async function fetchNews() {
  try {
    const res = await fetch('/api/news');
    const json = await res.json();
    headlines = json.headlines.filter(h => h.length > 0); // 空文字除外
    updateCount++;
  } catch (e) {
    console.error('ニュースの取得に失敗しました:', e);
  }
}
