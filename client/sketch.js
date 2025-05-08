let headlines = [];
let updateCount = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(16);
  textAlign(LEFT, TOP);
  fill(0);

  fetchNews(); // 初回取得
  setInterval(fetchNews, 10 * 1000); // 60秒ごとに更新
}

function draw() {
  background(255);
  text(`更新回数: ${updateCount}`, 10, 10);

for (let i = 0; i < news.length; i++) {
    const firstChar = news[i].charAt(0); // 👈 最初の1文字を取り出す
    text(`${firstChar}`, 20, y);
    y += 30;
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
