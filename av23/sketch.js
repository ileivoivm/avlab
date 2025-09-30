let click = 0;
let Cx, Cy; //滑鼠中心點
let Ex, Ey; //滑鼠結尾

let touchended = true;
let touchstarted = false;
let oneTimeTrigger = false;
let W, H, DIM;

let dis;
let dur = 0;
let chord = [0, 2, 4, 5, 7, 9, 11, 12];
let ctlDots = [];
let selectWho = -1;
let noteNum;
let count = 0;
let totalCount = 0;
let stepArray = [48, 24, 12, 6, 3]
let noteArray = [0.05, 0.2, 0.6, 1.0]
let volArray = [-60,-30, -22, -16, -8, -4, -2, 2];
let music=[":Synth",":FMSynth",":DuoSynth",":PolySynth"];
let go = false;
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
let bgColor = ["#F25260", "#5662A6", "#027353", "#F2B950"];
let sliders = [];
let step, noteV = 1,
  synthType, vol;
let stepIndex, noteIndex, volIndex;

function setup() {
  W = window.innerWidth, H = window.innerHeight, DIM = min(W, H);
  createCanvas(DIM, DIM);
  rectMode(CENTER);
  textAlign(LEFT, CENTER);

	synthType = stdio.random("synthType", [0,1,2,3]);
	
  if (synthType == 0) volIndex = 4;
  else if (synthType == 1) volIndex = 4;
  else if (synthType == 2) volIndex = 2;
  else if (synthType == 3) volIndex = 3;
  stepIndex = stdio.random("speed", [0,1,2,3,4]);
  step = stepArray[stepIndex];
	noteNum  = stdio.random("noteNum", [4,5,6,7,8,9,10,11,12,13,14,15,16]);
  vol = volArray[volIndex];
  noteIndex =stdio.random("duration", [0,1,2,3]);
  noteV = noteArray[noteIndex];
  totalCount = step * noteNum;
  sliders[0] = new slider("Speed", 5, DIM * 0.1, DIM * 0.7, DIM * 0.4, DIM * 0.03, stepIndex, 0);
  sliders[1] = new slider("Duration", 4, DIM * 0.1, DIM * 0.75, DIM * 0.4, DIM * 0.03, noteIndex, 1);
  sliders[2] = new slider("Volume", 7, DIM * 0.1, DIM * 0.8, DIM * 0.4, DIM * 0.03, volIndex, 3);

  for (let i = 0; i < noteNum; i++) {
    ctlDots[i] = new ctlDot(i);
  }
  document.addEventListener("touchmove", preventBehavior, {
    passive: false
  });
	document.body.style.backgroundColor=bgColor[synthType];
	background(bgColor[synthType]);
	noLoop();
}


function draw() {

  if (go) count = (count + 1) % totalCount;
  // console.log(count);
	if(frameCount==10)fxpreview();
  background(bgColor[synthType]);
  drawMouse();
  strokeWeight(3);
  stroke(30);
  //
  line(DIM * 0.1, DIM * 0.6, DIM * 0.9, DIM * 0.6)
  strokeWeight(0.5);
  dashedLine(DIM * 0.1, DIM * 0.333, DIM * 0.9, DIM * 0.333, 2, 1)
  dashedLine(DIM * 0.1, DIM * 0.466, DIM * 0.9, DIM * 0.466, 2, 1)
  dashedLine(DIM * 0.1, DIM * 0.2, DIM * 0.9, DIM * 0.2, 2, 1)
  for (let i = 0; i < noteNum; i++) {
    let x = map(i, 0, noteNum - 1, DIM * 0.1, DIM * 0.9);
    let y = DIM * 0.6
    noStroke();
    fill(30);
    if (i == 0 || i == noteNum - 1) rect(x, y, DIM * 0.005, DIM * 0.02);
    else rect(x, y, DIM * 0.002, DIM * 0.02);
    ctlDots[i].show();
    if (i < noteNum - 1) {
      stroke(30);
      strokeWeight(3);
      if (ctlDots[i].draw && ctlDots[i + 1].draw) {
        dashedLine(ctlDots[i].x, ctlDots[i].y, ctlDots[i + 1].x, ctlDots[i + 1].y, 2, 1)
      }

    }
  }
  checkTrigger();
  fill(200);
  let xx = map(count, 0, totalCount - step, DIM * 0.1, DIM * 0.9);
  if (xx >= DIM * 0.1 && xx <= DIM * 0.9) ellipse(xx, DIM * 0.6, DIM * 0.02, DIM * 0.02);
  noStroke();
  fill(30);
  textSize(DIM * 0.012);
  text("48", DIM * 0.06, DIM * 0.6);
  text("60", DIM * 0.06, DIM * 0.466);
  text("72", DIM * 0.06, DIM * 0.333);
  text("84", DIM * 0.06, DIM * 0.2);


  rectMode(CORNER);
  fill(255,30);
  stroke(30);
  strokeWeight(1);
  rect(DIM * 0.1, DIM * 0.855,DIM*0.2,DIM*0.05)
	
	// noFill();
	// stroke(30);
	// strokeWeight(5);
	// rect(0,0,DIM,DIM);

  noStroke();
  fill(30,200);
  textSize(DIM * 0.03);
  text(music[synthType], DIM * 0.11, DIM * 0.88);
  for (let i = 0; i < 3; i++) {
    sliders[i].show();
    if (i == 0) {
      step = stepArray[sliders[i].a];
      totalCount = step * noteNum;
    } else if (i == 2) {
      vol = volArray[sliders[i].a];
    } else if (i == 1) {
      noteV = noteArray[sliders[i].a];
    }
  }

}

function checkTrigger() {
  if (oneTimeTrigger == true && touchended == true) {
    oneTimeTrigger = false;
    clickOne(dis);
  } else if (oneTimeTrigger == false && touchstarted == true) {
    oneTimeTrigger = true;
  }

}

function preventBehavior(e) {
  e.preventDefault();
}

function noteToFreq(note) {
  let a = 440; //frequency of A (coomon value is 440Hz)
  return (a / 32) * (2 ** ((note - 9) / 12));
}

function keyTyped() {
  if (key === 's' || key === 'S') {
    save("AV-27.png");
  }
}
