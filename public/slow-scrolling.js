const container = document.querySelector("#scroll-container");

// Set body height to allow scrolling
function setBodyHeight() {
	document.body.style.height = `${container.scrollHeight}px`;
}

window.addEventListener("load", setBodyHeight);
window.addEventListener("resize", setBodyHeight);

// Scroll variables
let currentScroll = 0;
let targetScroll = 0;
let easeFactor = 0.08; // Lower = slower, Higher = faster

// Smooth scrolling function
function smoothScroll() {
	currentScroll += (targetScroll - currentScroll) * easeFactor;
	container.style.transform = `translateY(${-currentScroll}px)`;
	requestAnimationFrame(smoothScroll);
}

// Capture scroll input and control speed
window.addEventListener(
	"wheel",
	(event) => {
		targetScroll += event.deltaY * 0.8; // Adjust sensitivity
		targetScroll = Math.max(
			0,
			Math.min(targetScroll, container.scrollHeight - window.innerHeight)
		);
		event.preventDefault(); // Disable native scrolling
	},
	{ passive: false }
);

smoothScroll();
