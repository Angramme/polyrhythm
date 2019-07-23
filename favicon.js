function updateDynamicFavicon(text){
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
	ctx.fillText(text, fsize/2, fsize/2);
	
	fav.href = can.toDataURL('image/png');
}
