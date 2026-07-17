/* =========================================================
   PORTFOLIO SCRIPT — Aradhya Maurya
   Handles: mobile menu toggle, smooth scrolling,
   active nav link highlighting, theme switching,
   scroll reveal animations, back-to-top button,
   and a simple contact form confirmation.
   ========================================================= */

// Run everything after the page has fully loaded
document.addEventListener("DOMContentLoaded", () => {

  /* ---------- 1. MOBILE MENU TOGGLE ---------- */
  const hamburger = document.getElementById("hamburger");
  const navbarMenu = document.getElementById("navbarMenu");

  hamburger.addEventListener("click", () => {
    // Toggle the "open" class which slides the menu in/out
    navbarMenu.classList.toggle("open");
    hamburger.classList.toggle("open");

    // Update aria-expanded for accessibility
    const isOpen = navbarMenu.classList.contains("open");
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // Close the mobile menu automatically when a link is clicked
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navbarMenu.classList.remove("open");
      hamburger.classList.remove("open");
    });
  });

  /* ---------- 2. ACTIVE NAV LINK ON SCROLL ---------- */
  // Highlights the nav link that matches the section currently in view
  const sections = document.querySelectorAll("section[id]");

  function highlightActiveLink() {
    let currentSectionId = "";
    const scrollPosition = window.scrollY + 120; // offset for navbar height

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active-link");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active-link");
      }
    });
  }

  window.addEventListener("scroll", highlightActiveLink);

  /* ---------- 3. THEME TOGGLE (DARK / LIGHT) ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle.querySelector("i");
  const body = document.body;

  // Load saved theme preference from previous visits, if any
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "light") {
    body.classList.add("light-theme");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-theme");
    const isLight = body.classList.contains("light-theme");

    // Swap the moon/sun icon to match the current theme
    themeIcon.classList.toggle("fa-moon", !isLight);
    themeIcon.classList.toggle("fa-sun", isLight);

    // Remember the choice for next time
    localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
  });

  /* ---------- 4. SCROLL REVEAL ANIMATIONS ---------- */
  // Elements with the "reveal" class fade/slide in when they enter the viewport
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          // Stop observing once revealed, so it doesn't re-trigger
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ---------- 5. BACK TO TOP BUTTON ---------- */
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- 6. CONTACT FORM (front-end only demo) ---------- */
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault(); // stop the page from reloading

    // In a real project, you would send this data to a server or
    // an email service (e.g. Formspree, EmailJS) here.
    formStatus.textContent = "Thanks! Your message has been noted. I will get back to you soon.";

    contactForm.reset();

    // Clear the confirmation message after a few seconds
    setTimeout(() => {
      formStatus.textContent = "";
    }, 5000);
  });

  /* ---------- 7. FOOTER YEAR ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
});
