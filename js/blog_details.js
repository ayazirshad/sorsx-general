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

function renderBlogDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = parseInt(urlParams.get("id"));

  if (!blogId) {
    window.location.href = "sorsx_blog.html";
    return;
  }

  // blogData is available from sorsx_blog.js
  const blog = window.blogData.find((b) => b.id === blogId);

  if (!blog) {
    document.getElementById("blog-title").innerText = "Blog Post Not Found";
    return;
  }
  // Set Title and Meta
  document.title = `${blog.title} | SorsX Blog`;
  document.getElementById("blog-title").innerText = blog.title;
  document.getElementById("blog-category").innerText = blog.category;
  document.getElementById("blog-date").innerText = blog.date;
  document.getElementById("blog-featured-image").src = blog.image;
  document.getElementById("blog-featured-image").alt = blog.title;

  // Placeholder content for blog body
  document.getElementById("blog-content").innerHTML = `
    <p>${blog.description}</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <div class="blog-quote">
      "SorsX is redefining how teams discover and hire talent through the power of transparent AI."
    </div>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <h3>Key Takeaways</h3>
    <ul>
      <li>Enhanced AI transparency for better decision-making.</li>
      <li>Expanded global reach with multi-language support.</li>
      <li>Improved integration with existing HR tech stacks.</li>
    </ul>
    <p>Stay tuned for more updates as we continue to innovate and build the future of recruitment.</p>
  `;

  renderRelatedBlogs(blogId);
}

function renderRelatedBlogs(currentId) {
  const relatedGrid = document.getElementById("related-grid");
  if (!relatedGrid) return;

  const related = window.blogData.filter((b) => b.id !== currentId).slice(0, 3);

  relatedGrid.innerHTML = related
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
        <p class="blog-card-description">${blog.description}</p>
      </div>
    </article>
  `,
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", renderBlogDetail);
