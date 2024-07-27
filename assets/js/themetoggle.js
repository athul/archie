const queryPrefersDark = "(prefers-color-scheme: dark)";

const itemTheme = "theme-storage";
const themeLight = "light";
const themeDark = "dark";

const iconSunrise = `<i data-feather="sunrise"></i>`;
const iconSunset = `<i data-feather="sunset"></i>`;
const iconDark = `<i data-feather="moon"></i>`;
const iconLight = `<i data-feather="sun"></i>`;

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
        feather.replace();
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
            modeToggle.innerHTML = iconDark :
            modeToggle.innerHTML = iconLight;
        modeStyle.disabled = mode === themeLight;
        modeStyle.removeAttribute("media");
        localStorage.setItem(itemTheme, mode);
    }

    feather.replace();
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
