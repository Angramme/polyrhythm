const CAN = document.getElementById("CAN");
const CTX = CAN.getContext('2d');


function resize_can(){
	CAN.width = CAN.offsetWidth;
	CAN.height = CAN.offsetHeight;
}
resize_can();
window.addEventListener("resize", resize_can);