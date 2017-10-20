function loginShow()
{
	document.getElementById('loginBox').style.display='block';
}

function loginHide()
{
	document.getElementById('loginBox').style.display='none';
}

function registerToggle()
{
	if($('#loginBtn').text() == "Login")
	{
		$('#loginBtn').text("Register");
		$('#avatarInput').css("display: block");
	}
	else
	{
		$('#loginBtn').text("Login");
		$('#avatarInput').css("display: hidden");
	}
}

window.onload = function()
{
	// Get the modal
	var modal = document.getElementById('loginBox');

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) 
	{
		if (event.target == modal) 
		{
			loginHide();
		}
	}
}