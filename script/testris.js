var y = 0;
var x = 70;
var hitboxes = [380, 380, 380, 380, 380, 380, 380, 380, 380, 380];
var canva = document.getElementById("frameApp");
var ctx = canva.getContext("2d");
var playMatrix = new Array(20).fill(Array(10).fill(0));
console.log(playMatrix);
var topDraw = [0, 0, 0];
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
	console.log("randomize tetra : "+tempT+" : "+tetraminos[tempT]);
    playerTetra = tetraminos[tempT];
	
}
function kekw() {
	if (canva.getContext) {
		document.getElementById("navigateurSupported").innerHTML = "supoprtey";
	}
	ctx.fillStyle = "rgb(200, 0, 0)";
	console.log("*---------------------------*");
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			console.log(playerTetra[i][j]);
			if (playerTetra[i][j] === 1) {
				if (topDraw[j] === 0) {
					topDraw[j] = i;
				}
			}
		}
	}
	console.log(topDraw);
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if (playerTetra[i][j] === 1) {
				ctx.clearRect(x + 20 * j, y + 20 * i, 20, 20);
			}
		}
	}
	y++;
	checkMatrix();
	console.log("*----------------------------------------------------------*");
	console.log(playMatrix)
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if (playerTetra[i][j] === 1) {
				ctx.fillRect(x + 20 * j, y + 20 * i, 20, 20);
				if (y === hitboxes[Math.floor(x / 20)]) {
					hitboxes[Math.floor(x / 20)] = hitboxes[Math.floor(x / 20)] - 20;
					y = 0;
					randTetra()
				}
			}
		}
	}
}
function checkMatrix(){
	var playerPosMatrixX = Math.floor(x/20);
	var playerPosMatrixY = Math.floor(y/20);var iHasBock=false;
	for(var i = playerTetra.length; i === 0; i--){
		for(var j=0; j<playerTetra.length ; j++){
			console.log("comuting hitboxes"+playerTetra.length)
			if(playerTetra[i-1][j] ===1){
				playMatrix[playerPosMatrixX+i][playerPosMatrixY+j]=1;
				;
			}
		}
		
	}
}
function moveRight() {
	if (x < 180) {
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				ctx.clearRect(x + 20 * i, y + 20 * j, 20, 20);
			}
		}
		x += 20;
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				if (playerTetra[i][j] === 1) {
					ctx.fillRect(x + 20 * j, y + 20 * i, 20, 20);
				}
			}
		}
	}
}
function moveLeft() {
	if (x < 180) {
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				ctx.clearRect(x + 20 * i, y + 20 * j, 20, 20);
			}
		}
		x -= 20;
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
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
