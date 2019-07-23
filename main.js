console.log("%c I see you there! ", "background:red; color:cyan");


document.documentElement.addEventListener("mousedown", function(){
	if (Tone.context.state !== 'running')
		Tone.context.resume();
})



const playbtn = document.getElementById("playbtn");
playbtn.addEventListener("click", ()=>{
	Tone.Transport.toggle();
	var paused = Tone.Transport.state == "stopped";
	playbtn.innerHTML = paused ? "PLAY!" : "PAUSE";
});


/*
var voices = [];
voices.push(new Voice(null, 1/4, 2))
*/

var seg = new Segment([4, 3], 1, [
		new Tone.MembraneSynth().toMaster(),
		new Tone.PluckSynth().toMaster()
	]);


var lastT = 0;
function draw_loop(t=0){
	let dt = (t - lastT) / 1000;
	lastT = t;
	
	//draw(null, null, null, Tone.Transport.progress);
	
	//requestAnimationFrame(draw_loop);
}
draw_loop();




function updateTimings(){
	TIME = Number(document.getElementById("loop-duration").value) / 1000;
	
	const a = Number(document.getElementById("At").value);
	const b = Number(document.getElementById("Bt").value);
	//const timings = getPolyrhythm([a, b]);
	
	/*
	TIMINGS_A = timings.a;
	TIMINGS_B = timings.b;
	DURATION_A = TIME / a;
	DURATION_B = TIME / b;
	*/
	
	updateDynamicFavicon(a+":"+b);
}
updateTimings();
document.getElementById("At").addEventListener("change", updateTimings);
document.getElementById("Bt").addEventListener("change", updateTimings);
document.getElementById("loop-duration").addEventListener("change", updateTimings);
window.addEventListener("keydown", e=>{if(e.code=="Enter")updateTimings});



