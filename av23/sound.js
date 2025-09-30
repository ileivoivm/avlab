class ctlDot {
	constructor(_id) {
		this.id = _id;
		this.x = map(this.id, 0, noteNum - 1, DIM * 0.1, DIM * 0.9);
		this.y = stdio.random(0, 24, Math.floor) * (DIM * 0.4) / 24 + DIM * 0.2;
		this.inDot = false;
		let n = int(map(this.y, DIM * 0.6, DIM * 0.2, 0, 24));
		this.note = chord[(n % 8)] + (int(n / 8)) * 12 + 48;
		this.cc = 0;

		if (synthType == 0) this.synth = new Tone.Synth().toDestination();
		else if (synthType == 1) this.synth = new Tone.FMSynth().toDestination();
		else if (synthType == 2) this.synth = new Tone.DuoSynth().toDestination();
		else if (synthType == 3) this.synth = new Tone.PolySynth().toDestination(), this.synth.set({
			detune: -1200
		});;

		this.synth.volume.value = vol;

		// this.synth.volume.value = -8;
		this.now = Tone.now();
		this.draw = true;
	}
	show() {
		this.cc++;
		textSize(DIM * 0.015);
		this.synth.volume.value = vol;
		if (this.inDot) {
			this.y = constrain(mouseY, DIM * 0.2, DIM * 0.6 + DIM * 0.02);
			if (this.y > DIM * 0.6) this.draw = false;
			else this.draw = true;
			let k = constrain(this.y, DIM * 0.2, DIM * 0.6)
			let n = int(map(k, DIM * 0.6, DIM * 0.2, 0, 24));
			this.note = chord[(n % 8)] + (int(n / 8)) * 12 + 48;

			if (this.draw) text("N:" + this.note, this.x + DIM * 0.01, this.y);
			else text("Pause", this.x + DIM * 0.01, this.y);
		}
		// if (this.y > DIM * 0.6) this.y = DIM * 0.6;
		// if (this.y < DIM * 0.2) this.y = DIM * 0.2;
		if (count % step == 0 && int(count / step) == this.id && go == true && this.draw) {
			this.cc = 0;
			if (synthType != 3) {
				this.now = Tone.now();
				this.synth.triggerAttack(noteToFreq(this.note), this.now)
				this.synth.triggerRelease(this.now + noteV);
			} else {
				this.synth.triggerAttackRelease([noteToFreq(this.note), noteToFreq(this.note + 4), noteToFreq(this.note + 7)], noteV);
			}

		}

		if (this.cc < 10) {
			fill(200);
			ellipse(this.x, this.y, DIM * 0.02, DIM * 0.02);
			stroke(250);
			strokeWeight(3);
			dashedLine(this.x, DIM * 0.6, this.x, this.y, 2, 1)
		} else {
			fill(30, 30, 30);
			ellipse(this.x, this.y, DIM * 0.015, DIM * 0.015);
			stroke(30, 30, 30);
			strokeWeight(1);
			dashedLine(this.x, DIM * 0.6, this.x, this.y, 2, 1)
		}


	}
}

class slider {
	constructor(_name, _interval, _x, _y, _l, _h, _pos, _id) {
		this.x = _x;
		this.y = _y;
		this.l = _l;
		this.h = _h;
		this.w = this.h * 0.15;
		this.name = _name;
		this.aNum = _interval;
		this.cxStart = this.x + this.w;
		this.cxEnd = this.cxStart + this.l - this.w * 2;
		this.cyStart = this.y + this.w;
		this.cyEnd = this.cyStart + this.h - this.w * 2;
		this.cc = (this.cyEnd + this.cyStart) / 2;
		this.in = false;
		this.pos = _pos + 1;
		this.a = _pos;
		this.id = _id;
	}
	show() {
		rectMode(CORNER);
		noFill();
		stroke(30);
		textSize(DIM * 0.015);
		if (mouseX > this.cxStart && mouseX < this.cxEnd &&
			mouseY > this.cyStart && mouseY < this.cyEnd
		) {
			this.in = true;
		} else {
			this.in = false;
		}
		if (this.in && click == 1) {
			strokeWeight(3);
			this.pos = int((mouseX - this.cxStart) / (this.l / this.aNum)) + 1;
			this.a = this.pos - 1;
			console.log(this.name + " : " + this.a);
		} else {
			strokeWeight(1);
		}

		rect(this.x, this.y, this.l, this.h);
		fill(0, 50);
		noStroke();
		rect(this.cxStart, this.cyStart, this.l - this.w * 2, this.h - this.w * 2);
		fill(0, 230);
		//
		rect(this.cxStart, this.cyStart, (this.l - this.w * 2) * (this.pos / this.aNum), this.h - this.w * 2);
		//
		text(this.name + ": " + this.pos, this.x + this.l + 10, this.y + this.h * 0.5);
		rectMode(CENTER);
		fill(0, 100);
		for (let i = 0; i < this.aNum - 1; i++) {
			let x = this.cxStart + ((this.cxEnd - this.cxStart) / this.aNum) * (i + 1);
			rect(x, this.cc, this.w * 0.3, this.w * 2);
		}
	}
}



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

function touchStarted() {
	click = 1;
	Cx = mouseX;
	Cy = mouseY;

	for (let i = 0; i < noteNum; i++) {
		if (dist(ctlDots[i].x, ctlDots[i].y, mouseX, mouseY) < DIM * 0.03) ctlDots[i].inDot = true;
		if (ctlDots[i].inDot == true) selectWho = i;
	}
	if (selectWho >= 0) console.log(selectWho);
	touchstarted = true;
	touchended = false;
	if (Tone.context.state !== 'running') {
		Tone.context.resume();
	}
	go = true;

	loop();
	return false;
}

function touchEnded() {
	if (touches.length == 0) {
		touchended = true;
		touchstarted = false;
	}
	if (selectWho >= 0) ctlDots[selectWho].inDot = false;
	selectWho = -1;
	// console.log(selectWho);
	return false;

}

function mousePressed() {

	click = 1;
	Cx = mouseX;
	Cy = mouseY;

	for (let i = 0; i < noteNum; i++) {
		if (dist(ctlDots[i].x, ctlDots[i].y, mouseX, mouseY) < DIM * 0.03) ctlDots[i].inDot = true;
		if (ctlDots[i].inDot == true) selectWho = i;
	}
	if (selectWho >= 0) console.log(selectWho);
	touchstarted = true;
	touchended = false;
	if (Tone.context.state !== 'running') {
		Tone.context.resume();
	}
	go = true;

	loop();
	return false;


}

function mouseReleased() {

	if (touches.length == 0) {
		touchended = true;
		touchstarted = false;
	}
	if (selectWho >= 0) ctlDots[selectWho].inDot = false;
	selectWho = -1;
	// console.log(selectWho);
	return false;


}
document.documentElement.addEventListener("mousedown", function() {
	mouse_IsDown = true;
	if (Tone.context.state !== 'running') {
		Tone.context.resume();
	}
})

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
			let v = i / steps;
			let v1 = createVector(_x1, _y1);
			let v2 = createVector(_x2, _y2);
			let v3 = p5.Vector.lerp(v1, v2, v);
			vertex(v3.x, v3.y);
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
