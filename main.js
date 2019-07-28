console.log("%c I see you there! ", "background:red; color:cyan");


document.documentElement.addEventListener("mousedown", function () {
	if (Tone.context.state !== 'running')
		Tone.context.resume();
})



const playbtn = document.getElementById("playbtn");
playbtn.addEventListener("click", () => {
	Tone.Transport.toggle();
	var paused = Tone.Transport.state == "stopped";
	playbtn.innerHTML = paused ? "PLAY!" : "PAUSE";
});


{ // do we have a special url?
	var ratios = (new URL(window.location.href)).searchParams.get('ratios')
	if(ratios){
		document.getElementById("ratiosIN").value = ratios;
	}
}



var ens = new Ensemble([
	CreateClickSynth(),
	CreateHiHatSynth(),
	CreateKickSynth(),
	CreateStringSynth(),
]);


var lastT = 0;
var totalT = 0;
var FPScap = 61;
function draw_loop(t = 0) {
	let dt = (t - lastT) / 1000;
	lastT = t;

	totalT += dt;
	
	if(totalT > 1 / FPScap){
		totalT = 0;

		draw(ens, Tone.Transport.progress);
	}

	requestAnimationFrame(draw_loop);
}
draw_loop();



function updateTimings() {
	var ratios_v = document.getElementById("ratiosIN").value; //raw values, possible errors
	const ratios_e = ratios_v.trim().split(":").map(cleanEquation); //clean equatios
	const ratios_n = ratios_e.map(eval).map(v=>v?Number(v):0); //equation results
	
	document.getElementById("ratiosIN").value = ratios_e.join(":");
	
	//update sequence
	ens.removeAll();
	ens.addSegment(ratios_n, 1);
	
	//update icon
	updateDynamicFavicon(ratios_n.join(":"));
}
updateTimings();
document.getElementById("ratiosIN").addEventListener("change", updateTimings);


function changeBPM(bpm){
	Tone.Transport.bpm.value = bpm;
}
document.getElementById("bpmIN").addEventListener("change", ()=>{
	changeBPM( Number( document.getElementById("bpmIN").value ) );
})


function cleanEquation(str){
	return str.replace(/\s|[^0-9*/+-]/g, '');
}
