var listAnimStep = document.getElementsByClassName("animSteps");
var iteration = 0;
var interval = setInterval(function () {
    listAnimStep[iteration].style.display = "block";
   iteration++;
   if(iteration === 3){
    clearInterval(interval);
   }
}, 500);
function advanceOneStep(){
    
}