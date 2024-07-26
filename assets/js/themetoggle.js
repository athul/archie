const itemTheme = "theme-storage";
const themeLight = "light";
const themeDark = "dark";

const iconAuto = `<i data-feather="refresh-cw"></i>`;
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

    if (mode === null) {
        modeToggle.innerHTML = iconAuto;
        modeStyle.media = "(prefers-color-scheme: dark)";
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

    feather.replace()
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
