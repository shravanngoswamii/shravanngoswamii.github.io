const primaryColorScheme = ""; // "light" | "dark"

// Get theme data from local storage
const currentTheme = localStorage.getItem("theme");

// Define available themes
const themes = ["latte", "frappe", "macchiato", "mocha", "light", "dark"];

function getPreferTheme() {
  // return theme value in local storage if it is set
  if (currentTheme) return currentTheme;

  // return primary color scheme if it is set
  if (primaryColorScheme) return primaryColorScheme;

  // Default to auto
  return "auto";
}

let themeValue = getPreferTheme();

function setPreference(theme) {
  localStorage.setItem("theme", theme);
  reflectPreference(theme);
}

function reflectPreference(theme) {
  let themeToApply = theme;
  if (theme === "auto") {
    // Get the last applied auto theme
    const lastAutoTheme = sessionStorage.getItem("last-auto-theme");

    // Cycle through themes sequentially
    let nextIndex = 0;
    if (lastAutoTheme) {
      const currentIndex = themes.indexOf(lastAutoTheme);
      if (currentIndex !== -1) {
        nextIndex = (currentIndex + 1) % themes.length;
      }
    }

    themeToApply = themes[nextIndex];

    // Save the new theme as the last applied one
    sessionStorage.setItem("last-auto-theme", themeToApply);
  }

  document.firstElementChild.setAttribute("data-theme", themeToApply);

  document
    .querySelector("#theme-btn")
    ?.setAttribute("aria-label", themeToApply);
  document
    .querySelector("#theme-btn")
    ?.setAttribute(
      "title",
      `Current theme: ${themeToApply} (${theme === "auto" ? "Auto" : "Manual"})`,
    );

  // Get a reference to the body element
  const body = document.body;

  // Check if the body element exists before using getComputedStyle
  if (body) {
    // Get the computed styles for the body element
    const computedStyles = window.getComputedStyle(body);

    // Get the background color property
    const bgColor = computedStyles.backgroundColor;

    // Set the background color in <meta theme-color ... />
    document
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", bgColor);
  }
}

// set early so no page flashes / CSS is made aware
reflectPreference(themeValue);

window.onload = () => {
  function setThemeFeature() {
    // set on load so screen readers can get the latest value on the button
    reflectPreference(themeValue);

    // Toggle dropdown
    const themeBtn = document.querySelector("#theme-btn");
    const themeDropdown = document.querySelector("#theme-dropdown");

    themeBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      themeDropdown?.classList.toggle("hidden");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!themeBtn?.contains(e.target) && !themeDropdown?.contains(e.target)) {
        themeDropdown?.classList.add("hidden");
      }
    });

    // Handle theme selection
    document.querySelectorAll(".theme-option").forEach((option) => {
      option.addEventListener("click", () => {
        const selectedTheme = option.getAttribute("data-theme");
        themeValue = selectedTheme;
        setPreference(selectedTheme);
        themeDropdown?.classList.add("hidden");
      });
    });
  }

  setThemeFeature();

  // Runs on view transitions navigation
  document.addEventListener("astro:after-swap", setThemeFeature);
};

// sync with system changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    // Only update if user hasn't set a preference or is in auto mode
    if (
      !localStorage.getItem("theme") ||
      localStorage.getItem("theme") === "auto"
    ) {
      // In auto mode, we might want to respect system preference or keep random.
      // The requirement says "in Auto, theme should change on every reload".
      // It doesn't explicitly say it should respond to system changes, but usually "Auto" implies system sync.
      // However, the user specifically asked for "random on reload".
      // I will keep the random behavior for "auto" and only sync if no preference is set at all (which defaults to system).
      // But wait, getPreferTheme() returns system preference if no storage.
      // If storage is "auto", we use random.
      // If storage is null, we use system.
      // So if storage is null, we should update.
      if (!localStorage.getItem("theme")) {
        themeValue = isDark ? "dark" : "light";
        reflectPreference(themeValue);
      }
    }
  });
