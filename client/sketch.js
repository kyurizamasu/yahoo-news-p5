let headlines = [];
let updateCount = 0;
let grouped = {}; // 文字ごとの配列

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  textFont('sans-serif');
  textSize(24);
  textAlign(CENTER, CENTER);
  fetchNews();
  setInterval(fetchNews, 60000);
}

function draw() {
  background(255);
  rotateX(PI / 4); // 斜め上から見下ろす角度
  rotateZ(frameCount * 0.001); // ゆっくり回転
  
  let keys = Object.keys(grouped);
  let spacing = 200; // 円同士の間隔（Z軸ではなくXY平面上）

  for (let i = 0; i < keys.length; i++) {
    let char = keys[i];
    let count = grouped[char];

    let cx = (i % 5) * spacing - spacing * 2; // グリッド状に配置（X方向）
    let cy = floor(i / 5) * spacing - spacing; // グリッド状に配置（Y方向）

    push();
    translate(cx, cy, 0); // XY平面に配置
    drawCharCircle(char, 100, count); // 文字、半径、個数
    pop();
  }

  // UI表示
  resetMatrix();
  camera();
  fill(0);
  textAlign(LEFT, TOP);
  text(`更新回数: ${updateCount}`, -width / 2 + 20, -height / 2 + 20);
}

function drawCharCircle(char, radius, count) {
  let angleStep = TWO_PI / count;
  fill(0);
  for (let i = 0; i < count; i++) {
    let angle = i * angleStep;
    let x = cos(angle) * radius;
    let y = sin(angle) * radius;
    push();
    translate(x, y, 0);
    rotateZ(angle + PI / 2);
    text(char, 0, 0);
    pop();
  }
}

async function fetchNews() {
  try {
    const res = await fetch('http://localhost:3000/api/news');
    const json = await res.json();
    headlines = json.headlines;
    grouped = {};
    for (let title of headlines) {
      let c = title.charAt(0);
      if (grouped[c]) {
        grouped[c]++;
      } else {
        grouped[c] = 1;
      }
    }
    updateCount++;
  } catch (e) {
    console.error('ニュースの取得に失敗しました:', e);
  }
}
