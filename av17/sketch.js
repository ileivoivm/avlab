
//原始pd版本：https://vimeo.com/87638187

let dotTex;
let pg;
let click = 0;

let Cx, Cy; //滑鼠中心點
let Ex, Ey; //滑鼠結尾
let circleNum = 0;
let circles = [];

let touchended = true;
let touchstarted = false;
let oneTime = false;
let dot, W, H, DIM;
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

let audioInitialized = false;

let colors = [
  [1, 0, 0.466],
  [1, 0.7, 0.07],
  [0.66, 0.91, 0.13],
  [0.01, 0.85, 0.89],
  [0.38, 0.26, 1],
  [0.46, 1, 0.49]
];

let chord = [0, 4, 7, 11, 12];

function setup() {
  console.log("A/V-17_" + hour() + "/" + minute() + "/" + second());
  (W = window.innerWidth), (H = window.innerHeight), (DIM = min(W, H));
  createCanvas(DIM, DIM);
  dot = loadImage("dot.png");
  imageMode(CENTER);
  textSize(20);
  document.addEventListener("touchmove", preventBehavior, {
    passive: false
  });

  // 顯示 loading 訊息
  document.getElementById('loading').style.display = 'block';
  document.getElementById('loading').style.opacity = '1';

  // 延遲顯示啟動訊息
  setTimeout(() => {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('start').style.opacity = '1';
  }, 2000);

  if (isMobile) {
    console.log("Mobile device detected, loading message should be visible");
  }

  // 添加點擊事件監聽器
  document.getElementById('start').addEventListener('click', function() {
    document.getElementById('start').style.opacity = '0';
    StartAudioContext(Tone.context, document.body, function() {
      console.log("AudioContext started successfully");
      audioInitialized = true;
    });
  });

  // 也支援觸控事件
  document.getElementById('start').addEventListener('touchstart', function(e) {
    e.preventDefault();
    document.getElementById('start').style.opacity = '0';
    StartAudioContext(Tone.context, document.body, function() {
      console.log("AudioContext started successfully");
      audioInitialized = true;
    });
  });
}

function noteToFreq(note) {
  let a = 440;
  return (a / 32) * (2 ** ((note - 9) / 12));
}

function draw() {
  // 檢查是否還在 loading 階段
  if (document.getElementById('loading').style.display !== 'none') {
    return;
  }

  background(20, 20, 20);
  blendMode(ADD);

  if (click == 1) {
    push();
    Ex = mouseX;
    Ey = mouseY;
    let Dx = Cx - Ex;
    let Dy = Cy - Ey;
    let dis = dist(Cx, Cy, Ex, Ey);
    noFill();
    stroke(255);
    translate(Cx, Cy);
    line(0, 0, -Dx, -Dy);
    ellipse(0, 0, 3, 3);
    dashedCircle(dis, 2, 1);
    pop();
  }

  for (let i = 0; i < circles.length; i++) {
    if (circles.length >= 14) {
      circles[0].osc.stop();
      circles.splice(0, 1);
    }
    circles[i].show();
  }

  blendMode(BLEND);

  if (oneTime == true && touchended == true) {
    oneTime = false;
    addOne();
  } else if (oneTime == false && touchstarted == true) {
    oneTime = true;
  }
}

function addOne() {
  click = 0;
  let Dx = Cx - Ex;
  let Dy = Cy - Ey;
  let dis = dist(Cx, Cy, mouseX, mouseY) * 2;
  let cc = new Circle(circleNum, Cx, Cy, dis);
  circleNum++;
  circles.push(cc);
}

function preventBehavior(e) {
  e.preventDefault();
}

function touchStarted() {
  if (!audioInitialized) return false;
  click = 1;
  Cx = mouseX;
  Cy = mouseY;
  touchstarted = true;
  touchended = false;
  return false;
}

function touchEnded() {
  if (touches.length == 0) {
    touchended = true;
    touchstarted = false;
  }
  return false;
}

function mousePressed() {
  if (!audioInitialized) return;
  click = 1;
  Cx = mouseX;
  Cy = mouseY;
  touchstarted = true;
  touchended = false;
}

function mouseReleased() {
  click = 0;
  touchended = true;
  touchstarted = false;
}

function keyPressed() {
  if (keyCode === BACKSPACE) {
    for (let i = 0; i < circles.length; i++) {
      circles[i].osc.stop();
    }
    circles = [];
  }
}

function dashedCircle(radius, dashWidth, dashSpacing) {
  let steps = 200;
  let dashPeriod = dashWidth + dashSpacing;
  let lastDashed = false;
  for (let i = 0; i < steps; i++) {
    let curDashed = (i % dashPeriod) < dashWidth;
    if (curDashed && !lastDashed) {
      beginShape();
    }
    if (!curDashed && lastDashed) {
      endShape();
    }
    if (curDashed) {
      let theta = map(i, 0, steps, 0, TWO_PI);
      vertex(cos(theta) * radius, sin(theta) * radius);
    }
    lastDashed = curDashed;
  }
  if (lastDashed) {
    endShape();
  }
}
