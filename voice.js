class Voice{
	constructor(interval, subdivide, synth, start, end){
		if(!synth)throw new Error("no synth specified!")
		this.synth = synth;
		
		this.seq = new Tone.Part(this._trigger.bind(this), []);
		this.seq.start(0);
		this.seq.loop = false;
		this.seq.loopEnd = '1m';

		this._start = start || 0;
		this._length = end - start || 1;
		this._subdivide = subdivide || 1;
		this._interval = interval || 1/4;
		this._update_sequence();
	}

	set interval(v){
		if(v == this._interval)return;
		this._interval = v;
		this._update_sequence();
	}
	get interval(){
		return this._interval;
	}
	
	set subdivide(v){
		if(v == this._subdivide)return;
		if(typeof v != "number")throw new Error("subdivide value is not a number!");

		this._subdivide = v;
		this._update_sequence();
	}
	get subdivide(){
		return this._subdivide;
	}
	
	setLoop(start=null, end=null){
		this._start = start;
		this._length = end - start;
		this.seq.loopStart = mfrc(start);
		this.seq.loopEnd = mfrc(end);
		this._update_sequence(); // length changed
	}
	
	_trigger(time, value){
		// this.synth.triggerAttackRelease(
		// 	this.synth.m_note_to_play || 'C4', 
		// 	this.synth.m_duration_to_play || 0.01, // m_note_to_play and m_duration_to_play is bound in synths.js
		// 	time, 
		// 	value.accent ? 1 : 0.1); 
		// 
		this.synth.triggerRelease(time);

		this.synth.triggerAttack(
			this.synth.m_note_to_play || 'C4', 
			Tone.Time(time).toSeconds() + 0.01, 
			value.accent ? 1 : 0.3);
	}
	
	dispose(){
		this.seq.stop();
		this.seq.removeAll();
		this.seq.dispose();
	}
	
	_update_sequence(){
		this.seq.removeAll();
		
		var D = this._interval * this._length / this._subdivide;
		var n = this._length / D |0;
		var td = this._start;
		
		for(var i=0; i<n; i++){
			this.seq.add(mfrc(td), {accent: (i%this._subdivide)==0 });
			td += D;
		}
	}
}