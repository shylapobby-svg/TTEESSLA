/* =========================================================
   AWARDS PAGE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  /* -------------------------------------------------------
     Elements
     ------------------------------------------------------- */

  const menuButton = document.getElementById("menuButton");
  const menuClose = document.getElementById("menuClose");
  const sideMenu = document.getElementById("sideMenu");

  const accountButton = document.getElementById("accountButton");
  const accountMenu = document.getElementById("accountMenu");

  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  const acceptCookies = document.getElementById("acceptCookies");
  const cookieSettings = document.getElementById("cookieSettings");
  const cookieOverlay = document.getElementById("cookieOverlay");

  const backToTop = document.getElementById("backToTop");
  const refreshButton = document.getElementById("refreshButton");

  /* -------------------------------------------------------
     Side Menu
     ------------------------------------------------------- */

  function openSideMenu() {
    if (!sideMenu) return;

    sideMenu.classList.add("open");
    body.classList.add("menu-open");

    if (menuButton) {
      menuButton.setAttribute("aria-expanded", "true");
    }
  }

  function closeSideMenu() {
    if (!sideMenu) return;

    sideMenu.classList.remove("open");
    body.classList.remove("menu-open");

    if (menuButton) {
      menuButton.setAttribute("aria-expanded", "false");
    }
  }

  if (menuButton) {
    menuButton.addEventListener("click", () => {
      if (sideMenu && sideMenu.classList.contains("open")) {
        closeSideMenu();
      } else {
        openSideMenu();
      }
    });
  }

  if (menuClose) {
    menuClose.addEventListener("click", closeSideMenu);
  }

  /* -------------------------------------------------------
     Navigation Dropdowns
     ------------------------------------------------------- */

  const navigationDropdowns = document.querySelectorAll(
    ".navigation-dropdown"
  );

  navigationDropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", () => {
      const group = dropdown.closest(".navigation-group");

      if (!group) return;

      const wasOpen = group.classList.contains("open");

      document.querySelectorAll(".navigation-group").forEach((item) => {
        item.classList.remove("open");

        const button = item.querySelector(".navigation-dropdown");

        if (button) {
          button.setAttribute("aria-expanded", "false");
        }
      });

      if (!wasOpen) {
        group.classList.add("open");
        dropdown.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* -------------------------------------------------------
     Close Side Menu After Navigation
     ------------------------------------------------------- */

  const navigationLinks = document.querySelectorAll(
    ".side-menu a, .navigation-link"
  );

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("href");

      if (href && href !== "#" && !href.startsWith("javascript:")) {
        closeSideMenu();
      }
    });
  });

  /* -------------------------------------------------------
     Account Menu
     ------------------------------------------------------- */

  function openAccountMenu() {
    if (!accountMenu) return;

    accountMenu.classList.add("open");

    if (accountButton) {
      accountButton.setAttribute("aria-expanded", "true");
    }
  }

  function closeAccountMenu() {
    if (!accountMenu) return;

    accountMenu.classList.remove("open");

    if (accountButton) {
      accountButton.setAttribute("aria-expanded", "false");
    }
  }

  if (accountButton) {
    accountButton.addEventListener("click", (event) => {
      event.stopPropagation();

      if (accountMenu && accountMenu.classList.contains("open")) {
        closeAccountMenu();
      } else {
        openAccountMenu();
      }
    });
  }

  /* -------------------------------------------------------
     Theme
     ------------------------------------------------------- */

  function updateThemeIcon() {
    if (!themeIcon) return;

    const darkMode = body.classList.contains("dark-mode");

    themeIcon.textContent = darkMode ? "☀" : "☾";

    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        darkMode ? "Switch to light mode" : "Switch to dark mode"
      );

      themeToggle.setAttribute(
        "title",
        darkMode ? "Switch to light mode" : "Switch to dark mode"
      );
    }
  }

  function applySavedTheme() {
    const savedTheme = localStorage.getItem("teslaTheme");

    if (savedTheme === "dark") {
      body.classList.add("dark-mode");
    } else if (savedTheme === "light") {
      body.classList.remove("dark-mode");
    }

    updateThemeIcon();
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");

      const darkMode = body.classList.contains("dark-mode");

      localStorage.setItem(
        "teslaTheme",
        darkMode ? "dark" : "light"
      );

      updateThemeIcon();
    });
  }

  applySavedTheme();

  /* -------------------------------------------------------
     Cookie Notice
     ------------------------------------------------------- */

  function showCookieNotice() {
    if (!cookieOverlay) return;

    const accepted = localStorage.getItem("teslaCookiesAccepted");

    if (accepted === "true") {
      cookieOverlay.classList.remove("show");
      cookieOverlay.setAttribute("aria-hidden", "true");
    } else {
      cookieOverlay.classList.add("show");
      cookieOverlay.setAttribute("aria-hidden", "false");
    }
  }

  if (acceptCookies) {
    acceptCookies.addEventListener("click", () => {
      localStorage.setItem("teslaCookiesAccepted", "true");

      if (cookieOverlay) {
        cookieOverlay.classList.remove("show");
        cookieOverlay.setAttribute("aria-hidden", "true");
      }
    });
  }

  if (cookieSettings) {
    cookieSettings.addEventListener("click", () => {
      alert(
        "Cookie settings will be available when the website backend is connected."
      );
    });
  }

  showCookieNotice();

  /* -------------------------------------------------------
     Back To Top
     ------------------------------------------------------- */

  function handleScroll() {
    if (!backToTop) return;

    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", handleScroll, {
    passive: true
  });

  handleScroll();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* -------------------------------------------------------
     Refresh
     ------------------------------------------------------- */

  if (refreshButton) {
    refreshButton.addEventListener("click", () => {
      window.location.reload();
    });
  }

  /* -------------------------------------------------------
     Close Menus When Clicking Outside
     ------------------------------------------------------- */

  document.addEventListener("click", (event) => {
    if (
      accountMenu &&
      accountButton &&
      !accountMenu.contains(event.target) &&
      !accountButton.contains(event.target)
    ) {
      closeAccountMenu();
    }

    if (
      sideMenu &&
      menuButton &&
      !sideMenu.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      closeSideMenu();
    }
  });

  /* -------------------------------------------------------
     Escape Key
     ------------------------------------------------------- */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSideMenu();
      closeAccountMenu();

      document
        .querySelectorAll(".navigation-group")
        .forEach((group) => {
          group.classList.remove("open");

          const dropdown = group.querySelector(
            ".navigation-dropdown"
          );

          if (dropdown) {
            dropdown.setAttribute("aria-expanded", "false");
          }
        });
    }
  });

  /* -------------------------------------------------------
     Award Story Reveal
     ------------------------------------------------------- */

  const awardStories = document.querySelectorAll(".award-story");

  if ("IntersectionObserver" in window && awardStories.length) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("award-story-visible");
          observerInstance.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12
      }
    );

    awardStories.forEach((story) => {
      observer.observe(story);
    });
  } else {
    awardStories.forEach((story) => {
      story.classList.add("award-story-visible");
    });
  }

  /* -------------------------------------------------------
     Category Cards
     ------------------------------------------------------- */

  const categoryCards = document.querySelectorAll(
    ".award-category-card"
  );

  categoryCards.forEach((card) => {
    card.setAttribute("tabindex", "0");

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.classList.toggle("category-focused");
      }
    });
  });

  /* -------------------------------------------------------
     Placeholder Marking
     ------------------------------------------------------- */

  const placeholders = document.querySelectorAll(
    ".awards-page .image-placeholder"
  );

  placeholders.forEach((placeholder) => {
    placeholder.setAttribute("data-placeholder", "true");
  });

  /* -------------------------------------------------------
     Accessibility
     ------------------------------------------------------- */

  if (menuButton) {
    menuButton.setAttribute("aria-expanded", "false");
  }

  if (accountButton) {
    accountButton.setAttribute("aria-expanded", "false");
  }

  navigationDropdowns.forEach((dropdown) => {
    dropdown.setAttribute("aria-expanded", "false");
  });

  /* -------------------------------------------------------
     Page Ready State
     ------------------------------------------------------- */

  body.classList.add("awards-page-ready");

  console.log("Awards page initialized.");
});