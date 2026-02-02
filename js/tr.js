(function () {
  const LANG_KEY = "preferredLanguage";

  const TRfiles = [
    "ai_interviewer.html",
    "demo_page_1.html",
    "demo_page_2.html",
    "home.html",
    "midsize_businesses.html",
  ];

  function setLanguage(lang) {
    localStorage.setItem(LANG_KEY, lang);
    const currentPath = window.location.pathname;
    const isUnderTR = currentPath.includes("/tr/");
    let fileName = currentPath.split("/").pop() || "index.html";

    // If we are on index.html or at the root, we map it to home.html for TR
    if (fileName === "index.html" || fileName === "") {
      fileName = "home.html";
    }

    if (lang === "tr") {
      if (!isUnderTR) {
        // Moving from root to tr
        window.location.href = "tr/" + fileName;
      }
    } else {
      if (isUnderTR) {
        // Moving from tr to root
        // Map home.html back to index.html for root
        if (fileName === "home.html") {
          fileName = "index.html";
        }
        window.location.href = "../" + fileName;
      }
    }
  }

  function checkLanguage() {
    const preferredLang = localStorage.getItem(LANG_KEY);
    const currentPath = window.location.pathname;
    const isUnderTR = currentPath.includes("/tr/");
    let fileName = currentPath.split("/").pop() || "index.html";

    if (preferredLang === "tr" && !isUnderTR) {
      if (fileName === "index.html" || fileName === "") {
        window.location.href = "tr/home.html";
      } else if (TRfiles.includes(fileName)) {
        window.location.href = "tr/" + fileName;
      }
    } else if (preferredLang === "en" && isUnderTR) {
      if (fileName === "home.html") {
        window.location.href = "../index.html";
      } else {
        window.location.href = "../" + fileName;
      }
    }
  }

  window.initLanguageSwitcher = function () {
    const langEng = document.getElementById("lang-eng");
    const langTr = document.getElementById("lang-tr");
    const langEngM = document.getElementById("lang-eng-m");
    const langTrM = document.getElementById("lang-tr-m");

    if (langEng) {
      langEng.addEventListener("click", () => {
        setLanguage("en");
      });
    }

    if (langTr) {
      langTr.addEventListener("click", () => {
        console.log("tr btn clicked");
        setLanguage("tr");
      });
    }

    if (langEngM) {
      langEngM.addEventListener("click", () => {
        setLanguage("en");
      });
    }

    if (langTrM) {
      langTrM.addEventListener("click", () => {
        setLanguage("tr");
      });
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    // Check if the placeholder exists. If not, the elements might already be in DOM.
    // If we use dynamic loading, this will be called manually.
    if (!document.getElementById("header-placeholder")) {
      window.initLanguageSwitcher();
    }
  });

  // Run immediately to handle auto-redirect on script load or refresh
  checkLanguage();
})();
