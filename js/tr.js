(function () {
  const LANG_KEY = "preferredLanguage";

  const TRfiles = [
    "ai_interviewer.html",
    "demo_page_1.html",
    "index.html",
    "midsize_businesses.html",
  ];

  function setLanguage(lang) {
    localStorage.setItem(LANG_KEY, lang);
    const currentPath = window.location.pathname;
    const isUnderTR = currentPath.includes("/tr/");
    const fileName = TRfiles.includes(currentPath.split("/").pop())
      ? currentPath.split("/").pop()
      : "index.html";
    console.log("filename", fileName);
    console.log("current path", currentPath);

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
    const hasTranslation = TRfiles.includes(fileName);

    if (preferredLang === "tr" && !isUnderTR && hasTranslation) {
      window.location.href = "tr/" + fileName;
    } else if (preferredLang === "en" && isUnderTR) {
      window.location.href = "../" + fileName;
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    // const langButtons = document.querySelectorAll(".choose-lang-button");
    const langEng = document.getElementById("lang-eng");
    const langTr = document.getElementById("lang-tr");
    const langEngM = document.getElementById("lang-eng-m");
    const langTrM = document.getElementById("lang-tr-m");

    langEng.addEventListener("click", () => {
      setLanguage("en");
    });

    langTr.addEventListener("click", () => {
      console.log("tr btn clicked");
      setLanguage("tr");
    });

    langEngM.addEventListener("click", () => {
      setLanguage("en");
    });

    langTrM.addEventListener("click", () => {
      setLanguage("tr");
    });

    // langButtons.forEach((btn) => {
    //   btn.addEventListener("click", () => {
    //     const langText = btn.textContent.trim().toLowerCase();
    //     if (langText === "türkçe") {
    //       setLanguage("tr");
    //     } else if (langText === "english") {
    //       setLanguage("en");
    //     }
    //   });
    // });
  });

  // Run immediately to handle auto-redirect on script load or refresh
  checkLanguage();
})();
