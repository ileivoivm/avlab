var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
var evt = "onorientationchange" in window ? "orientationchange" : "resize";
window.addEventListener(evt, resize, false);

var mouseIn = false;
var mouseClick=0;

let chord = [0, 2, 4, 5, 7,9,11,12];


function resize(fals) {
  if (window.orientation == 0 || window.orientation == 180) {
    resetCount = 0;
  } else {
    resetCount = 0;
  }
}

document.oncontextmenu = function(){
    event.returnValue = false;
}
// 或者直接返回整個事件
document.oncontextmenu = function(){
    return false;
}


function touchStarted() {
  click = 1;
  touchstarted = true;
  touchended = false;
  if (Tone.context.state !== 'running') {
    Tone.context.resume();
  }
  var start = select('#start');
  start.style('opacity', '0');

  var bg = select('#bg');
  bg.style('opacity', '0');
  
  // var fs = fullscreen();
  // if (!fs) {
  //   fullscreen(true);
  // }
  // for (let i = 0; i < drums.length; i++) {
  //   drums[i].change();
  // }
  return false;
}

function touchEnded() {
  if (touches.length == 0) {
    touchended = true;
    touchstarted = false;
  }
  return false;
}

document.documentElement.addEventListener("mousedown", function() {
  mouse_IsDown = true;
  if (Tone.context.state !== 'running') {
    Tone.context.resume();
  }
})


function keyPressed() {
  if (keyCode === BACKSPACE) {
    for (let i = 0; i < circles.length; i++) {
      circles[i].osc.stop();
    }
    circles = [];
  }
}

let colors = [
  [1, 0, 0.466],
  [1, 0.7, 0.07],
  [0.66, 0.91, 0.13],
  [0.01, 0.85, 0.89],
  [0.38, 0.26, 1],
  [0.46, 1, 0.49]
];


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


class pdLine {
  constructor(_delay, _duration) {
    this.bang = _delay;
    this.duration = _duration;
    this.done = false;
    this.dd = 0;
    this.delay = 0;
    this.o = 0;
    this.oo = 0;
  }

  reset() {
    this.dd = millis() + this.delay;
    this.bang = true;
    this.done = false;
  }

  update() {

    if (this.bang == true) {
      if (workTime > this.dd) {
        if (workTime - this.dd <= this.duration) {
          this.o = (float(workTime - this.dd) / (this.duration));
        } else {
          this.done = true;
          this.bang = false;
          this.o = 1;
        }
      } else {
        this.o = 0;
      }
      this.oo = 1.0 - this.o;
    }
  }
}
