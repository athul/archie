
function preloadArchi()
{
    const theme = localStorage.getItem("darkmode");
    if(theme)
    {
        switchDarrMode(theme);
    }
    else
    {
        switchDarrMode(toggleDarkMain());
    }
}

function toggleDarkMain()
{
    const isDarkMode = localStorage.getItem("darkmode");
    if(isDarkMode && isDarkMode === 'dark'){
        switchDarrMode('main');
    } else {
        switchDarrMode('dark');
    }

}

function getDarkModeInit()
{
   let mode = ""; 
   let likns =  document.querySelector("link[media*='prefers-color-scheme']");
   if (likns)
   {
    mode = likns.media.split(":");
   }
   return (mode) ? (mode.length > 1) ? String(String(mode[1]).split(")")[0]).trim() : null : null;
}


function switchDarrMode(_mode)
{
   
   let likns =  document.querySelector("link[media*='prefers-color-scheme']");
   if (likns && _mode)
   {
       likns.media = `(prefers-color-scheme: ${_mode})`;
       localStorage.setItem('darkmode', _mode);
   }
}

preloadArchi();


window.onload = function() {
    document.getElementById('chkTest').addEventListener('change', () =>{
        toggleDarkMain();
    });
  };

