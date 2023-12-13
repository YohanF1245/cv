console.log("ca charge?");
var y = 0;
var x = 60;
var hitboxes = [380, 380, 380, 380, 380, 380, 380, 380, 380, 380];
var matrixHitboxes = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
var canva = document.getElementById("frameApp");
var ctx = canva.getContext("2d");
var playMatrixd = new Array(20).fill(Array(10).fill(0));
var playMatrix = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
];
var leftBoxOffset = 0;
var rightBoxOffset = 0;
console.log(playMatrix);
var topDraw = [0, 0, 0];
var playerPosMatrixX;
var playerPosMatrixY;
var lastLineWithBlocks;
var isPause = false;
var laBarre = [
	[0, 1, 0, 0],
	[0, 1, 0, 0],
	[0, 1, 0, 0],
	[0, 1, 0, 0],
];
var z = [
	[0, 1, 1],
	[1, 1, 0],
	[0, 0, 0],
];
var s = [
	[1, 1, 0],
	[0, 1, 1],
	[0, 0, 0],
];
var t = [
	[0, 1, 0],
	[1, 1, 1],
	[0, 0, 0],
];
var o = [
	[0, 1, 1],
	[0, 1, 1],
	[0, 0, 0],
];
var l = [
	[0, 1, 0],
	[0, 1, 0],
	[0, 1, 1],
];
var ji = [
	[0, 1, 0],
	[0, 1, 0],
	[1, 1, 0],
];
var lockCoords;
var thisTetra;
var tetraminos = [laBarre, z, s, t, o, l, ji];
var colors = [
	"lightblue",
	"red",
	"green",
	"purple",
	"yellow",
	"orange",
	"blue",
];
var colorIndex;
var playerTetra;
var pieceHitbox;
// console.log(tetraminos);
randTetra();
function calcPieceHitbox(piece) {}
function randTetra() {
	// console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
	y = 0;
	x = 60;
	var tempT = Math.floor(Math.random() * 7);
	thisTetra = colors[tempT];
	colorIndex = tempT;
	// console.log("randomize tetra : "+tempT+" : "+tetraminos[tempT]);
	playerTetra = tetraminos[tempT];
	calcLastLineWithBlocks();

	intervalid = setInterval(kekw, 16);
	leftBox();
	rightBox();
	// castShadow();
}
function calcLastLineWithBlocks() {
	var k = playerTetra.length;
	for (var i = k; i > 0; i--) {
		for (var j = k; j > 0; j--) {
			// console.log("last line with block :"+lastLineWithBlocks);
			if (playerTetra[i - 1][j - 1] === 1) {
				// console.log("last line with block :"+lastLineWithBlocks);
				lastLineWithBlocks = i - 1;
				// console.log("last line with block :" + lastLineWithBlocks);
				i = 0;
				j = 0;
			}
		}
	}
}
function kekw() {
	playerPosMatrixX = Math.floor(x / 20);
	playerPosMatrixY = Math.floor(y / 20);
	if (canva.getContext) {
		document.getElementById("navigateurSupported").innerHTML = "supoprtey";
	}
	ctx.fillStyle = "" + thisTetra;
	for (var i = 0; i < playerTetra.length; i++) {
		for (var j = 0; j < playerTetra.length; j++) {
			if (playerTetra[i][j] === 1) {
				ctx.clearRect(x + 20 * j, y + 20 * i, 20, 20);
			}
		}
	}
	y++;

	// console.log("*----------------------------------------------------------*");
	// console.log(playMatrix)

	for (var i = 0; i < playerTetra.length; i++) {
		for (var j = 0; j < playerTetra.length; j++) {
			if (playerTetra[i][j] === 1) {
				ctx.fillRect(x + 20 * j, y + 20 * i, 20, 20);
				if (y === hitboxes[Math.floor(x / 20)]) {
					// hitboxes[Math.floor(x / 20)] = hitboxes[Math.floor(x / 20)] - 20;
					// y = 0;
					// // randTetra()
				}
				// console.log(
				// 	"checking player posmatrix" +
				// 		matrixHitboxes[playerPosMatrixX] +
				// 		" lastlineWithBlocks " +
				// 		lastLineWithBlocks
				// );
			}
		}
	}
	checkMatrix();
}
function rotatePiece() {
	const N = playerTetra.length - 1;   // use a constant
    // use arrow functions and nested map;
    const result = playerTetra.map((row, i) => 
         row.map((val, j) => playerTetra[N - j][i])
    );
    playerTetra.length = 0;       // hold original array reference
    playerTetra.push(...result);  // Spread operator
   console.log("right offset ="+rightBoxOffset+" leff offest "+leftBoxOffset);
	
	ctx.clearRect(x, y, playerTetra.length * 20, playerTetra.length * 20);
	console.log("-----------------------------------------------");
	console.log(playerTetra);
	console.log("right offset ="+rightBoxOffset+" leff offest "+leftBoxOffset);
	calcLastLineWithBlocks();
}
function checkMatrix() {
	// console.log("playerTetralengt : "+playerTetra.length+" posX "+playerPosMatrixX+" posY"+playerPosMatrixY);
	if (
		y === (8000-((playerTetra.length-lastLineWithBlocks)*20))
	) {
		populateMatrix();
		console.log(playMatrix);
	} else {
		var populateMatrixBool = false;
		for (var i = 0; i < playerTetra.length; i++) {
			console.log("lastline with block" + lastLineWithBlocks);
			for (var j = 0; j < lastLineWithBlocks + 1; j++) {
				if (
					playerTetra[j][i] === 1 &&
					playMatrix[playerPosMatrixY + j + 1][playerPosMatrixX + i] > 0
				) {
					i = 20;
					j = 20;
					populateMatrixBool = true;
				}
			}
		}
		if (populateMatrixBool === true) {
			for(var i=0; i<playMatrix.length; i++){
				var lineCheck = true;
				for(var j=0; j<10;j++){
					if(playMatrix[i][j] === 0 || playMatrix[i][j]===9){
						lineCheck = false;
					}
				}
				if(lineCheck){
					removeLine(i);
					console.log("play matrix i ="+playMatrix[i]);
					
				}
			}
			populateMatrix();
		}
	}
}
function removeLine(i){
	playMatrix.splice(i--,1);
					playMatrix.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);}
function leftBox() {
	var firstRowWithBlocks = 0;
	for (var i = 0; i < playerTetra.length; i++) {
		for (var j = 0; j < playerTetra.length; j++) {
			if (playerTetra[j][i] != 0) {
				firstRowWithBlocks = i;
				i = 5;
				j = 5;
			}
		}
	}
	leftBoxOffset = firstRowWithBlocks;
}
function rightBox() {
	var lastColWithBlock = playerTetra.length - 1;
	for (var i = playerTetra.length -1 ; i > 0; i--){
		for (var j = 0; j < playerTetra.length; j++){
			if (playerTetra[i][j] != 0) {
				lastColWithBlock = i; 
					console.log("check [" + j + "]" + "[" + i + "]")
				i = -1;
				j = 5;
				
			}
			
		}
	}
	rightBoxOffset = lastColWithBlock;
}
function pauseGame() {
	if (isPause === false) {
		clearInterval(intervalid);
		isPause = true;
	} else {
		intervalid = setInterval(kekw, 16);
		isPause = false;
	}
}
// function castShadow() {

// 	console.log("shadow being cast");
// 	playerPosMatrixX = Math.floor(x / 20);
// 	lockCoords = 0;
// 	for (var i = playerTetra.length-1; i >= 0; i--) {
// 		for (var j = playerTetra.length-1; j >= 0; j--){
// 			console.log("i = " + i + " j =" + j);
// 			if (playerTetra[i][j] === 1) {
// 				lockCoords = ((calcCord(playerPosMatrixX) - 1) - (playerTetra.length - j));
// 				console.log("player pos matrix"+playerPosMatrixX)
// 				j=-1;
// 			}
// 		}
// 	} console.log("lock coords" + lockCoords)
// 	for (var i = 0; i < playerTetra.length; i++) {
// 		for (var j = 0; j < playerTetra.length; j++) {
// 			if (playerTetra[i][j] === 1) {
// 				 ctx.globalAlpha = 0.3;
// 				ctx.clearRect(x + 20 * j, (lockCoords*20) + 20 * i, 20, 20);
// 				console.log("draw rec"+(x+20*j)+" , "+(lockCoords +20 *i));
// 				 ctx.globalAlpha = 1.0;
// 			}
// 		}
// 	}
// 	for (var i = 0; i < playerTetra.length; i++) {
// 		for (var j = 0; j < playerTetra.length; j++) {
// 			if (playerTetra[i][j] === 1) {
// 				 ctx.globalAlpha = 0.3;
// 				ctx.fillRect(x + 20 * j, (lockCoords*20) + 20 * i, 20, 20);
// 				console.log("draw rec"+(x+20*j)+" , "+((lockCoords*20) +20 *i));
// 				 ctx.globalAlpha = 1.0;
// 			}
// 		}
// 	}
// 	}
// 	function calcCord(tempX) {
// 		var tempMaxHeight = 19;
// 		for (var i = 19; i >= 0; i--){
// 		console.log("playmatrix"+i+" "+tempX)
// 		if (playMatrix[i][tempX]>0) {
// 			tempMaxHeight = i;
// 		}
// 		console.log("maxheigt"+tempMaxHeight)
// 		}
// 		return (tempMaxHeight);
// }

function redrawMatrix() {
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 10; j++) {
			if (playMatrix[i][j] > 0) {
				var tempColor = colors[playMatrix[i][j] - 1];
				var tempX = j * 20;
				var tempY = i * 20;
				ctx.fillStyle = "" + tempColor;
				ctx.fillRect(tempX, tempY, 20, 20);
			}
		}
	}
	randTetra();
}
function populateMatrix() {
	clearInterval(intervalid);
	for (var i = 0; i < playerTetra.length; i++) {
		for (var j = 0; j <= lastLineWithBlocks; j++) {
			// console.log("*******------------------------------***********************")
			// console.log("iterations : i " + i + " j" + j);
			// console.log("playerTetra.length " + playerTetra.length);
			// console.log("lastlinewith block : " + lastLineWithBlocks);
			// console.log("player pos x " + playerPosMatrixX + " player pos y " + playerPosMatrixY)
			var a = playerPosMatrixY + j;
			var b = playerPosMatrixX + i;
			// console.log("populatio of ["+a+"]["+b+"] = "+playerTetra[j][i])
			if (playerTetra[j][i] === 1) {
				playMatrix[a][b] = colorIndex + 1;
				// 	console.log(
				// 		"/////////////////////////////////------------//////////////////////////"
				// 	);
				// 	console.log(
				// 		"added playmatrix[" + a + "][" + b + "] = " + (colorIndex + 1)
				// 	);
				// 	console.log(typeof colorIndex);
				// 	console.log(
				// 		"/////////////////////////////////------------//////////////////////////"
				// 	);
				// 	console.log(playMatrix);
			}
			// console.log(
			// 	"*******------------------------------***********************"
			// );
		}
	}
	redrawMatrix();
}
function moveRight() {
	leftBox();
	rightBox();
	if (x < 200 - playerTetra.length * 20 + (rightBoxOffset-1) * 20) {
		console.log("rightboxoffset "+rightBoxOffset)
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
	leftBox();
	rightBox();
	if (x > (0-leftBoxOffset*20)) {
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
var intervalid;
addEventListener("keydown", (event) => {
	if (event.key === "ArrowRight") {
		moveRight();
	} else if (event.key === "ArrowLeft") {
		moveLeft();
	} else if (event.key === "o") {
		rotatePiece();
	}
	console.log("*-------------------------------*");
	console.log("key keypressed: " + event.key);
	console.log("coe keypressed: " + event.code);
});
