class Circle {

  constructor(id, x, y, r) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.rx = 0;
    this.rz = 0;
    this.speed = 0;
    this.speedR = 0;
    this.maxR = random(30, 300);
    this.maxSpeed = random(2, 5);
    this.r = r;
    this.cc = int(random(6));
    this.count = 0;
    this.freqCount = 0;
    this.volCount = 0;
    this.radNote = chord[int(random(5))] + int(map(this.y, 0, height, 4, 7)) * 12;
    //-------------------soundSetup-tone.js
    this.freq = new Tone.Frequency(this.radNote, "midi");
    this.osc = new Tone.Oscillator(this.freq, "sine").toMaster().start();
    this.osc.volume.value = -50;
    this.synth = new Tone.Synth().toMaster();
    this.synth.volume.value = -20;
    this.synth.triggerAttackRelease(this.freq, "16n");
    //-------------------soundSetup-tone.js
  }

  show() {
    if (this.speed < this.maxSpeed) this.speed = this.speed + 0.05;
    if (this.speedR < this.maxR) this.speedR = this.speedR + 0.1;
    this.count = (this.count + this.speed) % 360;
    this.rx = cos((this.count / 360) * 2 * 3.1415926) * this.speedR + this.x;
    this.rz = sin((this.count / 360) * 2 * 3.1415926) * this.speedR;
    //-------------------soundCtl-tone.js
    this.freqCount = (this.freqCount + 1) % 360;
    if (this.freqCount % 20 == 0) {
      this.radNote = chord[int(random(5))] + int(map(this.y, 0, height, 4, 8)) * 12;
      this.freq = Tone.Frequency(this.radNote, "midi");
    }
    this.volCount = 20 * (abs(this.count - 180) / 180);
    this.osc.volume.value = (this.volCount * -1) - 30;
    this.osc.frequency.value = this.freq;
    //-------------------soundCtl-tone.js

    push();
    translate(this.rx, this.y);
    scale(map(this.rz, 0, this.maxR, 1, 1.3));
    noStroke();
    tint(colors[this.cc][0] * 255, colors[this.cc][1] * 255, colors[this.cc][2] * 255, 100);
    image(dot, 0, 0, this.r, this.r);
    pop();
  }
}
