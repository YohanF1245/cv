var monsterRemaining = 10;
var currentMonster = 0;
var mobList = [
	"monster-bananas.png",
	"monster-cherry.png",
	"monster-coconut.png",
	"monster-strawberry.png",
	"monster-watermelon.png",
];
var playerCoins = 0;
var lifeTimeCoins = 0;
var currentLevel = 1;
var maxLevel = 1;
var monsterHealth = 1;
var levelStatus = [null, 10, 10, 10, 10, 10];
var radios = document.querySelectorAll('input[type=radio][name="radioLevel"]');


radios.forEach((radio) =>
	radio.addEventListener("change", () => refreshLevels(radio.value))
);
function refreshLevels(toLevel) {
	console.log(toLevel);
	monsterRemaining = levelStatus[toLevel];
	currentLevel = toLevel;
	document.getElementById("monsterRemainingText").innerHTML =
		"Monsters remaining: " + levelStatus[toLevel] + "/10";
	randMob();
}
randMob();
function showCranDarret() {
	document.getElementById("cranDarret").style.display = "flex";
	document.getElementById("priceCutter").innerHTML = "&#10003";
	document.getElementById("priceCutter").style.color = "green";
}
function showHokutoDeCuisine() {
	document.getElementById("hokutoDeCuisine").style.display = "flex";
	document.getElementById("priceCranDarret").innerHTML = "&#10003";
	document.getElementById("priceCranDarret").style.color = "green";
}
function showHachoir() {
	document.getElementById("hachoir").style.display = "flex";
	document.getElementById("priceHokuto").innerHTML = "&#10003";
	document.getElementById("priceHokuto").style.color = "green";
}
function showKatana() {
	document.getElementById("katana").style.display = "flex";
	document.getElementById("priceHachoir").innerHTML = "&#10003";
	document.getElementById("priceHachoir").style.color = "green";
}
function showChainsaw() {
	document.getElementById("chainsaw").style.display = "flex";
	document.getElementById("priceKatana").innerHTML = "&#10003";
	document.getElementById("priceKatana").style.color = "green";
}
function chaisawClick() {
	document.getElementById("priceChainsaw").innerHTML = "&#10003";
	document.getElementById("priceChainsaw ").style.color = "green";
}
function randMob() {
	var randomizeNum = Math.floor(Math.random() * 5);
	document.getElementById("mobPlaceHolder").src =
		"../img//crazy-food/" + mobList[randomizeNum];
	monsterHealth = 1 * Math.pow(currentLevel, 2); //flemme de penser a une fonction exponentielle équilibrée
	document.getElementById("healthNumber").innerHTML =
		monsterHealth + "/" + 1 * Math.pow(currentLevel, 2);
	document.getElementById("healthBar").style.background =
		"linear-gradient(100deg, rgba(77,164,13,1) 0%, rgba(95,255,0,0) 100%)";
}
function mobHit() {
	monsterHealth--;
	document.getElementById("healthNumber").innerHTML =
		monsterHealth + "/" + 1 * Math.pow(currentLevel, 2);
	var healthPercent = (monsterHealth / 10) * 100;
	document.getElementById("healthBar").style.background =
		"linear-gradient(100deg, rgba(77,164,13,1) 0%, rgba(95,255,0,0) " +
		healthPercent +
		"%)";
	if (monsterHealth === 0) {
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
	playerCoins++;
	document.getElementById("currentCoinsText").innerHTML = playerCoins;
	lifeTimeCoins++;
	if (monsterRemaining > 0) {
		monsterRemaining--;
		levelStatus[currentLevel] = monsterRemaining;
		document.getElementById("monsterRemainingText").innerHTML =
			"Monsters remaining: " + levelStatus[currentLevel] + "/10";
		console.log("mob remaining :" + monsterRemaining);
		if (monsterRemaining === 0) {
			unlockNextLevel();
		}
	}
	randMob();
}
function unlockNextLevel() {
	if (maxLevel < 6) {
		maxLevel++;
		var idLevel = "divRadio" + maxLevel;
		console.log("max level :" + idLevel);
		document.getElementById(idLevel).style.display = "flex";
	}
}
