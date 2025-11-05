document.addEventListener("DOMContentLoaded", () => {
  // Load header
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;

      // ✅ Run active link logic after header is inserted
      const currentPage = window.location.pathname.split("/").pop();
      const navLinks = document.querySelectorAll(".nav-links a");

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === currentPage) {
          link.classList.add("active");
        }
      });

      // Make index.html active for root path
      if (currentPage === "" || currentPage === "index.html") {
        const homeLink = document.querySelector(
          '.nav-links a[href="index.html"]'
        );
        if (homeLink) homeLink.classList.add("active");
      }

      //hamburger logic

      const hamburger = document.getElementById("hamburger");
      const hamIcon = document.getElementById("ham");
      const closeIcon = document.getElementById("close");
      const navMenu = document.getElementById("nav-menu");

      // Initially show only the hamburger icon
      closeIcon.style.display = "none";

      hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");

        // Toggle icons
        if (navMenu.classList.contains("active")) {
          hamIcon.style.display = "none";
          closeIcon.style.display = "inline-block";
        } else {
          hamIcon.style.display = "inline-block";
          closeIcon.style.display = "none";
        }
      });

      // Close menu when clicking a link
      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
          navMenu.classList.remove("active");
          hamIcon.style.display = "inline-block";
          closeIcon.style.display = "none";
        });
      });
    });

  // READ MORE (testimonials)
  const readMoreButtons = document.querySelectorAll(".read-more");
  readMoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");
      const card = document.getElementById(targetId);
      const shortText = card.querySelector(".testimonial-text.short");
      const fullText = card.querySelector(".testimonial-text.full");

      if (fullText.classList.contains("hidden")) {
        shortText.classList.add("hidden");
        fullText.classList.remove("hidden");
        button.textContent = "Read Less";
      } else {
        fullText.classList.add("hidden");
        shortText.classList.remove("hidden");
        button.textContent = "Read More";
      }
    });
  });

  // OUR TESTIMONIALS
  const readMoreBtns = document.querySelectorAll(".our-read-more");
  readMoreBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const text = btn.previousElementSibling;
      text.classList.toggle("expanded");
      btn.textContent = text.classList.contains("expanded")
        ? "Read Less"
        : "Read More";
    });
  });
});
