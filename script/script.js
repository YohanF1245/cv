var touchStartX;
var touchStartY;
var touchEndX;
var touchEndY;
const scrollIds = [
	"firstBlock",
	"secondBlock",
	"thirdBlock",
	"fourthBlock",
	"fifthBlock",
];
let scrollPosition = 0;
function resetScrollpos() {
	scrollPosition = 0;
}
addEventListener("touchstart", (event) => {
	touchStartX = event.touches[0].clientX;
	touchStartY = event.touches[0].clientY;
});
addEventListener("touchend", (event) => {
	touchEndX = event.changedTouches[0].clientX;
	touchEndY = event.changedTouches[0].clientY;
	jumpLocation(touchStartY, touchEndY);
});
function jumpLocation(end, start) {
	if (start - end > 0) {
		if (scrollPosition < 5 && scrollPosition > 0) {
			scrollPosition--;
			window.location.href = "#" + scrollIds[scrollPosition];
		}
	} else if (start - end < 0) {
		console.log("scrolldown");
		if (scrollPosition >= 0 && scrollPosition < 4) {
			scrollPosition++;
			window.location.href = "#" + scrollIds[scrollPosition];
		}
	}
}
