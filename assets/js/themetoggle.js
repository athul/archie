function setTheme(mode) {
    localStorage.setItem("theme-storage", mode);
    if (mode === "dark") {
        document.getElementById("darkModeStyle").disabled=false;
        document.getElementById("dark-mode-toggle").innerHTML = "<i data-feather=\"sun\"></i>";
        feather.replace()
    } else if (mode === "light") {
        document.getElementById("darkModeStyle").disabled=true;
        document.getElementById("dark-mode-toggle").innerHTML = "<i data-feather=\"moon\"></i>";
        feather.replace()
    }
}

function toggleTheme() {
    if (localStorage.getItem("theme-storage") === "light") {
        setTheme("dark");
    } else if (localStorage.getItem("theme-storage") === "dark") {
        setTheme("light");
    }
}

var savedTheme = localStorage.getItem("theme-storage") || "light";
setTheme(savedTheme);
