let headlines = [];

function setup() {
  createCanvas(800, 600);
  loadJSON('http://localhost:3000/news', gotData);
}

function gotData(data) {
  headlines = data;
}

function draw() {
  background(255);
  fill(0);
  textSize(20);
  for (let i = 0; i < headlines.length; i++) {
    text(headlines[i], 20, 40 + i * 30);
  }
}
