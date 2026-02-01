(function () {
  const LANG_KEY = "preferredLanguage";

  function setLanguage(lang) {
    localStorage.setItem(LANG_KEY, lang);
    const currentPath = window.location.pathname;
    const isUnderTR = currentPath.includes("/tr/");
    const fileName = currentPath.split("/").pop() || "index.html";

    if (lang === "tr") {
      if (!isUnderTR) {
        // Moving from root to tr
        window.location.href = "tr/" + fileName;
      }
    } else {
      if (isUnderTR) {
        // Moving from tr to root
        window.location.href = "../" + fileName;
      }
    }
  }

  function checkLanguage() {
    const preferredLang = localStorage.getItem(LANG_KEY);
    const currentPath = window.location.pathname;
    const isUnderTR = currentPath.includes("/tr/");
    const fileName = currentPath.split("/").pop() || "index.html";

    if (preferredLang === "tr" && !isUnderTR) {
      window.location.href = "tr/" + fileName;
    } else if (preferredLang === "en" && isUnderTR) {
      window.location.href = "../" + fileName;
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const langButtons = document.querySelectorAll(".choose-lang-button");
    langButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const langText = btn.textContent.trim().toLowerCase();
        if (langText === "türkçe") {
          setLanguage("tr");
        } else if (langText === "english") {
          setLanguage("en");
        }
      });
    });
  });

  // Run immediately to handle auto-redirect on script load or refresh
  checkLanguage();
})();
