class Ensemble{
	constructor(synths=[]){
		Tone.Transport.loop = true;
		Tone.Transport.loopStart = 0;

		this.synths = synths;
		this._segments = [];
		this._length = 0;
	}
	
	removeAll(){
		while(this._segments.length > 0){
			this._segments.pop().dispose();
		}
		this._length = 0;
	}
	addSegment(ratios, len=0, subdivide){
		var s = new Segment(ratios, subdivide, this.synths);
		this._segments.push(s)
		s.setLoop(this._length, len ? len + this._length : null);

		this._length += s.looplength;

		this._update_transport_loop()
	}
	removeSegment(i){
		if(typeof i != "number")throw new Error("i is not a number");
		var seg = this._segments.splice(i, 1)[0];

		var difference = -seg.looplength;

		this._length += difference;
		this._update_transport_loop()

		this._move_all_after_index(i-1, difference);

		seg.dispose();
	}
	updateSegment(i, callback){
		var seg = this._segments[i];

		var oldseglength = seg.looplength;

		callback(seg);

		var newseglength = seg.looplength;
		if(oldseglength != newseglength){
			this._length = this._length - oldseglength + newseglength;
			this._update_transport_loop();

			var difference = newseglength - oldseglength;
			this._move_all_after_index(i, difference);
		}
	}


	_move_all_after_index(i, difference){
		for(var j=i+1; j<this._segments.length; j++){
			var s = this._segments[j]
			s.setLoop(s._start + difference, null); // move them
		}
	}
	_update_transport_loop(){
		Tone.Transport.loopEnd = mfrc(this._length);
	}
}