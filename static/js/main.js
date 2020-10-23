
function preloadArchi()
{
    let darkmode = getCookie('darkmode');
    if(darkmode && darkmode.length > 0)
    {
       switch(darkmode)
       {
           case "on":
                switchDarrMode('dark');
            break;
            case "off":
                switchDarrMode('main');
            break;

       }
    }
    else
    {
        let mode = getDarkModeInit();
        switch(mode)
        {
            case "dark":
                    setCookie('darkmode', 'off');
                break;
                case "main":
                case "auto":
                    setCookie('darkmode', 'on');
                break;

        }
    }
}

function toggleDarkMain()
{
    let darkmode = getCookie('darkmode');
    if(darkmode && darkmode.length > 0)
    {
       let mode = getDarkModeInit();

       switch(mode)
       {
           case "dark":
                setCookie('darkmode', 'off');
                switchDarrMode('main');
            break;
            case "main":
            case "auto":
                setCookie('darkmode', 'on');
                switchDarrMode('dark');
            break;

       }
    }
    else
    {
        //console.log('no existe');
        setCookie('darkmode', 'on');
    }
}

function getDarkModeInit()
{
   let mode = ""; 
   let likns =  Array.from(document.querySelectorAll('head > link'));
   if (likns)
   {
    likns.map(item => {
        if(item.media && item.media.includes('prefers-color-scheme'))
        {
            mode = item.media.split(":");
        }
       });
   }
   return (mode) ? (mode.length > 1) ? String(String(mode[1]).split(")")[0]).trim() : null : null;
}


function switchDarrMode(_mode)
{
   let likns =  Array.from(document.querySelectorAll('head > link'));
   if (likns)
   {
    likns.map(item => {
        if(item.media && item.media.includes('prefers-color-scheme'))
        {
            item.media = `(prefers-color-scheme: ${_mode})`;
        }
       });
   }
}


// ::: cookies :::
function setCookie(cname, cvalue) {
    let d = new Date();
    d.setTime(d.getTime() + 2 * 60 * 60 * 1000); //2 horas
    let expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cname}=${cvalue}; ${expires} ;samesite=strict ;path=/`;
  }
  
  function setCookieDays(cname, cvalue) {
    let d = new Date();
    d.setTime(d.getTime() + 72 * 60 * 60 * 1000); //72 horas (3 días)
    let expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cname}=${cvalue}; ${expires} ;samesite=strict ;path=/`;
  }
  
  
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }



  preloadArchi();