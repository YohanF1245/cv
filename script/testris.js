var y = 0;
var x = 60;
var canva = document.getElementById("frameApp");
var ctx = canva.getContext("2d");
var lines = 0;
var intervalid;
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
	[9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
];
var leftBoxOffset = 0;
var rightBoxOffset = 0;
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
randTetra();
function randTetra() {
	y = 0;
	x = 60;
	var tempT = Math.floor(Math.random() * 7);
	thisTetra = colors[tempT];
	colorIndex = tempT;
	playerTetra = tetraminos[tempT];
	calcLastLineWithBlocks();
	intervalid = setInterval(kekw, 16);
	leftBox();
	rightBox();
}
function calcLastLineWithBlocks() {
	var k = playerTetra.length;
	for (var i = k; i > 0; i--) {
		for (var j = k; j > 0; j--) {
			if (playerTetra[i - 1][j - 1] === 1) {
				lastLineWithBlocks = i - 1;
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
	for (var i = 0; i < playerTetra.length; i++) {
		for (var j = 0; j < playerTetra.length; j++) {
			if (playerTetra[i][j] === 1) {
				ctx.fillRect(x + 20 * j, y + 20 * i, 20, 20);
			}
		}
	}
	checkMatrix();
}
function rotatePiece() {
	const N = playerTetra.length - 1;
	const result = playerTetra.map((row, i) =>
		row.map((val, j) => playerTetra[N - j][i])
	);
	playerTetra.length = 0;
	playerTetra.push(...result);
	ctx.clearRect(x, y, playerTetra.length * 20, playerTetra.length * 20);
	calcLastLineWithBlocks();
}
function checkMatrix() {
	var populateMatrixBool = false;
	for (var i = 0; i < playerTetra.length; i++) {
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
		populateMatrix();
	}
	// }
}
function removeLine(i) {
	playMatrix.splice(i--, 1);
	playMatrix.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	console.log(playMatrix);
}
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
	for (var i = playerTetra.length - 1; i > 0; i--) {
		for (var j = 0; j < playerTetra.length; j++) {
			if (playerTetra[i][j] != 0) {
				lastColWithBlock = i;
				i = -1;
				j = 5;
			}
		}
	}
	rightBoxOffset = lastColWithBlock;
}
function redrawMatrix() {
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 10; j++) {
			if (playMatrix[i][j] > 0) {
				var tempColor = colors[playMatrix[i][j] - 1];
				var tempX = j * 20;
				var tempY = i * 20;
				ctx.fillStyle = "" + tempColor;
				ctx.fillRect(tempX, tempY, 20, 20);
			} else {
				var tempX = j * 20;
				var tempY = i * 20;
				ctx.clearRect(tempX, tempY, 20, 20);
			}
		}
	}
	randTetra();
}
function populateMatrix() {
	clearInterval(intervalid);
	for (var i = 0; i < playerTetra.length; i++) {
		for (var j = 0; j <= lastLineWithBlocks; j++) {
			var a = playerPosMatrixY + j;
			var b = playerPosMatrixX + i;
			if (playerTetra[j][i] === 1) {
				playMatrix[a][b] = colorIndex + 1;
			}
		}
	}
	for (var i = 0; i < playMatrix.length; i++) {
		var lineCheck = true;
		for (var j = 0; j < 10; j++) {
			if (playMatrix[i][j] === 0 || playMatrix[i][j] === 9) {
				lineCheck = false;
			}
		}
		if (lineCheck) {
			removeLine(i);
			lines++;
			document.getElementById("amoutOfLines").innerHTML = lines;
			console.log("play matrix i =" + playMatrix[i]);
		}
	}
	redrawMatrix();
}
function moveRight() {
	leftBox();
	rightBox();
	if (x < 200 - playerTetra.length * 20 + (rightBoxOffset - 1) * 20) {
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
	if (x > 0 - leftBoxOffset * 20) {
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
function pauseGame() {
	if (isPause === false) {
		clearInterval(intervalid);
		isPause = true;
	} else {
		intervalid = setInterval(kekw, 16);
		isPause = false;
	}
}
function resetGame() {
	clearInterval(intervalid);
	y = 0;
	x = 60;
	lines = 0;
	playMatrix = [
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
	[9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
];
	leftBoxOffset = 0;
	rightBoxOffset = 0;
	isPause = false;
	redrawMatrix();
}
addEventListener("keydown", (event) => {
	if (event.key === "ArrowRight") {
		moveRight();
	} else if (event.key === "ArrowLeft") {
		moveLeft();
	} else if (event.key === "o") {
		rotatePiece();
	}
});
