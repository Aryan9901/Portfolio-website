/** @format */
window.addEventListener("load", (event) => {
	window.scrollTo(0, 0);
});

function valueSetters() {
	gsap.set("#nav a", { y: "100%", opacity: 0 });
	gsap.set("#home .parent .child", { y: "100%" });
	gsap.set("#home .row img", { opacity: 0 });

	document.querySelectorAll("#Visual>g").forEach(function (e) {
		var character = e.childNodes[1].childNodes[1];
		character.style.strokeDasharray = character.getTotalLength() + "px";
		character.style.strokeDashoffset = character.getTotalLength() + "px";
	});
}

function revealToSpan() {
	document.querySelectorAll(".reveal").forEach(function (elem) {
		// create two spans
		var parent = document.createElement("span");
		var child = document.createElement("span");

		// parents and child both sets their respective class
		parent.classList.add("parent");
		child.classList.add("child");

		// span parent span gets child and child gets elem
		child.innerHTML = elem.innerHTML;
		parent.appendChild(child);

		// elem replaces its value with parent span
		elem.innerHTML = "";
		elem.appendChild(parent);
	});
}
function loaderAnimation() {
	var tl = gsap.timeline();

	tl.from("#loader .child span", {
		x: 100,
		delay: 1,
		stagger: 0.2,
		duration: 1.4,
		ease: Power3.easeInOut,
	})
		.to("#loader .parent .child", {
			y: "-100%",
			duration: 1,
			ease: Circ.easeInOut,
		})
		.to("#loader", {
			height: 0,
			duration: 1.5,
			ease: Circ.easeInOut,
		})
		.to("#green", {
			height: "100%",
			top: 0,
			duration: 1,
			delay: -1,
			ease: Circ.easeInOut,
		})
		.to("#green", {
			height: 0,
			delay: -0.5,
			duration: 1,
			ease: Circ.easeInOut,
			onComplete: function () {
				animateHomepage();
			},
		});
}
function animateSvg() {
	gsap.to("#Visual>g>g>path,#Visual>g>g>polyline", {
		strokeDashoffset: 0,
		duration: 2,
		delay: -1,
		ease: Expo.easeInOut,
	});
}
function animateHomepage() {
	let tl = gsap.timeline();
	tl.to("#nav a", {
		y: 0,
		opacity: 1,
		stagger: 0.05,
		delay: -1,
		ease: Expo.easeInOut,
	})
		.to("#home .parent .child", {
			y: 0,
			duration: 1.5,
			stagger: 0.1,
			delay: -0.5,
			ease: Expo.easeInOut,
		})
		.to("#home .row img", {
			opacity: 1,
			ease: Expo.easeInOut,
			delay: -0,
			onComplete: function () {
				animateSvg();
			},
		});
}

function locoinitialise() {
	const locoScroll = new LocomotiveScroll({
		el: document.querySelector("#main"),
		smooth: true,
		multiplier: 0.8,
		lerp: 0.1,

		// for tablet smooth
		tablet: { smooth: true },

		// for mobile
		smartphone: { smooth: true },
	});
	locoScroll.on("scroll", ScrollTrigger.update);

	ScrollTrigger.scrollerProxy("#main", {
		scrollTop(value) {
			return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
		},
		getBoundingClientRect() {
			return {
				top: 0,
				left: 0,
				width: window.innerWidth,
				height: window.innerHeight,
			};
		},

		// follwoing line is not required to work pinning on touch screen

		pinType: document.querySelector("#main").style.transform ? "transform" : "fixed",
	});
	console.log(locoScroll);

	// --- RED PANEL ---
	gsap.from(".line-1", {
		scrollTrigger: {
			trigger: ".line-1",
			scroller: "#main",
			scrub: true,
			start: "top bottom",
			end: "top top",
		},
		scaleX: 0,
		transformOrigin: "left center",
		ease: "none",
	});

	// --- ORANGE PANEL ---
	gsap.from(".line-2", {
		scrollTrigger: {
			trigger: ".orange",
			scroller: "#main",
			scrub: true,
			pin: true,
			start: "top top",
			end: "+=100%",
		},
		scaleX: 0,
		transformOrigin: "left center",
		ease: "none",
	});

	// --- PURPLE/GREEN PANEL ---
	var tl = gsap.timeline({
		scrollTrigger: {
			trigger: ".purple",
			scroller: "#main",
			scrub: true,
			pin: true,
			start: "top top",
			end: "+=100%",
		},
	});

	tl.from(".purple p", { scale: 0.3, rotation: 45, autoAlpha: 0, ease: "power2" })
		.from(".line-3", { scaleX: 0, transformOrigin: "left center", ease: "none" }, 0)
		.to(".purple", { backgroundColor: "#28a92b" }, 0);

	var scrollContainer = document.querySelector("#main");
	ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
	ScrollTrigger.refresh();
}

function cardHoverEffect() {
	document.querySelectorAll(".containers").forEach(function (cnt) {
		var show;
		cnt.addEventListener("mousemove", function (dets) {
			document.querySelector("#cursor").children[dets.target.dataset.index].style.opacity = 1;
			show = dets.target;
			document.querySelector("#cursor").children[dets.target.dataset.index].style.left = `${dets.pageX}px`;
			document.querySelector("#cursor").children[dets.target.dataset.index].style.top = `${dets.pageY + 2100}px`;
			show.style.filter = "grayscale(1)";
			document.querySelector("#work").style.backgroundColor = "#" + dets.target.dataset.color;
		});
		cnt.addEventListener("mouseleave", function (dets) {
			document.querySelector("#cursor").children[show.dataset.index].style.opacity = 0;
			show.style.filter = "grayscale(0)";
			document.querySelector("#work").style.backgroundColor = "#f2f2f2";
		});
	});
}

// revealToSpan();
// valueSetters();
// loaderAnimation();
locoinitialise();
cardHoverEffect();

// ye pehle se comment the inko comment out mat karna
// animateSvg();
// animateHomepage();

// worksummary timeline

var t1 = gsap.timeline();
t1.to(
	"#worksummary h1",
	{
		fontSize: "27.4vw",
		ease: Expo.easeInOut.power2,
		// delay: 3,
		duration: 19,
		scrollTrigger: {
			trigger: "#worksummary  h1",
			scroller: "#main",
			scrub: 2,
			// markers: true,
			start: "top 70%",
			// pin: true,
			end: "top 0%",
		},
	},
	"h1"
).to(
	"#worksummary #preview .sumprev",
	{
		rotate: "0deg",
		ease: Expo.easeInOut.power2,
		delay: 3.4,
		duration: 2,
		scrollTrigger: {
			trigger: "#worksummary #preview .sumprev",
			scroller: "#main",
			scrub: 2,
			// markers: true,
			start: "top 10%",
			// pin: true,
			end: "top -10%",
		},
	},
	"h2"
);
// marque tool type animation

// footer

var tl = gsap.timeline({
	scrollTrigger: {
		scroller: "#main",
		trigger: "#footer #circle",
		// markers: true,
		start: "top 135%",
		scrub: 2,
		end: "top 117%",
		// pin: true,
	},
});
tl.to("#footer #circle", {
	top: "72%",
	ease: Expo.easeInOut.power2,
})
	.to(
		"#footer #circle",
		{
			top: "120%",
			ease: Expo.easeInOut.power2,
		},
		"hello"
	)

	.to(
		"#footxt h1,#footxt h2,#footxt h3",
		{
			rotateX: "0deg",
			opacity: 1,
			delay: -0.5,
			ease: Expo.easeInOut.power2,
		},
		"hello"
	);
// cursor change
function cursorchange() {
	// locoScroll.on("scroll", (instance) => {
	// 	let customCursor1 = document.querySelector("#circursor1");
	// 	let customCursor2 = document.querySelector("#circursor2");
	// 	let scrollxPx = instance.scroll.x + "px";
	// 	let scrollyPx = instance.scroll.y + "px";
	// 	customCursor1.style.left = scrollxPx;
	// 	customCursor1.style.top = scrollyPx;
	// 	customCursor2.style.left = scrollxPx;
	// 	customCursor2.style.top = scrollyPx;
	// });

	var cur1 = document.querySelector("#circursor1");
	var cur2 = document.querySelector("#circursor2");
	document.querySelector("#main").addEventListener("mousemove", function (dets) {
		cur1.style.top = dets.y + "px";
		cur2.style.top = dets.Y + "px";
		cur1.style.left = dets.pageX + "px";
		cur2.style.left = dets.pageX + "px";
	});
}
cursorchange();

// three card rotate
gsap.from("#imgrig", {
	rotate: "-10deg",
	// opacity: 0,
	ease: Expo.easeInOut.power2,
	scrollTrigger: {
		// markers: true,
		scroller: "#main",
		trigger: "#imgrig .imgcntnr",
		start: "top 40%",
		scrub: 3,
		end: "top -10%",
	},
});
// gsap.from("#imgrig .imgcntnr", {
// 	rotate: "0deg",
// 	// opacity: 0,
// 	ease: Expo.easeInOut.power2,
// 	scrollTrigger: {
// 		// markers: true,
// 		scroller: "body",
// 		trigger: "#imgrig .imgcntnr",
// 		start: "top 40%",
// 		scrub: 2,
// 		end: "top -10%",
// 	},
// });

function cursoranima() {
	document.querySelector("#home").addEventListener("mouseover", function (dets) {
		// console.log(dets.target.tagName == "SPAN");
		if (dets.target.tagName == "SPAN") {
			document.querySelector("#circursor1").style.transform = `translate(-50%, -50%) scale(7)`;
			document.querySelector("#circursor1").style.mixBlendMode = `darken`;
		}
	});
	document.querySelectorAll("SPAN").forEach(function (elem) {
		elem.addEventListener("mouseleave", function (dets) {
			document.querySelector("#circursor1").style.transform = `translate(-50%, -50%) scale(1)`;
			document.querySelector("#circursor1").style.mixBlendMode = `normal`;
		});
	});
}
cursoranima();

// textanimation
// splitting text into words

const text = document.querySelector(".txtanim");
text.innerHTML = text.textContent.replace(/\S/g, "<span>$&</span>");
// anime
// 	.timeline({
// 		loop: true,
// 	})
// 	.add({
// 		targets: '.txtanim span',
// 		translateY: [-600, 0],
// 		scale: [10, 1],
// 		opacity: [0, 1],
// 		easing: "easeOutExpo",
// 		duration: 1500,
// 		delay: AnimationEffect.stagger(100),
// 	});

var a1 = gsap.timeline({
	repeat: -1,
});
a1.from(".txtanim span", {
	translateX: "900px",
	scale: 8,
	marginRight: "20px",
	opacity: 0,
	ease: Expo.easeOut,
	// duration: 1,
	stagger: 0.3,
})
	.to(".txtanim span", {
		translateX: "0px",
		scale: 1,
		marginRight: "0px",
		opacity: 1,
		ease: Expo.easeOut,
		stagger: 0.3,
	})
	.to(".txtanim span", {
		translateX: "-900px",
		opacity: 0,
		scale: 8,
		ease: Expo.easeOut,
		stagger: 0.3,
	})
	.to(".txtanim span", {
		translateX: "0px",
		opacity: 1,
		scale: 1,
		ease: Expo.easeOut,
		stagger: 0.3,
	})
	.to(".txtanim span", {
		translateY: "200px",
		opacity: 0,
		scale: 10,
		ease: Expo.easeOut,
		stagger: 0.3,
	});

const cnt = document.querySelector("#projhead");
for (var i = 0; i < 100; i++) {
	const blocks = document.createElement("div");
	blocks.classList.add("block");
	cnt.appendChild(blocks);
}
function animateblocks() {
	anime({
		targets: ".block",
		translateX: function () {
			return anime.random(-700, 700);
		},
		translateY: function () {
			return anime.random(-500, 500);
		},
		scale: function () {
			return anime.random(1, 4);
		},
		easing: "linear",
		duration: 3000,
		delay: anime.stagger(10),
		complete: animateblocks,
	});
}
animateblocks();
