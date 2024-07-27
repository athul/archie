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
    const iconAutoLight = document.getElementById("colour-scheme-auto-light");
    const iconAutoDark = document.getElementById("colour-scheme-auto-dark");
    const iconLight = document.getElementById("colour-scheme-light");
    const iconDark = document.getElementById("colour-scheme-dark");

    const isHidden = "is-hidden";
    switch (icon) {
        case "sunrise":
            iconAutoLight.classList.remove(isHidden);
            iconAutoDark.classList.add(isHidden);
            iconLight.classList.add(isHidden);
            iconDark.classList.add(isHidden);
            break;
        case "sunset":
            iconAutoLight.classList.add(isHidden);
            iconAutoDark.classList.remove(isHidden);
            iconLight.classList.add(isHidden);
            iconDark.classList.add(isHidden);
            break;
        case "sun":
            iconAutoLight.classList.add(isHidden);
            iconAutoDark.classList.add(isHidden);
            iconLight.classList.remove(isHidden);
            iconDark.classList.add(isHidden);
            break;
        case "moon":
            iconAutoLight.classList.add(isHidden);
            iconAutoDark.classList.add(isHidden);
            iconLight.classList.add(isHidden);
            iconDark.classList.remove(isHidden);
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
