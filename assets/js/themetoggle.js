const queryPrefersDark = "(prefers-color-scheme: dark)";

const itemTheme = "theme-storage";
const themeLight = "light";
const themeDark = "dark";

const iconSunrise = `<svg class="feather"><use href="../feather-icons/feather-sprite.svg#sunrise"></use></svg>`;
const iconSunset = `<svg class="feather"><use href="../feather-icons/feather-sprite.svg#sunset"></use></svg>`;
const iconSun = `<svg class="feather"><use href="../feather-icons/feather-sprite.svg#sun"></use></svg>`;
const iconMoon = `<svg class="feather"><use href="../feather-icons/feather-sprite.svg#moon"></use></svg>`;

const idToggle = "colour-scheme-toggle";

/**
 * Set the theme based on the mode.
 * If mode is null, the theme depends on the device colour scheme.
 */
function setTheme(mode) {
    const modeToggle = document.getElementById(idToggle);
    const modeStyle = document.getElementById("dark-mode-style");

    const sunriseOrSunset = e => {
        e.matches ?
            modeToggle.innerHTML = iconSunset :
            modeToggle.innerHTML = iconSunrise;
    }

    window.matchMedia(queryPrefersDark).removeEventListener("change", sunriseOrSunset);

    if (mode === null) {
        modeToggle.innerHTML = window.matchMedia(queryPrefersDark).matches ?
            iconSunset :
            iconSunrise;
        window.matchMedia(queryPrefersDark).addEventListener("change", sunriseOrSunset);
        modeStyle.media = queryPrefersDark;
        modeStyle.disabled = false;
        localStorage.removeItem(itemTheme);
    } else {
        mode === themeDark ?
            modeToggle.innerHTML = iconMoon :
            modeToggle.innerHTML = iconSun;
        modeStyle.disabled = mode === themeLight;
        modeStyle.removeAttribute("media");
        localStorage.setItem(itemTheme, mode);
    }
}

/**
 * Toggle between auto, light and dark themes.
 */
function toggleTheme() {
    const currentTheme = localStorage.getItem(itemTheme);

    if (!currentTheme) {
        setTheme(themeLight);
    } else if (currentTheme === themeLight) {
        setTheme(themeDark);
    } else if (currentTheme === themeDark) {
        setTheme(null);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById(idToggle);
    toggleBtn.addEventListener("click", toggleTheme);

    const savedTheme = localStorage.getItem(itemTheme);
    setTheme(savedTheme);
});
