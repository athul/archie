const queryPrefersDark = "(prefers-color-scheme: dark)";

const itemTheme = "theme-storage";
const themeLight = "light";
const themeDark = "dark";

/**
 * Set the theme based on the mode.
 * If mode is null, the theme depends on the device colour scheme.
 */
function setTheme(mode) {
    const modeStyle = document.getElementById("dark-mode-style");

    const sunriseOrSunset = e => {
        e.matches ?
            showIcon("sunset") :
            showIcon("sunrise");
    }

    window.matchMedia(queryPrefersDark).removeEventListener("change", sunriseOrSunset);

    if (mode === null) {
        window.matchMedia(queryPrefersDark).matches ?
            showIcon("sunset") :
            showIcon("sunrise");
        window.matchMedia(queryPrefersDark).addEventListener("change", sunriseOrSunset);
        modeStyle.media = queryPrefersDark;
        modeStyle.disabled = false;
        localStorage.removeItem(itemTheme);
    } else {
        mode === themeDark ?
            showIcon("moon") :
            showIcon("sun");
        modeStyle.disabled = mode === themeLight;
        modeStyle.removeAttribute("media");
        localStorage.setItem(itemTheme, mode);
    }
}

function showIcon(icon) {
    const iconSunrise = document.getElementById("colour-scheme-toggle-sunrise");
    const iconSunset = document.getElementById("colour-scheme-toggle-sunset");
    const iconSun = document.getElementById("colour-scheme-toggle-sun");
    const iconMoon = document.getElementById("colour-scheme-toggle-moon");

    const isHidden = "is-hidden";
    switch (icon) {
        case "sunrise":
            iconSunrise.classList.remove(isHidden);
            iconSunset.classList.add(isHidden);
            iconSun.classList.add(isHidden);
            iconMoon.classList.add(isHidden);
            break;
        case "sunset":
            iconSunrise.classList.add(isHidden);
            iconSunset.classList.remove(isHidden);
            iconSun.classList.add(isHidden);
            iconMoon.classList.add(isHidden);
            break;
        case "sun":
            iconSunrise.classList.add(isHidden);
            iconSunset.classList.add(isHidden);
            iconSun.classList.remove(isHidden);
            iconMoon.classList.add(isHidden);
            break;
        case "moon":
            iconSunrise.classList.add(isHidden);
            iconSunset.classList.add(isHidden);
            iconSun.classList.add(isHidden);
            iconMoon.classList.remove(isHidden);
            break;
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
    const toggleBtn = document.getElementById("colour-scheme-toggle");
    toggleBtn.addEventListener("click", toggleTheme);

    const savedTheme = localStorage.getItem(itemTheme);
    setTheme(savedTheme);
});
