let news = [];
let count = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(32);
  textAlign(LEFT, TOP);
  fill(0);
  loadNews();
  setInterval(loadNews, 3000); // 10秒ごとに更新
}

function draw() {
  background(255);
  text(`更新回数: ${count}`, 20, 20);
  for (let i = 0; i < news.length; i++) {
    let firstChar = news[i].charAt(０); // 先頭1文字を抽出
    text(`${i + 1}: ${firstChar}`, 20, 60 + i * 40);
  }
}

function loadNews() {
  count++;
  fetch('https://yahoo-news-p5.onrender.com/news')
    .then(response => response.json())
    .then(data => {
      console.log('📦 取得したニュース:', data); // ← 追加
      news = data;
    })
    .catch(err => {
      console.error('❌ ニュース取得エラー:', err);
    });
}
