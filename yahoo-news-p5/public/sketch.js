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
 
  
   // 🌀 画面の一番上に更新回数を表示
  text(`🌀 更新回数: ${updateCount} 回目`, 20, 20);

  let y = 60; // 見出しの表示位置（少し下げる）
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
      updateCount++; // ⬆️ 更新回数を増やす
      console.log(`📰 ${updateCount}回目の更新`, news);
    })
    .catch(error => {
      console.error('❌ ニュースの取得に失敗:', error);
    });
}
