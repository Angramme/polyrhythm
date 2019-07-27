class Segment {
	constructor(ratios=[], subdivide = 1, synths=[]) {
		this.voices = [];
		this.synths = synths;

		this._subdivide = subdivide;

		for (var i = 0; i < ratios.length; i++) {
			this.voices.push(new Voice(1 / ratios[i], subdivide, synths[i]));
		}
		this.ratios = ratios;

		this._start = 0;
		this._end = 1;
	}

	reset() {
		for (var v of this.voices) {
			v.dispose();
		}
		this.voices = [];
	}

	set ratios(rat) {
		this.voice_count = rat.length;
		for (var i = 0; i < rat.length; i++) {
			if(rat[i] % 1 != 0)throw new Error("ratio is not an integer!")
			this.voices[i].interval = 1 / rat[i];
		}
	}

	get voice_count() {
		return this.voices.length;
	}
	set voice_count(l) {
		if (l < this.voices.length) {
			for (let i = this.voices.length - 1; i >= l; i--) {
				this.voices.pop().dispose();
			}
		} else if (l > this.voices.length) {
			for (let i = this.voices.length; i < l; i++) {
				this.voices.push(new Voice(null, this._subdivide, this.synths[i]));
			}
		}
	}

	set subdivide(sub) {
		this._subdivide = sub;
		for (var v of this.voices) {
			v.subdivide = sub;
		}
	}
	get subdivide() {
		return this._subdivide;
	}

	get looplength(){
		return this._end - this._start;
	}
	set looplength(v){
		this._end = this._start + v;
		this.setLoop(this._start, this._end);
	}

	setLoop(start, end=null) {
		this._end = end || start + (this._end-this._start);
		this._start = start;
		for (var v of this.voices) {
			v.setLoop(this._start, this._end);
		}
	}

	dispose(){
		for(var v of this.voices){
			v.dispose();
		}
	}
}