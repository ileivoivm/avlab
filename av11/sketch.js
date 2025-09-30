//原始pd版本：https://vimeo.com/channels/avlab/82196635
let dotTex
let click = 0;
let drums = [];
let bug;
let touchended = true;
let touchstarted = false;
let oneTime = false;
let count = 55;
let w, h, ww, hh, DIM;
var flip = true;
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
let nextKlack = 0;
let Cx, Cy; // 滑鼠中心點
let Ex, Ey; // 滑鼠結尾
let dis;
// 移除 slider 相关变量
let timeNow;
let timeCount = 0;
let m0, m1, m2, m3, m4;
let ani = [];
let workTime;
let seq = 8;
let countTouch = false;

// 移除 preload 中的音频对象创建，延迟到用户交互时
let audioInitialized = false;

function initializeAudio() {
  if (!audioInitialized) {
    m0 = new Tone.Player({
      "url": "BD.wav",
      "autostart": false,
    }).toDestination();

    m1 = new Tone.Player({
      "url": "SD.wav",
      "autostart": false,
    }).toDestination();

    m2 = new Tone.Player({
      "url": "OHH.wav",
      "autostart": false,
    }).toDestination();

    m3 = new Tone.Player({
      "url": "CLAP.wav",
      "autostart": false,
    }).toDestination();

    m4 = new Tone.Player({
      "url": "CHH.wav",
      "autostart": false,
    }).toDestination();
    
    audioInitialized = true;
  }
}

function setup() {
  console.log("A/V-11_" + hour() + "/" + minute() + "/" + second());
  // 参考 sketch2.js 使用 window.innerWidth/Height 确保手机正常大小
  w = window.innerWidth;
  h = window.innerHeight;
  DIM = min(w, h);
  createCanvas(DIM, DIM);
  background(0.42 * 255, 0.04 * 255, 0.57 * 255);
  imageMode(CENTER);
  rectMode(CENTER);
  textSize(DIM * 0.025);
  textLeading(DIM * 0.025 * 1.5);
  for (let i = 0; i < 6; i++) {
    let dd = new Seqs(i);
    drums.push(dd);
  }

  for (let i = 0; i < 6; i++) {
    let aa = new pdLine(0, 300);
    ani.push(aa);
  }

  document.addEventListener("touchmove", preventBehavior, {
    passive: false
  });
  
  // 顯示 loading 訊息
  document.getElementById('loading').style.display = 'block';
  
  // 延遲顯示啟動訊息
  setTimeout(() => {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('start').style.opacity = '1';
  }, 2000);
  
  // 添加點擊事件監聽器
  document.getElementById('start').addEventListener('click', function() {
    // 隱藏啟動訊息
    document.getElementById('start').style.opacity = '0';
    
    // 使用 StartAudioContext 库来正确处理 AudioContext 启动
    StartAudioContext(Tone.context, document.body, function() {
      console.log("AudioContext started successfully");
      // 音频上下文启动后初始化音频对象
      initializeAudio();
    });
  });
  
  // 也支援觸控事件
  document.getElementById('start').addEventListener('touchstart', function(e) {
    e.preventDefault();
    // 隱藏啟動訊息
    document.getElementById('start').style.opacity = '0';
    
    // 使用 StartAudioContext 库来正确处理 AudioContext 启动
    StartAudioContext(Tone.context, document.body, function() {
      console.log("AudioContext started successfully");
      // 音频上下文启动后初始化音频对象
      initializeAudio();
    });
  });
}

function draw() {
  workTime = millis();
  background(0.42 * 255, 0.04 * 255, 0.57 * 255);
  //--------------------------------------
  push();
  fill(255, 50);
  stroke(255);
  //--------------------------------------
  //background(0.42 * 255, 0.04 * 255, 0.57 * 255);
  if (count < 60) count = count + 1;
  if (count > 30 && count < 35) {
    window.location.assign("https://editor.p5js.org/noiseUncle/present/YrgE_OxHj");
  }

  if (frameCount > 90) {
    timeNow = millis();
    if (timeNow > nextKlack) {
      nextKlack = timeNow + (60000 / 240);
      timeCount = (timeCount + 1) % drums[0].seq;
      // console.log("bang:" + timeCount);
      for (let i = 0; i < drums.length; i++) {
        drums[i].sound();
      }
    }
  }


  strokeWeight(0.5);
  stroke(20);
  dashedLine(DIM * 0.1, DIM * 0.73, DIM * 0.9, DIM * 0.73, 2, 1);
  dashedLine(DIM * 0.1, DIM * 0.466, DIM * 0.9, DIM * 0.466, 2, 1);
  // 参考 sketch2.js 的界面设计风格
  strokeWeight(1.2);
  stroke(30);
  line(DIM * 0.1, DIM * 0.33, DIM * 0.9, DIM * 0.33);
  line(DIM * 0.1, DIM * 0.6, DIM * 0.9, DIM * 0.6);
  line(DIM * 0.1, DIM * 0.865, DIM * 0.9, DIM * 0.865);

  fill(0)
  noStroke();
  ellipse(DIM * 0.1, DIM * 0.73,5,5);
  ellipse(DIM * 0.1, DIM * 0.466,5,5);
  ellipse(DIM * 0.1, DIM * 0.6,5,5);
  ellipse(DIM * 0.1, DIM * 0.33,5,5);
  ellipse(DIM * 0.1, DIM * 0.865,5,5);

  // 乐器名称标记（对应音档）- 调整位置
  noStroke();
  fill(255);
  textSize(DIM * 0.012);
  textAlign(LEFT, CENTER);

  text("BD", DIM * 0.01, DIM * 0.333);     // Bass Drum - 往下移
  text("SD", DIM * 0.01, DIM * 0.466);     // Snare Drum - 往下移
  text("OHH", DIM * 0.01, DIM * 0.6);      // Open Hi-Hat - 往下移
  text("CLAP", DIM * 0.01, DIM * 0.73);     // Clap - 往下移
  text("CHH", DIM * 0.01, DIM * 0.865);      // Closed Hi-Hat - 往下移

  for (let i = 0; i < drums.length; i++) {
    drums[i].show();
  }

  for (let i = 0; i < ani.length; i++) {
    ani[i].update();
  }

  for (let i = 0; i < touches.length; i++) {
    push();
    stroke(255);
    fill(255, 100);
    translate(touches[i].x, touches[i].y);
    ellipse(0, 0, DIM * 0.1, DIM * 0.1);
    dashedCircle(DIM * 0.05, 2, 1);
    pop();
  }

  if (mouseIsPressed && isMobile == false) {
    push();
    fill(255, 100);
    stroke(255);
    translate(mouseX, mouseY);
    ellipse(0, 0, DIM * 0.1, DIM * 0.1);
    dashedCircle(DIM * 0.05, 2, 1);
    pop();
  }

  // 参考 sketch2.js 的信息面板设计 - 往上移
  rectMode(CORNER);
  fill(255, 30);
  stroke(30);
  strokeWeight(1);
  rect(DIM * 0.01, DIM * 0.173, DIM * 0.12, DIM * 0.05);

  // 添加状态信息，使用 sketch2.js 的样式
  noStroke();
  fill(0, 200);
  textSize(DIM * 0.03);
  textAlign(LEFT, CENTER);
  text(":DM", DIM * 0.02, DIM * 0.2);

  // 添加 drawMouse 函数调用
  drawMouse();
}



function preventBehavior(e) {
  e.preventDefault();
}

// 参考 Function.js 的触摸事件处理
function touchStarted() {
  click = 1;
  Cx = touches[0].x;
  Cy = touches[0].y;
  touchstarted = true;
  touchended = false;
  
  // StartAudioContext 会自动处理 AudioContext 启动
  // 音频初始化会在 AudioContext 启动后自动执行

  return false;
}

function touchEnded() {
  if (touches.length == 0) {
    touchended = true;
    touchstarted = false;
    click = 0; // 消掉虚线
  }
  return false;
}

function mousePressed() {
  click = 1;
  Cx = mouseX;
  Cy = mouseY;
  
  // StartAudioContext 会自动处理 AudioContext 启动
  // 音频初始化会在 AudioContext 启动后自动执行
}

function mouseReleased() {
  click = 0; // 消掉虚线
}

// 添加 sound.js 的函数
function drawMouse() {
  if (click == 1) {
    push();
    Ex = mouseX;
    Ey = mouseY;
    let Dx = Cx - Ex;
    let Dy = Cy - Ey;
    dis = dist(Cx, Cy, Ex, Ey);

    noFill();
    stroke(0);
    translate(Cx, Cy);
    line(0, 0, -Dx, -Dy);
    ellipse(0, 0, 3, 3);
    dashedCircle(dis, 2, 1);
    pop();
  }
}

function clickOne(sec) {
  click = 0;
}

function dashedLine(_x1, _y1, _x2, _y2, dashWidth, dashSpacing) {
  let dis = int(dist(_x1, _y1, _x2, _y2) / 4);
  let steps = dis;
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
      vertex(lerp(_x1, _x2, i / steps), lerp(_y1, _y2, i / steps));
    }
    lastDashed = curDashed;
  }
  if (lastDashed) {
    endShape();
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

// 移除 slider 类，不需要滑块控制