let headlines = [];
let updateCount = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(20);
  textAlign(CENTER, CENTER);
  noStroke();
  fetchNews();
  setInterval(fetchNews, 60 * 1000);
}

function draw() {
  background(255);
  fill(0);
  textAlign(LEFT, TOP);
  text(`更新回数: ${updateCount}`, 10, 10);

  let cols = 4; // 一列に並べる円の数
  let rows = ceil(headlines.length / cols);
  let spacingX = width / (cols + 1);
  let spacingY = height / (rows + 1);
  let circleCharCount = 12; // 1つの円に配置する文字数
  let radius = 50;

  textAlign(CENTER, CENTER);
  for (let i = 0; i < headlines.length; i++) {
    let char = headlines[i]?.charAt(0) || '';
    let cx = spacingX * (i % cols + 1);
    let cy = spacingY * (floor(i / cols) + 1);

    for (let j = 0; j < circleCharCount; j++) {
      let angle = TWO_PI / circleCharCount * j + frameCount * 0.01;
      let x = cx + cos(angle) * radius;
      let y = cy + sin(angle) * radius;
      text(char, x, y);
    }
  }
}

async function fetchNews() {
  try {
    const res = await fetch('http://localhost:3000/api/news'); // 本番ではURL変更
    const json = await res.json();
    headlines = json.headlines;
    updateCount++;
  } catch (e) {
    console.error('ニュースの取得に失敗しました:', e);
  }
}
