//generate alphabet inputs
const alphaB = "abcdefghijklmnopqrstuvwxyz";

var htmlLine = "";
var fullHtml = "";
for (var i = 0; i < 26; i++) {
	htmlLine =
		'<input type="button" name="keyboardWord" id="button' +
		alphaB.charAt(i).toUpperCase() +
	'" class="keyboardword css-button-3d--sky\" value="' +
		alphaB.charAt(i).toUpperCase() +
		'" onclick =\"keyPressedActions(\''+alphaB.charAt(i).toUpperCase()+'\')\">';
	fullHtml += htmlLine;
}
console.log(fullHtml);

//cross app variables
var currentApp = "";
var appList = ["crazyFood", "calculator", "wordFinder"];
appList.forEach((el) => {
	document.getElementById(el).style.display = "none";
});
//crazy food variables
var currentLevel = 1;
var monsterRemaining = 10;
var currentMonster = 0;
var weaponListGot = [1, 1, 1, 1, 1, 1];
var damage = 1;
const mobList = [
	"monster-bananas.png",
	"monster-cherry.png",
	"monster-coconut.png",
	"monster-strawberry.png",
	"monster-watermelon.png",
];
const weaponPricdIdArray = [
	"priceCutter",
	"priceCranDarret",
	"priceHokuto",
	"priceHachoir",
	"priceKatana",
	"priceChainsaw",
];
var playerCoins = 0;
var lifeTimeCoins = 0;
var lifeTimeKills = 0;
var maxLevel = 1;
var monsterHealth = 10;
var levelStatus = [null, 10, 10, 10, 10, 10];
var radios = document.querySelectorAll('input[type=radio][name="radioLevel"]');
//calculator variables
var calcKeys = document.querySelectorAll(
	'input[type=button][name="keyboardWord"]'
);
console.log(calcKeys);
var ans = "0";
var mem = "0";
var result;
var operator = "";
var operatorSelected = false;
var isFloat = false;
// word find variables
var wordToFind;
const enfOfLine = [4, 9, 14, 19, 24, 29];
var currentPlaceInGrid = 0;
var arrayGridWord = document.getElementsByClassName("letter");
var userInputWTF = ["", "", "", "", ""];
var currentKey = "";
var currentline = 0;
const regexAlpha = /^[a-z]+$/i;
const letterButtons = document.querySelectorAll(
	'input[type=button][name="calcKey"]'
);
//test

function getWord() {
	fetch("https://trouve-mot.fr/api/size/5")
		.then((response) => response.json())
		.then((words) => normalizeWord(Object.entries(words)[0][1]));
}
function normalizeWord(str) {
	wordToFind = Object.entries(str)[0][1];
	if (wordToFind.includes("œ")) {
		getWord();
	}
	wordToFind = wordToFind.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	wordToFind = wordToFind.toUpperCase();
	console.log(wordToFind);
	userInputWTF[0] = wordToFind.charAt(0);
	arrayGridWord[currentPlaceInGrid].innerHTML = wordToFind.charAt(0);
	currentPlaceInGrid++;
	// launchWordFind(wordToFind);
}
getWord();
function launchWordFind(str) {
	if (currentPlaceInGrid % 5 != 0) {
		arrayGridWord[currentPlaceInGrid].innerHTML = currentKey;
		userInputWTF[currentPlaceInGrid % 5] = currentKey;
		currentPlaceInGrid++;
	}
}
function wordWon() {
	var iterations = 0;
	var interval = setInterval(function () {
		const colors = ["red", "yellow", "green", "blue", "orange", "purple"];
		iterations++;
		arrayGridWord[currentline * 5 + (iterations % 5)].style.backgroundColor =
			colors[Math.floor(Math.random() * 5)];
		console.log(Math.floor(Math.random() * 5));
		if (iterations >= 50) {
			clearInterval(interval);
			document.getElementById("replayFind").style.display = "block";
			document.getElementById("youWon").style.display = "block";
		}
	}, 50);
}

function checkword() {
	var tempGoodGuess = 0;
	for (var i = 0; i < 5; i++) {
		if (wordToFind.charAt(i) === userInputWTF[i]) {
			arrayGridWord[currentline * 5 + i].style.backgroundColor = "red";
			tempGoodGuess++;
			console.log("temp good guess = " + tempGoodGuess);
		} else if (wordToFind.includes(userInputWTF[i])) {
			arrayGridWord[currentline * 5 + i].style.backgroundColor = "yellow";
			console.log("step i " + i + " letter checked : " + userInputWTF[i]);
		}
	}
	if (tempGoodGuess === 5) {
		window.alert("WIN !!");
		wordWon();
	} else {
		userInputWTF = ["", "", "", "", ""];
		if (currentline != 5) {
			currentline++;
			userInputWTF[0] = wordToFind.charAt(0);
			arrayGridWord[currentPlaceInGrid].innerHTML = wordToFind.charAt(0);
			currentPlaceInGrid++;
		} else {
			document.getElementById("replayFind").style.display = "block";
			document.getElementById("endWord").innerHTML = "Lost ! The words was " + wordToFind;
			document.getElementById("endWord").style.display = "block";
		}
	}
}
addEventListener("keydown", (event) => {
	if (currentApp === "wordFinder") {
		currentKey = event.key;
		keyPressedActions(currentKey);
	}
	console.log("*-------------------------------*");
	console.log("keypressed: " + event);
	console.log("user input string" + userInputWTF);
	console.log(event.code);
	console.log("event key : " + event.key);
	console.log("cureent place in grid : " + currentPlaceInGrid);
});
function keyPressedActions(keyPressed) {
	currentKey = keyPressed;
	console.log("type of current : " + typeof currentKey);
	if (regexAlpha.test(currentKey) === true && currentKey.length === 1) {
		currentKey = currentKey.toUpperCase();
		launchWordFind();
	} else if (currentKey === "Enter") {
		var canGoCheck = true;
		userInputWTF.forEach((element) => {
			if (element === "") {
				canGoCheck = false;
			}
		});
		if (canGoCheck === true) {
			checkword();
		}
	} else if (currentKey === "Backspace") {
		if (
			(currentline * 5 + ((currentPlaceInGrid % 5) + 1) > currentline * 5 ||
				enfOfLine.includes(currentline) === true) &&
			currentPlaceInGrid > currentline * 5 + 1
		) {
			currentPlaceInGrid--;
			userInputWTF[currentPlaceInGrid % 5] = "";
			arrayGridWord[currentPlaceInGrid].innerHTML = "";
		}
	}
}
function replayWord() {
	currentPlaceInGrid = 0;
	userInputWTF = ["", "", "", "", ""];
	currentKey = "";
	currentline = 0;
	document.getElementById("replayFind").style.display = "none";
	document.getElementById("youWon").style.display = "none";
	document.getElementById("endWord").style.display = "none";
	for (var i = 0; i < arrayGridWord.length; i++) {
		arrayGridWord[i].style.backgroundColor = "white";
		arrayGridWord[i].innerHTML = "";
	}
	getWord();
}
//calcultator code
document
	.querySelectorAll('input[type=button][name="calcKey"]')
	.forEach((occurence) => {
		var id = occurence.getAttribute("id");
		occurence.addEventListener("click", function () {
			calcKeyPressed(id);
		});
	});

function calcKeyPressed(key) {
	console.log("key pressed : " + key + " !");
	switch (key) {
		case "CLEAR":
			ans = "0";
			mem = "0";
			operatorSelected = false;
			isFloat = false;
			operator = "";

			break;
		case "RETURN":
			if (mem.length > 1) {
				if (mem.charAt(mem.length - 1) === ".") {
					isFloat = false;
				}
			}
			mem = mem.slice(0, -1);

			break;
		case "1":
			if (mem === "0" || mem.includes("=")) {
				mem = "1";
			} else {
				mem += "1";
			}
			break;
		case "2":
			if (mem === "0" || mem.includes("=")) {
				mem = "2";
			} else {
				mem += "2";
			}
			break;
		case "3":
			if (mem === "0" || mem.includes("=")) {
				mem = "3";
			} else {
				mem += "3";
			}
			break;
		case "4":
			if (mem === "0" || mem.includes("=")) {
				mem = "4";
			} else {
				mem += "4";
			}
			break;
		case "5":
			if (mem === "0" || mem.includes("=")) {
				mem = "5";
			} else {
				mem += "5";
			}
			break;
		case "6":
			if (mem === "0" || mem.includes("=")) {
				mem = "6";
			} else {
				mem += "6";
			}
			break;
		case "7":
			if (mem === "0" || mem.includes("=")) {
				mem = "7";
			} else {
				mem += "7";
			}
			break;
		case "8":
			if (mem === "0" || mem.includes("=")) {
				mem = "8";
			} else {
				mem += "8";
			}
			break;
		case "9":
			if (mem === "0" || mem.includes("=")) {
				mem = "9";
			} else {
				mem += "9";
			}
			break;
		case "0":
			if (mem === "0" || mem.includes("=")) {
				mem = "0";
			} else {
				mem += "0";
			}
			break;
		case ".":
			if (isFloat === false) {
				mem += ".";
				isFloat = true;
			}
			break;
		case "+":
			if (operatorSelected === false) {
				operatorSelected = true;
				if (mem.includes("=") === true) {
					mem = mem.slice(2);
				}
				ans = mem;
				mem = "0";
				operator = "+";
			}
			break;
		case "-":
			if (operatorSelected === false) {
				operatorSelected = true;
				if (mem.includes("=") === true) {
					mem = mem.slice(2);
				}
				ans = mem;
				mem = "0";
				operator = "-";
			}
			break;
		case "/":
			if (operatorSelected === false) {
				operatorSelected = true;
				if (mem.includes("=") === true) {
					mem = mem.slice(2);
				}
				ans = mem;
				mem = "0";
				operator = "/";
			}
			break;
		case "*":
			if (operatorSelected === false) {
				operatorSelected = true;
				if (mem.includes("=") === true) {
					mem = mem.slice(2);
				}
				ans = mem;
				mem = "0";
				operator = "*";
			}
			break;
		case "=":
			if (mem.includes("=")) {
				mem = mem.slice(2);
			}
			calc();
			operator = "";
			operatorSelected = false;
			break;
		default:
			break;
	}
	refreshCalcScreen();
	console.log("mem = " + mem);
	console.log("last char" + mem.charAt(mem.length - 1));
}
function calc() {
	console.log("calculate ...");
	var a;
	var b;
	if (ans.includes(".") === true) {
		var a = parseFloat(ans);
	} else {
		var a = parseInt(ans);
	}
	if (mem.includes(".") === true) {
		var b = parseFloat(mem);
	} else {
		var b = parseInt(mem);
	}
	switch (operator) {
		case "+":
			result = a + b;
			console.log("result " + result);
			mem = "= " + result;
			break;
		case "-":
			result = a - b;
			console.log("result " + result);
			mem = "= " + result;
			break;
		case "*":
			result = a * b;
			console.log("result " + result);
			mem = "= " + result;
			break;
		case "/":
			if (b != 0) {
				result = a / b;
				console.log("result " + result);
				mem = "= " + result;
			} else {
				window.alert("division by zero is not allowed");
			}

			break;
		default:
			break;
	}
	refreshCalcScreen();
}
function refreshCalcScreen() {
	document.getElementById("textCalcAns").innerHTML = "ans = " + ans;
	document.getElementById("operatorText").innerHTML = operator;
	document.getElementById("textCurrentInput").innerHTML = mem;
}
//crazy food code
radios.forEach((radio) =>
	radio.addEventListener("change", () => refreshLevels(radio.value))
);
function refreshLevels(toLevel) {
	monsterRemaining = levelStatus[parseInt(toLevel)];
	currentLevel = parseInt(toLevel);
	document.getElementById("monsterRemainingText").innerHTML =
		"Monsters remaining: " + monsterRemaining + "/10";
	randMob();
}
randMob();
function gotCutter() {
	if (playerCoins >= 5) {
		document.getElementById("priceCutter").innerHTML = "&#10003";
		document.getElementById("priceCutter").style.color = "green";
		weaponListGot[0] = 2;
		playerCoins -= 5;
		document.getElementById("currentCoinsText").innerHTML = playerCoins;
		recalculateDmg();
	}
}
function gotCranDarret() {
	if (playerCoins >= 20) {
		document.getElementById("priceCranDarret").innerHTML = "&#10003";
		document.getElementById("priceCranDarret").style.color = "green";
		weaponListGot[1] = 2;
		playerCoins -= 20;
		document.getElementById("currentCoinsText").innerHTML = playerCoins;
		recalculateDmg();
	}
}
function gotHokuto() {
	if (playerCoins >= 50) {
		weaponListGot[2] = 2;
		playerCoins -= 50;
		document.getElementById("currentCoinsText").innerHTML = playerCoins;
		document.getElementById("priceHokuto").innerHTML = "&#10003";
		document.getElementById("priceHokuto").style.color = "green";
		recalculateDmg();
	}
}
function gotHachoir() {
	if (playerCoins >= 100) {
		weaponListGot[3] = 2;
		playerCoins -= 100;
		document.getElementById("currentCoinsText").innerHTML = playerCoins;
		document.getElementById("priceHachoir").innerHTML = "&#10003";
		document.getElementById("priceHachoir").style.color = "green";
		recalculateDmg();
	}
}
function gotKatana() {
	if (playerCoins >= 200) {
		weaponListGot[4] = 2;
		playerCoins -= 200;
		document.getElementById("currentCoinsText").innerHTML = playerCoins;
		document.getElementById("priceKatana").innerHTML = "&#10003";
		document.getElementById("priceKatana").style.color = "green";
		recalculateDmg();
	}
}
function gotChainsaw() {
	if (playerCoins >= 500) {
		weaponListGot[5] = 2;
		playerCoins -= 500;
		document.getElementById("currentCoinsText").innerHTML = playerCoins;
		document.getElementById("priceChainsaw").innerHTML = "&#10003";
		document.getElementById("priceChainsaw ").style.color = "green";
		recalculateDmg();
	}
}
function randMob() {
	var randomizeNum = Math.floor(Math.random() * 5);
	document.getElementById("mobPlaceHolder").src =
		"../img//crazy-food/" + mobList[randomizeNum];
	monsterHealth = 10 * Math.pow(currentLevel, 2); //flemme de penser a une fonction exponentielle équilibrée
	document.getElementById("healthNumber").innerHTML =
		monsterHealth + "/" + 10 * Math.pow(currentLevel, 2);
	document.getElementById("healthBar").style.background =
		"linear-gradient(100deg, rgba(77,164,13,1) 0%, rgba(95,255,0,0) 100%)";
}
function mobHit() {
	monsterHealth = monsterHealth - damage;
	document.getElementById("healthNumber").innerHTML =
		monsterHealth + "/" + 10 * Math.pow(currentLevel, 2);
	var healthPercent = (monsterHealth / 10) * 100;
	document.getElementById("healthBar").style.background =
		"linear-gradient(100deg, rgba(77,164,13,1) 0%, rgba(95,255,0,0) " +
		healthPercent +
		"%)";
	if (monsterHealth <= 0) {
		mobDeath();
	}
	for (var i = 0; i < 3; i++) {
		document.getElementsByClassName("hitEffect")[i].style.display = "block";
	}
	setTimeout(() => {
		for (var i = 0; i < 3; i++) {
			document.getElementsByClassName("hitEffect")[i].style.display = "none";
		}
	}, 50);
	setTimeout(() => {
		document.getElementById("evilMagicRumble").checked = false;
	}, 200);
	document.getElementById("evilMagicRumble").checked = true;
}
function mobDeath() {
	playerCoins += currentLevel;
	document.getElementById("currentCoinsText").innerHTML = playerCoins;
	lifeTimeCoins += currentLevel;
	checkWeaponAvaible();
	lifeTimeKills++;
	document.getElementById("lifeTimeKills").innerHTML =
		"Life time kills:" + lifeTimeKills;
	document.getElementById("lifeTimeCoins").innerHTML =
		"Life time coins:" + lifeTimeCoins;
	if (monsterRemaining > 0) {
		monsterRemaining--;
		levelStatus[currentLevel] = monsterRemaining;
		document.getElementById("monsterRemainingText").innerHTML =
			"Monsters remaining: " + levelStatus[currentLevel] + "/10";
		if (monsterRemaining === 0) {
			unlockNextLevel();
			refreshLevels(maxLevel);
		}
	}
	randMob();
}
function unlockNextLevel() {
	if (maxLevel < 6) {
		maxLevel++;
		var idLevel = "labelLvl" + maxLevel;
		document.getElementById(idLevel).style.display = "flex";
		document.getElementById("radio" + maxLevel).checked = true;
	}
}
function save() {
	Cookies.set("playerCoins", playerCoins, { expires: 365 });
	Cookies.set("lifeTimeCoins", lifeTimeCoins, { expires: 365 });
	Cookies.set("currentLevel", currentLevel, { expires: 365 });
	Cookies.set("monsterRemaining", monsterRemaining, { expires: 365 });
	Cookies.set("currentMonster", currentMonster, { expires: 365 });
	Cookies.set("lifeTimeKills", lifeTimeKills, { expires: 365 });
	Cookies.set("levelStatus", levelStatus, { expires: 365 });
	Cookies.set("maxLevel", maxLevel, { expires: 365 });
	Cookies.set("weaponListGot", weaponListGot, { expires: 365 });
}
function load() {
	playerCoins = parseInt(Cookies.get("playerCoins"));
	lifeTimeCoins = parseInt(Cookies.get("lifeTimeCoins"));
	currentLevel = parseInt(Cookies.get("currentLevel"));
	monsterRemaining = parseInt(Cookies.get("monsterRemaining"));
	currentMonster = parseInt(Cookies.get("currentMonster"));
	lifeTimeKills = parseInt(Cookies.get("lifeTimeKills"));
	levelStatus = Cookies.get("levelStatus").split(",");
	maxLevel = parseInt(Cookies.get("maxLevel"));
	weaponListGot = Cookies.get("weaponListGot").split(",");
	recalculateDmg();
	updateUI();
	randMob();
}
function reset() {
	maxLevel = 1;
	playerCoins = 0;
	lifeTimeCoins = 0;
	currentLevel = 1;
	monsterRemaining = 10;
	currentMonster = 0;
	lifeTimeKills = 0;
	lifeTimeCoins = 0;
	levelStatus = [null, 10, 10, 10, 10, 10];
	weaponListGot = [1, 1, 1, 1, 1, 1];
	save();
	updateUI();
	resetWeaponFrame();
	recalculateDmg();
}
function updateUI() {
	document.getElementById("DamagePerClick").innerHTML =
		"Damage per click : " + damage;
	document.getElementById("currentCoinsText").innerHTML = playerCoins;
	document.getElementById("lifeTimeCoins").innerHTML =
		"Life time coins:" + lifeTimeCoins;
	document.getElementById("radio" + currentLevel).checked = true;
	document.getElementById("monsterRemainingText").innerHTML =
		"Monsters remaining: " + monsterRemaining + "/10";
	document.getElementById("lifeTimeKills").innerHTML =
		"Life time kills:" + lifeTimeKills;
	refreshLevelDisplay();
	checkWeaponAvaible();
}
function refreshLevelDisplay() {
	maxLevel = parseInt(maxLevel);
	for (var i = 1; i < maxLevel + 1; i++) {
		document.getElementById("labelLvl" + i).style.display = "flex";
	}
	for (var i = maxLevel + 1; i < 6; i++) {
		document.getElementById("labelLvl" + i).style.display = "none";
	}
}
function checkWeaponAvaible() {
	if (lifeTimeCoins >= 5) {
		document.getElementById("cranDarret").style.display = "flex";
	}
	if (lifeTimeCoins >= 20) {
		document.getElementById("hokutoDeCuisine").style.display = "flex";
	}
	if (lifeTimeCoins >= 50) {
		document.getElementById("hachoir").style.display = "flex";
	}
	if (lifeTimeCoins >= 100) {
		document.getElementById("katana").style.display = "flex";
	}
	if (lifeTimeCoins >= 200) {
		document.getElementById("chainsaw").style.display = "flex";
	}
}
function resetWeaponFrame() {
	document.getElementById("cranDarret").style.display = "none";
	document.getElementById("hokutoDeCuisine").style.display = "none";
	document.getElementById("hachoir").style.display = "none";
	document.getElementById("katana").style.display = "none";
	document.getElementById("chainsaw").style.display = "none";
	var tempWeaponList = document.getElementsByClassName("weaponP");
	tempWeaponList[0].innerHTML = "5";
	tempWeaponList[1].innerHTML = "20";
	tempWeaponList[2].innerHTML = "50";
	tempWeaponList[3].innerHTML = "100";
	tempWeaponList[4].innerHTML = "200";
	tempWeaponList[5].innerHTML = "500";
}
function recalculateDmg() {
	damage = 1;
	for (var i = 0; i < weaponListGot.length; i++) {
		damage = damage * weaponListGot[i];
		if (parseInt(weaponListGot[i]) === 2) {
			document.getElementById(weaponPricdIdArray[i]).innerHTML = "&#10003";
		}
	}
	document.getElementById("DamagePerClick").innerHTML =
		"Damage per click:" + damage;
}
function showApp(app) {
	if (currentApp.length > 0) {
		hideApp(currentApp);
	}
	// document.getElementById(app).classList.remove("modal");
	document.getElementById(app).classList.remove("out");
	document.getElementById(app).classList.add("in");
	document.getElementById(app).style.display = "";
	currentApp = app;
}
function hideApp(app) {
	document.getElementById(app).classList.remove("in");
	document.getElementById(app).classList.add("out");
	// document.getElementById(app).classList.add("modal");
	currentApp = "";
}
