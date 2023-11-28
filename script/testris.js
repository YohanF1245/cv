var y = 0;
var x = 0;
var hitboxes = [380, 380, 380, 380, 380, 380, 380, 380, 380, 380];
var canva = document.getElementById("frameApp");
var ctx = canva.getContext("2d");
var playMatrix;
var tertrominos = ["i", "j", "o", "s", "z", "l", "t"];
var tetraJ = [
	[0, 1, 0],
	[0, 1, 0],
	[1, 1, 0],
];
function kekw() {
	if (canva.getContext) {
		document.getElementById("navigateurSupported").innerHTML = "supoprtey";
	}
	ctx.fillStyle = "rgb(200, 0, 0)";

	for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
                ctx.clearRect(x+(20*i), y+(20*j), 20, 20);
		}
    } y++;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (tetraJ[j][i] === 1) {
			
			ctx.fillRect(x+(20*i), y+(20*j), 20, 20);
			if (y === hitboxes[Math.floor(x / 20)]) {
				hitboxes[Math.floor(x / 20)] = hitboxes[Math.floor(x / 20)] - 20;
				y = 0;
			}
            }
			
		}
    } 
    
}
function moveRight() {
	if (x < 180) {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                    ctx.clearRect(x+(20*i), y+(20*j), 20, 20);
                
                
                
            }
        }		x += 20;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (tetraJ[j][i] === 1) {
                
                ctx.fillRect(x+(20*i), y+(20*j), 20, 20);
                
                }
                
            }
        } 	}
}
function moveLeft() {
	if (x < 180) {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                    ctx.clearRect(x+(20*i), y+(20*j), 20, 20);
                
                
                
            }
        }		x -= 20;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (tetraJ[j][i] === 1) {
                
                ctx.fillRect(x+(20*i), y+(20*j), 20, 20);
                
                }
                
            }
        } 	}
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
