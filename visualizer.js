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
		for(var i=0, n=seg.voices.length; i<n; i++){
			var v = seg.voices[i];
			CTX.fillStyle = SEG_COLORS[i];
			draw_beats(v._interval, CAN.height / n * (0.5+i));
		}
	});

	CTX.fillStyle = 'white';
	CTX.fillRect(CAN.width * barP, 0, 1, CAN.height);
}

function draw_beats(interval, y){
	var d = CAN.width * interval;
	var n = CAN.width / d;
	var hh = CAN.height * 0.05;
	var w = 5;

	for(var i=0; i<n; i++){
		CTX.fillRect(i*d, y-hh, w, hh*2);
	}
}