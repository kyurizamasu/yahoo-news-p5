let headlines = [];
let fetchCount = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(18);
  textAlign(LEFT, TOP);
  noLoop();
  fetchNews();
  setInterval(fetchNews, 60 * 1000); // 毎分更新
}

async function fetchNews() {
  try {
    const res = await fetch('https://yahoo-news-p5.onrender.com/news'); // ← RenderのURLに置き換える
    const data = await res.json();
    headlines = data;
    fetchCount++;
    redraw();
  } catch (err) {
    console.error('ニュース取得失敗', err);
  }
}

function draw() {
  background(255);
  fill(0);
  text(`更新回数: ${fetchCount}`, 10, 10);
  for (let i = 0; i < headlines.length; i++) {
    text(headlines[i], 10, 40 + i * 24);
  }
}
