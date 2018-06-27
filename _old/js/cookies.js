function createCookie(cname, cvalue, exdays)
{
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname)
{
	let name = cname + "=";
  let ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++)
	{
    let cookie = ca[i];
    while (cookie.charAt(0) == ' ')
		{
      cookie = cookie.substring(1);
    }

    if (cookie.indexOf(name) == 0)
      return cookie.substring(name.length, cookie.length);
  }
  return "";
}
