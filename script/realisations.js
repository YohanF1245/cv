//cross app variables
var currentApp = "";
var appList = ["crazyFood", "calculator","wordFinder"];
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
var calcKeys = document.querySelectorAll('input[type=button][name="calcKey"]');
console.log(calcKeys);
var ans = "0";
var mem = "0";
var result;
var operator = "";
var operatorSelected = false;
var isFloat = false;
// word find variables
	var wordToFind;
	var currentPlaceInGrid =0;
	var arrayGridWord = document.getElementsByClassName("letter");

//test
fetch("https://trouve-mot.fr/api/size/5")
    .then((response) => response.json())
    .then((words) => doSomething(Object.entries(words)[0][1]))

function doSomething(str){
	wordToFind = (Object.entries(str)[0][1]);
	arrayGridWord[currentPlaceInGrid].innerHTML = wordToFind.charAt(0);
	arrayGridWord[currentPlaceInGrid+1].innerHTML = wordToFind.charAt(1);
	arrayGridWord[currentPlaceInGrid+2].innerHTML = wordToFind.charAt(2);
	arrayGridWord[currentPlaceInGrid+3].innerHTML = wordToFind.charAt(3);
	arrayGridWord[currentPlaceInGrid+4].innerHTML = wordToFind.charAt(4);
}

addEventListener("keydown", (event) => {
	logKey(event.key);
	console.log(event.code);
	console.log();
	console.log($("#wordGrid :nth-child("+currentPlaceInGrid+")").text());
	arrayGridWord[currentPlaceInGrid].innerHTML = event.key;
	currentPlaceInGrid++;
});

function logKey(e) {
  console.log("keypressed: "+e);
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
}
function updateUI() {
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
