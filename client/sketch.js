let headlines = [];
let updateCount = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(16);
  textAlign(LEFT, TOP);
  fill(0);

  fetchNews(); // 初回取得
  setInterval(fetchNews, 60 * 1000); // 60秒ごとに更新
}

function draw() {
  background(255);
  text(`更新回数: ${updateCount}`, 10, 10);

  for (let i = 0; i < headlines.length; i++) {
    let y = 40 + i * 24;
    let firstChar = headlines[i] ? headlines[i].charAt(0) : ''; // 安全に1文字取得
    text(`${i + 1}: ${firstChar}`, 10, y);
  }
}

async function fetchNews() {
  try {
    const res = await fetch('/api/news');
    const json = await res.json();
    headlines = json.headlines;
    updateCount++;
  } catch (e) {
    console.error('ニュースの取得に失敗しました:', e);
  }
}
