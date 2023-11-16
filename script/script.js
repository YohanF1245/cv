var touchStartX;
var touchStartY;
var touchEndX;
var touchEndY;
const scrollIds = ["firstBlock", "secondBlock", "thirdBlock", "fourthBlock", "fifthBlock"]
let scrollPosition = 0;

addEventListener("touchstart", (event) => {
	touchStartX = event.touches[0].clientX;
	touchStartY = event.touches[0].clientY;
	console.log("start x = " + touchStartX + " start y = " + touchStartY);
});
addEventListener("touchend", (event) => {
	touchEndX = event.changedTouches[0].clientX;
	touchEndY = event.changedTouches[0].clientY;
	console.log("end x = " + touchEndX + " end y = " + touchEndY);
	jumpLocation(touchStartY, touchEndY);
});
function jumpLocation(end, start) {
	if (start - end > 0) {
        console.log("scrolltop");
        console.log("scroll posiotion = " + scrollPosition);
        if (scrollPosition < 5 && scrollPosition>0) {
            scrollPosition--;
            window.location.href = "#" + scrollIds[scrollPosition];
            console.log("scroll posiotion = "+scrollPosition+" ,jump to #"+scrollIds[scrollPosition])
        }
		//scrolltop
	} else if (start - end < 0) {
        console.log("scrolldown");
        if (scrollPosition >= 0 && scrollPosition<4) {
            scrollPosition++;
        window.location.href = "#" + scrollIds[scrollPosition];
        console.log("scroll posiotion = "+scrollPosition+" ,jump to #"+scrollIds[scrollPosition])
        }
        
        
    }
}
