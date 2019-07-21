console.log("%c I see you there! ", "background:red; color:cyan");


document.documentElement.addEventListener("mousedown", function(){
	if (Tone.context.state !== 'running')
		Tone.context.resume();
})

var PAUSE_UPDATE = true;
var TIME = 1;

var TIMINGS_A = [];
var TIMINGS_B = [];

var DURATION_A = 0;
var DURATION_B = 0;

var TRIGGERED_A = false;
var TRIGGERED_B = false;

var BAR_P = 0;


const playbtn = document.getElementById("playbtn");
playbtn.addEventListener("click", ()=>{
	PAUSE_UPDATE = !PAUSE_UPDATE;
	playbtn.innerHTML = PAUSE_UPDATE ? "PLAY!" : "PAUSE";
});

const synthA = new Tone.AMSynth().toMaster();
const synthB = new Tone.PluckSynth().toMaster();


var lastT = 0;
function draw_loop(t=0){
	let dt = (t - lastT) / 1000;
	lastT = t;
	
	if(!PAUSE_UPDATE){
	
		BAR_P += dt;
		BAR_P %= TIME;
		
		var dA = (BAR_P / (DURATION_A*0.5)|0)%2;
		if(dA==0 && !TRIGGERED_A){
			synthA.triggerAttackRelease('C5', 0.1);
			TRIGGERED_A = true;
		}else if(dA==1){
			TRIGGERED_A = false;
		}
		
		var dB = (BAR_P / (DURATION_B*0.5)|0)%2;
		if(dB==0 && !TRIGGERED_B){
			synthB.triggerAttackRelease('G4', 0.5);
			TRIGGERED_B = true;
		}else if(dB==1){
			TRIGGERED_B = false;
		}
	}
	
	draw(TIME, TIMINGS_A, TIMINGS_B, BAR_P);
	
	requestAnimationFrame(draw_loop);
}
draw_loop();

function updateTimings(){
	TIME = Number(document.getElementById("loop-duration").value) / 1000;
	
	const a = Number(document.getElementById("At").value);
	const b = Number(document.getElementById("Bt").value);
	const timings = getPolyrhythm(a, b, TIME);
	TIMINGS_A = timings.a;
	TIMINGS_B = timings.b;
	DURATION_A = TIME / a;
	DURATION_B = TIME / b;
	
	updateDynamicFavicon(a, b);
}
updateTimings();
document.getElementById("At").addEventListener("change", updateTimings);
document.getElementById("Bt").addEventListener("change", updateTimings);
document.getElementById("loop-duration").addEventListener("change", updateTimings);
window.addEventListener("keydown", e=>{if(e.code=="Enter")updateTimings});



function updateDynamicFavicon(a, b){
	const fsize = 32;
	const fav = document.getElementById("favicon");
	const can = document.createElement("canvas");
	can.width = can.height = fsize;
	const ctx = can.getContext('2d');
	ctx.fillStyle = 'yellow';
	ctx.fillRect(0,0,fsize, fsize);
	
	ctx.fillStyle = 'black';
	ctx.font = "bold 20px Arial";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText(a+":"+b, fsize/2, fsize/2);
	
	fav.href = can.toDataURL('image/png');
}
