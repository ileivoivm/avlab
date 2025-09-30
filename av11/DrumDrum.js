class Seqs {
  constructor(id) {
    this.id = id;

    if (this.id != 0) this.seq = int(random(0, 8));
    else this.seq = 8;
    this.touch = false;
    // 调整序列机位置，与新的乐器标记对齐
    this.x = DIM * 0.1;
    if (this.id == 0) {
      this.y = DIM * 0.2;  // COUNTER 在最上面
    } else {
      this.y = DIM * (0.2 + this.id * 0.133); // 其他乐器往下移
    }
    this.d = DIM * 0.07;
    this.w = DIM * 0.07;
    this.h = DIM * 0.07;

    //-------------------soundSetup-tone.js
    this.xx = 0 * this.d + this.d * 1.5 + this.x - (this.d);
    this.xxx = 7 * this.d + this.d * 1.5 + this.x + (this.d / 2);
    this.yy = this.y - (this.h / 2);
    this.yyy = this.y + (this.h / 2);
    //console.log(this.xx+","+this.xxx);

    //-------------------soundSetup-tone.js
  }

  sound() {
    this.sel = timeCount % this.seq;
    // 检查音频对象是否已初始化，避免 undefined 错误
    if (this.id == 1 && this.seq > 0 && this.sel == 0 && typeof m0 !== 'undefined') m0.start();
    if (this.id == 2 && this.seq > 0 && this.sel == 0 && typeof m1 !== 'undefined') m1.start();
    if (this.id == 3 && this.seq > 0 && this.sel == 0 && typeof m2 !== 'undefined') m2.start();
    if (this.id == 4 && this.seq > 0 && this.sel == 0 && typeof m3 !== 'undefined') m3.start();
    if (this.id == 5 && this.seq > 0 && this.sel == 0 && typeof m4 !== 'undefined') m4.start();
    if (this.seq > 0 && this.sel == 0) ani[this.id].reset();
  }
  change() {
    this.seq = int(random(0, 8));
  }

  show() {
    push();
    rectMode(CORNERS);
    noStroke();

    // 检测触控/鼠标位置
    let touchX, touchY;
    let isTouching = false;
    
    if (isMobile && touches.length > 0) {
      // 移动设备使用触摸坐标
      touchX = touches[0].x;
      touchY = touches[0].y;
      isTouching = true;
    } else if (!isMobile && mouseIsPressed) {
      // 桌面设备使用鼠标坐标
      touchX = mouseX;
      touchY = mouseY;
      isTouching = true;
    }

    if (isTouching && (touchX > this.xx) && (touchX < this.xxx) && (touchY > this.yy) && (touchY < this.yyy)) {
      fill(255, 50);
      this.touch = true;
      this.seq = int(map(touchX, this.xx, this.xxx, 0, 9));
    } else {
      fill(0, 0, 0, 0);
      this.touch = false;
    }
    if (this.id != 0){
     this.seq = this.seq ;
    }else{
    if( this.seq <1)this.seq=1;
    }

if (this.id != 0) {
   if (touchstarted) rect(this.xx + (this.d / 2), this.yy, this.xxx, this.yyy);
}else{
  fill(0, 50);
rect(this.xx + (this.d / 2), this.yy, this.xxx, this.yyy);
}
   
    pop();

    rectMode(CENTER);
    push();
    translate(this.x, this.y);
    strokeWeight(2);
    stroke(255, 255);
    noFill();
    this.go = E.easeOutBack(2 * abs(ani[this.id].o - 0.5));
    if (this.id != 0) ellipse(0, 0, this.h * 1.5 * this.go, this.h * 1.5 * this.go);

    fill(255, (1.0 - this.go) * 200 + 55);
    if (this.id != 0) ellipse(0, 0, this.h, this.h);
    
    //透明度seq
    if (this.id != 0) {
      fill(255, 50);
      for (let i = 0; i < this.seq; i++) {
        rect(i * this.d + this.d * 1.5, 0, this.w, this.h);
      }
    } else {
      fill(0, 150);
      for (let i = 0; i < this.seq; i++) {
        rect(i * this.d + this.d * 1.5, 0, this.w, this.h);
      }
    
    }

    //yellow run
    if (this.id != 0) {
      fill(255, 255, 0, 200);
      noStroke();
      rect(this.sel * this.d + this.d * 1.5, 0, this.w, this.h);
    } else {
      fill(255, 0, 0, 200);
      noStroke();
      rect(timeCount * this.d + this.d * 1.5, 0, this.w, this.h);
    }
    //


    pop();
  }
}