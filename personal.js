
// ===================================
// MESFIN'S PERSONAL PORTFOLIO
// ===================================

// 1. Mobile navigation menu
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the mobile menu when a link is clicked
navItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
    });
});

// 2. Animated introduction
const typingText = document.getElementById("typing-text");

const titles = [
    "Computer Science Student",
    "Aspiring Web Developer",
    "Software Development Learner",
    "Problem Solver"
];

let titleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeTitle() {
    const currentTitle = titles[titleIndex];

    if (deleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }

    typingText.textContent = currentTitle.substring(0, characterIndex);

    let delay = deleting ? 45 : 85;

    if (!deleting && characterIndex === currentTitle.length) {
        deleting = true;
        delay = 1300;
    } else if (deleting && characterIndex === 0) {
        deleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        delay = 350;
    }

    setTimeout(typeTitle, delay);
}

typeTitle();

// 3. Automatically update the copyright year
document.getElementById("year").textContent =
    new Date().getFullYear();

// 4. Highlight the current navigation section
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navItems.forEach((link) => {
                        const active =
                            link.getAttribute("href") ===
                            "#" + entry.target.id;

                        link.classList.toggle("active", active);

                        if (active) {
                            link.setAttribute("aria-current", "location");
                        } else {
                            link.removeAttribute("aria-current");
                        }
                    });
                }
            });
        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}

// 5. Back-to-top button
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 350);
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// 6. Contact form: prepare an email
// Replace this with your real email address before using the form.
const portfolioEmail = "";

const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
        return;
    }

    if (!portfolioEmail || !portfolioEmail.includes("@")) {
        formNote.textContent =
            "Please add your real email address in script.js first.";
        return;
    }

    const name = document.getElementById("name").value.trim();
    const senderEmail = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const subject = encodeURIComponent(
        "Portfolio message from " + name
    );

    const body = encodeURIComponent(
        "Name: " + name +
        "\nEmail: " + senderEmail +
        "\n\nMessage:\n" + message
    );

    const mailto =
        "mailto:" + portfolioEmail +
        "?subject=" + subject +
        "&body=" + body;

    formNote.textContent =
        "Opening your email application. Review the message and send it there.";

    window.location.href = mailto;
});
