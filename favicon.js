function updateDynamicFavicon(text){
	const fsize = 32;
	const can = document.createElement("canvas");
	can.width = can.height = fsize;
	
	const ctx = can.getContext('2d');
	
	
	ctx.fillStyle = 'yellow';
	ctx.fillRect(0,0,fsize, fsize);
	

	//adjust text size to text width
	var font_size = 10;
	ctx.font = "bold "+font_size+"px Arial";
	font_size *= (fsize*0.9) / ctx.measureText(text).width;
	ctx.font = "bold "+font_size+"px Arial";

	ctx.fillStyle = 'black';
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText(text, fsize/2, fsize/2);
	
	const fav = document.getElementById("favicon");
	fav.href = can.toDataURL('image/png');
}
