console.log("%c I see you there! ", "background:red; color:cyan");


//LIBRARY THINGIES
document.documentElement.addEventListener("mousedown", function () {
	if (Tone.context.state !== 'running')
		Tone.context.resume();
})



//SOUND
var ens = new Ensemble([
	CreateClickSynth(),
	CreateHiHatSynth(),
	CreateKickSynth(),
	CreateStringSynth(),
]);



//VISUALIZATION
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



//UI
const playbtn = document.getElementById("playbtn");
playbtn.addEventListener("click", () => {
	Tone.Transport.toggle();
	var paused = Tone.Transport.state == "stopped";
	playbtn.innerHTML = paused ? "PLAY!" : "PAUSE";
});



const segment_list_elem = document.getElementById("segment-list");
function addSegment(canclose){
	var seg_ens_id = null;

	var [seg, dispose] = createSegment(
		function(cache){
			ens.updateSegment(seg_ens_id, segment=>{
				segment.repeat = cache.repeat;
				segment.ratios = cache.ratios;
				segment.subdivide = cache.subdivide;
				segment.looplength = cache.scale;
			});

			redraw_favicon();
		},
		canclose ? function(){ //close
			dispose();
			segment_list_elem.removeChild(seg);
			ens.removeSegment(seg_ens_id);
		} : false,
		{
			ratios:"1:2",
		}
	);

	seg_ens_id = ens.addSegment([1,2])
	segment_list_elem.appendChild(seg);

	redraw_favicon();
}

function redraw_favicon(){
	updateDynamicFavicon(ens.forEach(s=>s.ratios.join(":")).join("\n"));
}

{ // do we have a special url?
	var ratios = (new URL(window.location.href)).searchParams.get('ratios')
	if(ratios){
		//ratios.split("s").map(v=>v.split("v"))
		console.warn("special urls not implemented yet!");
	}else{
		addSegment(false);
	}
}

document.getElementById("addbtn").addEventListener("click", e=>{
	//var i = Number(document.getElementById("add-indexIN").value);
	addSegment(true);
});


function changeBPM(bpm){
	Tone.Transport.bpm.value = bpm;
}
document.getElementById("bpmIN").addEventListener("change", ()=>{
	changeBPM( Number( document.getElementById("bpmIN").value ) );
})

