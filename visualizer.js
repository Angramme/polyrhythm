const CAN = document.getElementById("CAN");
const CTX = CAN.getContext('2d');


function resize_can(){
	CAN.width = CAN.offsetWidth;
	CAN.height = CAN.offsetHeight;
}
resize_can();
window.addEventListener("resize", resize_can);


function draw(time, tA, tB, barP){
	
	CTX.clearRect(0,0, CAN.width, CAN.height);
	
	CTX.fillStyle = "yellow";
	for(var t of tA){
		var frac = t / time;
		
		CTX.fillRect(
			frac * CAN.width |0, 0.16666 * CAN.height |0,
			5, 0.16666 * CAN.height |0);
	}
	
	CTX.fillStyle = "blue";
	for(var t of tB){
		var frac = t / time;
		
		CTX.fillRect(
			frac * CAN.width |0, 4 * 0.16666 * CAN.height |0,
			5, 0.16666 * CAN.height |0);
	}
	
	CTX.fillStyle = "white";
	CTX.fillRect(barP / time * CAN.width, 0, 1, CAN.height);
}