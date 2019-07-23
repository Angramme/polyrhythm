class Segment{
	constructor(ratios, subdivide=1, synths){
		this.voices = [];
		this.synths = synths;
		
		this._subdivide = subdivide;
		
		this.ratios = ratios;
		
		this.start = null;
		this.end = null;
	}
	
	reset(){
		for(var v of this.voices){
			v.dispose();
		}
		this.voices = [];
	}
	
	set ratios(rat){
		this.reset();
		for(var i=0; i<rat.length; i++){
			var r = rat[i];
			this.voices.push(new Voice(1/r, this._subdivide, this.synths[i] || null));
		}
	}
	
	subdivide(sub){
		this._subdivide = sub;
		for(var v of this.voices){
			v.subdivide = sub;
		}
	}
	
	addVoice(voice){
		this.voices.push(voice);
	}
	
	get loop_length(){
		return this.end - this.start;
	}
	
	updateVoicesLength(){
		for(var v of this.voices){
			v.setLoop(this.start, this.end);
		}
	}
}