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
	CreateClickSynth().toMaster(),
	CreateHiHatSynth().toMaster(),
	CreateStringSynth().toMaster(),
	CreateKickSynth().toMaster(),
]);



var lastT = 0;
function draw_loop(t = 0) {
	let dt = (t - lastT) / 1000;
	lastT = t;

	CTX.clearRect(0,0, CAN.width, CAN.height);

	// ens.draw(CTX);

	requestAnimationFrame(draw_loop);
}
draw_loop();



function updateTimings() {
	TIME = Number(document.getElementById("loop-duration").value) / 1000;

	var value = document.getElementById("ratiosIN").value;
	value = value.replace(/\s|[^0-9:*/+-]/g, '');
	document.getElementById("ratiosIN").value = value;
	
	const ratios = value.trim().split(":").map(eval).map(v=>v?Number(v):0);

	//update sequence
	ens.removeAll();
	ens.addSegment(ratios, 1);
	
	//update icon
	updateDynamicFavicon(value);
}
updateTimings();
document.getElementById("ratiosIN").addEventListener("change", updateTimings);
document.getElementById("loop-duration").addEventListener("change", updateTimings);
window.addEventListener("keydown", e => { if (e.code == "Enter") updateTimings });



