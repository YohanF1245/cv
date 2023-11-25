const listAnimStep = document.getElementsByClassName("animSteps");
var iteration = 0;
var interval = setInterval(function () {
    listAnimStep[iteration].style.display = "block";
    iteration++;
    if(iteration === 8){ clearInterval(interval);}
}, 500);