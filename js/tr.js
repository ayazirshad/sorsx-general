(function () {
  const LANG_KEY = "preferredLanguage";

  const TRfiles = [
    "ai_interviewer.html",
    "demo_page_1.html",
    "demo_page_2.html",
    "home.html",
    "midsize_businesses.html",
    "sorsx_hire.html",
  ];

  function setLanguage(lang) {
    localStorage.setItem(LANG_KEY, lang);
    const currentPath = window.location.pathname;
    const isUnderTR = currentPath.includes("/tr/");
    let fileName = currentPath.split("/").pop() || "index.html";

    if (fileName === "index.html" || fileName === "") {
      fileName = "home.html";
    }

    // console.log("filename", fileName);
    // console.log("isUnderTR", isUnderTR);

    if (lang === "tr") {
      if (!isUnderTR) {
        if (!TRfiles.includes(fileName)) {
          fileName = "home.html";
        }
        window.location.href = "tr/" + fileName;
      }
    } else {
      if (isUnderTR) {
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
    if (!document.getElementById("header-placeholder")) {
      window.initLanguageSwitcher();
    }
  });

  // Run immediately to handle auto-redirect on script load or refresh
  checkLanguage();
})();
