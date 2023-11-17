var monsterRemaining = 10;
var currentMonster =0;
var mobList = ["monster-bananas.png","monster-cherry.png","monster-coconut.png","monster-strawberry.png","monster-watermelon.png"]
var playerCoins=0;
var lifeTimeCoins=0;
var maxLevel=1;
var monsterHealth = 10;
randMob();
function showCranDarret(){
    document.getElementById("cranDarret").style.display ="flex";
    document.getElementById("priceCutter").innerHTML = "&#10003";
    document.getElementById("priceCutter").style.color ="green";
}
function showHokutoDeCuisine(){
    document.getElementById("hokutoDeCuisine").style.display ="flex";
    document.getElementById("priceCranDarret").innerHTML = "&#10003";
    document.getElementById("priceCranDarret").style.color ="green";
}
function showHachoir(){
    document.getElementById("hachoir").style.display ="flex";
    document.getElementById("priceHokuto").innerHTML = "&#10003";
    document.getElementById("priceHokuto").style.color ="green";
}
function showKatana(){
    document.getElementById("katana").style.display ="flex";
    document.getElementById("priceHachoir").innerHTML = "&#10003";
    document.getElementById("priceHachoir").style.color ="green";
}
function showChainsaw(){
    document.getElementById("chainsaw").style.display ="flex";
    document.getElementById("priceKatana").innerHTML = "&#10003";
    document.getElementById("priceKatana").style.color ="green";
}
function chaisawClick(){
    document.getElementById("priceChainsaw").innerHTML = "&#10003";
    document.getElementById("priceChainsaw ").style.color ="green";
}
function randMob(){
    var randomizeNum=Math.floor(Math.random()*5);
    document.getElementById("mobPlaceHolder").src = "../img//crazy-food/"+mobList[randomizeNum];
}
function mobHit(){
    monsterHealth--;
    document.getElementById("healthNumber").innerHTML=(monsterHealth+"/10");
    var healthPercent = monsterHealth/10*100;
    document.getElementById("healthBar").style.background = "linear-gradient(100deg, rgba(77,164,13,1) 0%, rgba(95,255,0,0) "+healthPercent+"%)";
    if(monsterHealth===0){
        mobDeath();
    }
}
function mobDeath(){
    playerCoins++;
    lifeTimeCoins++;
    if(monsterRemaing>0){
        monsterRemaining--;
        if(monsterRemaining===0){
        unlockNextLevel();
        }
    }
}
function unlockNextLevel(){
    if(maxLevel<6){
        maxLevel++;
        var idLevel = "divRadio"+maxLevel;
        document.getElementById(idLevel).style.display = block;
    }
}