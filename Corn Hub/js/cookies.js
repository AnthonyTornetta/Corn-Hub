var popout;
var menu;

function createCookie(cname, cvalue, exdays) 
{
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname)
{
	var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) 
	{
        var cookie = ca[i];
        while (cookie.charAt(0) == ' ') 
		{
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) 
		{
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

/*
function popoutDialog()
{
	if(getCookie('notify').length == 0)
	{
		createCookie("notify", "true", 14);
	}
	else
	{
		if(getCookie('notify') == 'false')
		{
			return;
		}			
	}
	popout = document.getElementById('popout');
	popout.innerHTML = 
	'<div id="po" class="popout">\
		<p>Choose whether this font stays!</p>\
		<p><a href="https://www.poll-maker.com/poll1073996x2aeD4E91-45" target="_blank" onclick="closePopoutDialog(true)">Click Here to vote!</a></p>\
		<p class="dontShow" style="cursor: pointer;" onclick="closePopoutDialog(true)">Don\'t show again.</p>\
		<p onclick="closePopoutDialog(true)" style="cursor: pointer">Close</p>\
	</div>';
}

function closePopoutDialog(forever)
{
	if(forever)
		createCookie('notify', 'false', 14);
	popout.innerHTML = "";
}
*/