// ===== Navbar Scroll Effect =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
	if (window.scrollY > 50) {
		navbar.classList.add("scrolled");
	} else {
		navbar.classList.remove("scrolled");
	}
});

// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
	navLinks.classList.toggle("active");
});

// Close mobile menu on link click
navLinks.querySelectorAll("a").forEach((link) => {
	link.addEventListener("click", () => {
		navLinks.classList.remove("active");
	});
});

// ===== Scroll Animations =====
const observerOptions = {
	root: null,
	rootMargin: "0px 0px -60px 0px",
	threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("visible");
		}
	});
}, observerOptions);

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
	observer.observe(el);
});

// ===== Counter Animation =====
const counterObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const counters = entry.target.querySelectorAll(".stat-number");
				counters.forEach((counter) => {
					const target = parseInt(counter.getAttribute("data-count"));
					let current = 0;
					const increment = target / 40;
					const timer = setInterval(() => {
						current += increment;
						if (current >= target) {
							counter.textContent = target;
							clearInterval(timer);
						} else {
							counter.textContent = Math.floor(current);
						}
					}, 40);
				});
				counterObserver.unobserve(entry.target);
			}
		});
	},
	{ threshold: 0.5 },
);

const statsSection = document.querySelector(".hero-stats");
if (statsSection) {
	counterObserver.observe(statsSection);
}

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
	let current = "";
	sections.forEach((section) => {
		const sectionTop = section.offsetTop - 100;
		if (window.scrollY >= sectionTop) {
			current = section.getAttribute("id");
		}
	});

	navLinks.querySelectorAll("a").forEach((link) => {
		link.classList.remove("active-link");
		if (link.getAttribute("href") === `#${current}`) {
			link.classList.add("active-link");
		}
	});
});
