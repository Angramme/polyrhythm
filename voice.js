class Voice{
	constructor(interval, subdivide, synth){
		this.synth = synth || new Tone.PluckSynth().toMaster();
		
		this.seq = new Tone.Part(this._trigger.bind(this), []);
		this.seq.start(0);
		this.seq.loop = true;
		this.seq.loopEnd = '1m';
		
		this._length = 1;
		this._subdivide = subdivide || 1;
		this._interval = interval || 1/4;
		this._update_sequence();
	}
	
	set interval(v){
		this._interval = v;
		this._update_sequence();
	}
	get interval(){
		return this._interval;
	}
	
	set subdivide(v){
		this._subdivide = v;
		this._update_sequence();
	}
	get subdivide(){
		return this._subdivide;
	}
	
	setLoop(start=null, end=null){
		this._length = end - start;
		if(start)this.seq.loopStart = mfrc(start);
		if(end)this.seq.loopEnd = mfrc(end);
	}
	
	_trigger(time, value){
		this.synth.triggerAttackRelease('C4', 0.1, time, value.accent ? 1 : 0.5);
	}
	
	dispose(){
		this.seq.dispose();
		this.synth.dispose();
	}
	
	_update_sequence(){
		var D = this._interval / this._subdivide;
		var n = this._length / D |0;
		var td = 0;
		
		for(var i=0; i<n; i++){
			this.seq.add(mfrc(td), {accent: (i%this._subdivide)==0 });
			td += D;
		}
	}
}