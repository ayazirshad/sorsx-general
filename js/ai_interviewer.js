// FAQ Section logic handled at the bottom of the file

// Dropdown functionality for all dropdowns
document.querySelectorAll(".dropdown").forEach((dropdown) => {
  const toggle = dropdown.querySelector(".dropdown-toggle");

  if (toggle) {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      // Close other dropdowns
      document.querySelectorAll(".dropdown").forEach((d) => {
        if (d !== dropdown) d.classList.remove("open");
      });
      dropdown.classList.toggle("open");
    });
  }
});

// Close dropdowns when clicking outside
document.addEventListener("click", () => {
  document.querySelectorAll(".dropdown").forEach((dropdown) => {
    dropdown.classList.remove("open");
  });
});

const menuBtn = document.getElementById("menuToggleBtn");
const menu = document.getElementById("mobileMenu");
const icon = document.getElementById("menuIcon");

let menuOpen = false;

if (menuBtn && menu && icon) {
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("open");
    menuOpen = !menuOpen;
    icon.src = menuOpen ? "./assets/close.svg" : "./assets/menu.svg";
  });
}

const testimonials = document.querySelectorAll(".testimonial");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let current = 0;

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.remove("active");
    if (i === index) {
      t.classList.add("active");
    }
  });
}

if (testimonials.length > 0 && prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    current = (current - 1 + testimonials.length) % testimonials.length;
    showTestimonial(current);
  });

  nextBtn.addEventListener("click", () => {
    current = (current + 1) % testimonials.length;
    showTestimonial(current);
  });
}

// FAQ Accordion Functionality
document.querySelectorAll(".faq-item").forEach((item) => {
  const header = item.querySelector(".faq-header");
  const icon = item.querySelector(".faq-icon");

  header.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    // Close all other items
    document.querySelectorAll(".faq-item").forEach((i) => {
      i.classList.remove("active");
      const iIcon = i.querySelector(".faq-icon");
      if (iIcon) iIcon.src = "assets/plus_icon.png";
    });

    // Toggle current item
    if (!isActive) {
      item.classList.add("active");
      if (icon) icon.src = "assets/minus_icon.png";
    }
  });
});
