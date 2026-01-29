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
    icon.src = menuOpen ? "assets/index/close.svg" : "assets/index/menu.svg";
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
      if (iIcon) iIcon.src = "assets/index/plus_icon.png";
    });

    // Toggle current item
    if (!isActive) {
      item.classList.add("active");
      if (icon) icon.src = "assets/index/minus_icon.png";
    }
  });
});

// blogData is now loaded from blog_data.js

function renderBlogs() {
  const blogGrid = document.getElementById("blog-grid");
  if (!blogGrid) return;

  blogGrid.innerHTML = blogData
    .map(
      (blog) => `
    <article class="blog-card" onclick="location.href='blog_detail.html?id=${blog.id}'">
      <div class="blog-card-image-wrapper">
        <img src="${blog.image}" alt="${blog.title}" class="blog-card-image">
        <span class="blog-card-date-badge">${blog.date}</span>
      </div>
      <div class="blog-card-content">
        <span class="blog-card-category">${blog.category}</span>
        <h3 class="blog-card-title">${blog.title}</h3>
        
      </div>
    </article>
  `,
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", renderBlogs);

{
  /* <p class="blog-card-description">${blog.description}</p> */
}
