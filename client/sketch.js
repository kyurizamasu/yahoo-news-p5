let headlines = [];
let updateCount = 0;
let circles = [];
let radius = 100;       // 円の半径
let spacing = 250;      // 円同士の間隔（直径より大きめに）
let cols, rows;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(24);
  fetchNews(); // 初回取得
  setInterval(fetchNews, 60 * 1000); // 60秒ごとに更新
}

function draw() {
  background(255);
  textSize(16);
  fill(0);
  text(`更新回数: ${updateCount}`, 10, 20);

  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];
    c.display();
  }
}

async function fetchNews() {
  try {
    const res = await fetch('http://localhost:3000/api/news');
    const json = await res.json();
    headlines = json.headlines.slice(0, 20); // 最大20個まで表示

    // 円を再構築
    circles = [];
    cols = floor(width / spacing);
    rows = ceil(headlines.length / cols);

    for (let i = 0; i < headlines.length; i++) {
      let col = i % cols;
      let row = floor(i / cols);
      let x = spacing / 2 + col * spacing;
      let y = spacing / 2 + row * spacing;
      circles.push(new TextCircle(x, y, radius, headlines[i]));
    }

    updateCount++;
  } catch (e) {
    console.error('ニュースの取得に失敗しました:', e);
  }
}

// クラス：文字列の1文字目を円状に配置する
class TextCircle {
  constructor(x, y, r, text) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.text = text.charAt(0);
    this.angleOffset = random(360); // 回転のばらつき
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(radians(this.angleOffset));
    noFill();
    stroke(0);
    ellipse(0, 0, this.r * 2);

    fill(0);
    textSize(32);
    text(this.text, 0, 0);
    pop();
  }
}
