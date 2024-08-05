function setTheme(mode) {
    localStorage.setItem("theme-storage", mode);
    var e = document.querySelector("#dark-mode-toggle > .feather > use")
    if (mode === "dark") {
        document.getElementById("darkModeStyle").disabled=false;
	e.href.baseVal = e.href.baseVal.replace(/#.*$/, "#sun")
    } else if (mode === "light") {
        document.getElementById("darkModeStyle").disabled=true;
	e.href.baseVal = e.href.baseVal.replace(/#.*$/, "#moon")
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
