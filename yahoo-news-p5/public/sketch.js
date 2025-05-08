let news = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(24);
  textAlign(LEFT, TOP);
  fill(0);

  fetchNews(); // 最初に1回取得

  // 30秒ごとにニュースを取得して更新
  setInterval(fetchNews, 30000);
}

function draw() {
  background(255);
  let y = 20;
  for (let i = 0; i < news.length; i++) {
    text(`${i + 1}. ${news[i]}`, 20, y);
    y += 30;
  }
}

function fetchNews() {
  fetch('http://localhost:3000/news')
    .then(response => response.json())
    .then(data => {
      news = data;
      console.log("📰 ニュースを更新しました", news);
    })
    .catch(error => {
      console.error('❌ ニュースの取得に失敗:', error);
    });
}
