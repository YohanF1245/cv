console.log("ca charge?");
var y = 0;
var x = 60;
var hitboxes = [380, 380, 380, 380, 380, 380, 380, 380, 380, 380];
var matrixHitboxes = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
var canva = document.getElementById("frameApp");
var ctx = canva.getContext("2d");
var playMatrix = new Array(20).fill(Array(10).fill(0));
console.log(playMatrix);
var topDraw = [0, 0, 0];
var playerPosMatrixX;
var playerPosMatrixY;
var lastLineWithBlocks;
var laBarre = [
	[0, 1, 0, 0],
	[0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
];
var z = [
	[0, 1, 1],
	[1, 1, 0],
	[0, 0, 0]
];
var s = [
	[1, 1, 0],
	[0, 1, 1],
	[0, 0, 0]
];
var t = [
	[0, 1, 0],
	[1, 1, 1],
	[0, 0, 0]
];
var o = [
	[0, 1, 1],
	[0, 1, 1],
	[0, 0, 0]
];
var l = [
	[0, 1, 0],
	[0, 1, 0],
	[0, 1, 1]
];
var ji = [
	[0, 1, 0],
	[0, 1, 0],
	[1, 1, 0]
];
var thisTetra;
var tetraminos = [laBarre, z, s, t, o, l, ji];
var colors = ["lightblue","red","green","purple","yellow","orange","blue"];
var playerTetra;
var pieceHitbox;
console.log(tetraminos);
randTetra();
function calcPieceHitbox(piece){
	
}
function randTetra() {
    var tempT = Math.floor(Math.random() * 6);
	thisTetra = colors [tempT];
	console.log("randomize tetra : "+tempT+" : "+tetraminos[tempT]);
	playerTetra = tetraminos[tempT];
	calcLastLineWithBlocks();
	
}
function calcLastLineWithBlocks() {
	var k = playerTetra.length;
	for(var i = k; i>0 ; i--){
		for(var j = k; j>0 ; j--){
			console.log("last line with block :"+lastLineWithBlocks);
			if(playerTetra[i-1][j-1]===1){
				console.log("last line with block :"+lastLineWithBlocks);
				lastLineWithBlocks=i-1;
				console.log("last line with block :" + lastLineWithBlocks);
				i = 0;
				j = 0;
			}
		}
	}
}
function kekw() {
	if (canva.getContext) {
		document.getElementById("navigateurSupported").innerHTML = "supoprtey";
	}
	ctx.fillStyle = ""+thisTetra;
	for (var i = 0; i < playerTetra.length; i++) {
		for (var j = 0; j < playerTetra.length; j++) {
			if (playerTetra[i][j] === 1) {
				ctx.clearRect(x + 20 * j, y + 20 * i, 20, 20);
			}
		}
	}
	y++;
	checkMatrix();
	console.log("*----------------------------------------------------------*");
	console.log(playMatrix)
	
	for (var i = 0; i < playerTetra.length; i++) {
		for (var j = 0; j < playerTetra.length; j++) {
			if (playerTetra[i][j] === 1) {
				ctx.fillRect(x + 20 * j, y + 20 * i, 20, 20);
				// if (y === hitboxes[Math.floor(x / 20)]) {
				// 	hitboxes[Math.floor(x / 20)] = hitboxes[Math.floor(x / 20)] - 20;
				// 	y = 0;
				// 	randTetra()
				// }
				console.log("checking player posmatrix" +  matrixHitboxes[playerPosMatrixX] + " lastlineWithBlocks " + lastLineWithBlocks);
				if (playerPosMatrixY === matrixHitboxes[playerPosMatrixX]-playerTetra.length+lastLineWithBlocks) {
					y = 0;
					x = 60;
					randTetra();
				}
			}
		}
	}
}
function checkMatrix(){
	playerPosMatrixX = Math.floor(x/20);
	playerPosMatrixY = Math.floor(y/20);
	console.log("playerTetralengt : "+playerTetra.length+" posX "+playerPosMatrixX+" posY"+playerPosMatrixY);
	var iHasBock=false;
	var k = playerTetra.length;
	var tempHB;
	for(var i = lastLineWithBlocks; i >  0; i--){
		console.log("i = "+i+" k="+k);
		for(var j=0; j<k ; j++){
			console.log("computing hitboxes"+playerTetra.length);
			if(playerTetra[i-1][j] ===1){
				playMatrix[playerPosMatrixY+i][playerPosMatrixX+j]=1;
				console.log("put x"+(playerPosMatrixY+i)+" and y "+(playerPosMatrixX+j) );
				
			}
		}
		
	}
}
function moveRight() {
	if (x < 180) {
		for (var i = 0; i < playerTetra.length; i++) {
			for (var j = 0; j < playerTetra.length; j++) {
				ctx.clearRect(x + 20 * i, y + 20 * j, 20, 20);
			}
		}
		x += 20;
		for (var i = 0; i < playerTetra.length; i++) {
			for (var j = 0; j < playerTetra.length; j++) {
				if (playerTetra[i][j] === 1) {
					ctx.fillRect(x + 20 * j, y + 20 * i, 20, 20);
				}
			}
		}
	}
}
function moveLeft() {
	if (x < 180) {
		for (var i = 0; i < playerTetra.length; i++) {
			for (var j = 0; j < playerTetra.length; j++) {
				ctx.clearRect(x + 20 * i, y + 20 * j, 20, 20);
			}
		}
		x -= 20;
		for (var i = 0; i < playerTetra.length; i++) {
			for (var j = 0; j < playerTetra.length; j++) {
				if (playerTetra[j][i] === 1) {
					ctx.fillRect(x + 20 * i, y + 20 * j, 20, 20);
				}
			}
		}
	}
}
setInterval(kekw, 16);
addEventListener("keydown", (event) => {
	if (event.key === "ArrowRight") {
		moveRight();
	} else if (event.key === "ArrowLeft") {
		moveLeft();
	}
	console.log("*-------------------------------*");
	console.log("key keypressed: " + event.key);
	console.log("coe keypressed: " + event.code);
});
