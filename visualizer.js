const CAN = document.getElementById("CAN");
const CTX = CAN.getContext('2d');


function resize_can(){
	CAN.width = CAN.offsetWidth;
	CAN.height = CAN.offsetHeight;
}
resize_can();
window.addEventListener("resize", resize_can);

var SEG_COLORS = [
	'yellow','blue','red','cyan','green','magenta'
];

function draw(ens, barP){
	CTX.clearRect(0,0, CAN.width, CAN.height);

	ens.forEach(seg=>{
		//beats
		for(var i=0, n=seg.voices.length; i<n; i++){
			var v = seg.voices[i];
			CTX.fillStyle = SEG_COLORS[i];
			draw_beats(
				v._interval, 
				v._subdivide,
				seg._repeat,
				seg._start / ens._length * CAN.width, 
				CAN.height / n * (0.5+i) |0, 
				seg.looplength / ens._length * CAN.width);
		}

		//segment separator line
		CTX.fillStyle = "gray";
		CTX.fillRect(seg._start / ens._length * CAN.width -1 |0, 0, 2, CAN.height);

		//repetition dots
		for(var i=1; i<seg._repeat; i++){
			const x = (seg._start + (seg._end - seg._start) * i )/ ens._length * CAN.width -1 |0;

			CTX.strokeStyle = "white";
			CTX.lineWidth = 2;
			CTX.beginPath();
			CTX.setLineDash([6, 10]);
			CTX.moveTo(x, 0);
			CTX.lineTo(x, CAN.height);
			CTX.stroke();
		}
	});

	CTX.fillStyle = 'white';
	CTX.fillRect(CAN.width * barP |0, 0, 2, CAN.height);
}

function draw_beats(interval, subdivide, repeat, x, y, W){
	W = W || CAN.width;
	var d = W * interval / subdivide;

	var n = W / d |0;
	var N = n * repeat;

	var hh = CAN.height * 0.05 |0;
	var w = 5;

	for(var i=0; i<N; i++){
		CTX.globalAlpha = i < n ? 1 : 0.4;
		CTX.fillRect(i*d +x |0, y-hh, w, i % subdivide == 0 ? hh*2 : hh*0.5);
	}
}