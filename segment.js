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
		this._get_ratios = null;
		this.voice_count = rat.length;
		for (var i = 0; i < rat.length; i++) {
			if(rat[i] % 1 != 0)throw new Error("ratio is not an integer!")
			this.voices[i].interval = 1 / rat[i];
		}
	}
	get ratios(){
		if(!this._get_ratios){
			this._get_ratios = this.voices.map(v=>1/v.interval);
		}
		return this._get_ratios;
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
				this.voices.push(new Voice(null, this._get_subdivide_at(i), this.synths[i], this._start, this._end));
			}
		}
	}

	_get_subdivide_at(i){
		return ( typeof this._subdivide == "number" ? this._subdivide : this._subdivide[i] ) || 1;
	}

	set subdivide(sub) {
		if(this._subdivide == sub)return;

		if(typeof sub == "number"){
			if(sub<=0){ return; }
			this._subdivide = sub;
			for (var v of this.voices) {
				v.subdivide = sub;
			}
		}else if(sub instanceof Array){
			var old_subdivide = this._subdivide;
			this._subdivide = [];
			for(var i=0; i<this.voices.length; i++){
				var v = this.voices[i];
				var s = (sub[i] > 0 ? sub[i] : false) || old_subdivide[i] || (typeof old_subdivide == "number" ? old_subdivide : null) || 1;

				this._subdivide[i] = s;
				v.subdivide = s;
			}
		}
	}
	get subdivide() {
		return this._subdivide;
	}

	get looplength(){
		return this._end - this._start;
	}
	set looplength(v){
		if(v == this._end - this._start)return;

		this._end = this._start + v;
		this.setLoop(this._start, this._end);
	}

	setLoop(start, end=null) {
		if(start == this._start && (!end || end == this._end))return;
		
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