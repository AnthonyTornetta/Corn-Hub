/* 
 * This loads the main image list based off of cookies
 * This allows for custom lists per person (as long as they don't clear their cookies)
 */
var container;
var cName = "img-list-content";
var daysExp = 999999;
var defaultVal = 
'\
<li id="main-list-img" title="School Home Page"><a href="http://journaling.clsd.net/hsfalcons/" target="_blank"><img src="images/falcon.png" alt="CLSD"></a></li>\
<li id="main-list-img" title="Skyward"><a href="https://skyward.clsd.net/scripts/wsisa.dll/WService=wsSky/seplog01.w" target="_blank"><img src="images/skyward.png" alt="Skyward"></a></li>\
<li id="main-list-img" title="Whitebox Learning - FCY4"><a href="http://www.whiteboxlearning.com/" target="_blank"><img src="images/whitebox.png" alt="Whitebox Learning"/></a></li>\
<li id="main-list-img" title="Turnitin"><a href="http://www.turnitin.com/" target="_blank"><img src="images/turnitin.jpg" alt="turnitin"></a></li>\
<li id="main-list-img" title="1:1 Student Hub"><a href="http://stud-sccm.hsonetone.clsd.net/CMApplicationCatalog/#/SoftwareLibrary/ApplistPageView.xaml" target="_blank"><img src="images/compooter.png" alt="1:1 Software"></a></li>\
<li id="main-list-img" title="HS Library"><a href="http://journaling.clsd.net/hs_library/" target="_blank"><img src="images/libWhite.png" alt="CCHS Library"></a></li>\
<li id="main-list-img" title="Mastery Connect"><a href="https://www.masteryconnect.com/" target="_blank"><img src="images/masteryB.jpg" alt="Mastery Connect Green"></a></li>\
<li id="main-list-img" title="Mastery Connect Bubble Sheet"><a href="https://app.masteryconnect.com/bubblesheet/" target="_blank"><img src="images/masteryS.png" alt="MasteryConnect"></a></li>\
<li id="main-list-img" title="Moodle"><a href="https://moodle.clsd.k12.pa.us/" target="_blank"><img src="images/moodle.png" alt="The moodle noodle"></a></li>\
<li id="main-list-img" title="USA Test Prep"><a href="http://www.usatestprep.com/member-login" target="_blank"><img src="images/usatp.png" alt="USA Test Prep"></a>\
<li id="main-list-img" title="One Drive"><a href="https://onedrive.live.com/about/en-us/" target="_blank"><img src="images/onedrive.jpg" alt="One Drive"></a></li>\
<li id="main-list-img" title="Office 365"><a href="https://login.microsoftonline.com/login.srf?wa=wsignin1.0&rpsnv=4&ct=1473620100&rver=6.7.6640.0&wp=MCMBI&wreply=https%3a%2f%2fportal.office.com%2flanding.aspx%3ftarget%3d%252fdefault.aspx&lc=1033&id=501392&msafed=0&client-request-id=7a651b3a-e515-4e06-b623-a5a85e0f24c1" target="_blank"><img src="images/Office.png" alt="Office 365"></a></li>\
<li id="main-list-img" title="Dropbox"><a href="https://www.dropbox.com/home" target="_blank"><img src="images/Dropbox.png" alt="Dropbox"></a></li>\
<li id="main-list-img" title="Google Drive"><a href="https://drive.google.com/drive/my-drive" target="_blank"><img src="images/gDrive.png" alt="Google Drive"></a></li>\
<li id="main-list-img" title="Wired"><a href="https://www.wired.com/" target="_blank"><img src="images/wired.jpg" alt="Wired"></a></li>\
<li id="main-list-img" title="Kahoot"><a href="https://kahoot.it/#/" target="_blank"><img src="images/kahoot.png" alt="Kahoot!"></a></li>\
<li id="main-list-img" title="Poety Out Loud"><a href="http://www.poetryoutloud.org/" target="_blank"><img src="images/pol.jpg" alt="Poetry Out Loud"></a></li>\
<li id="main-list-img" title="Quizlet"><a href="https://www.quizlet.com/" target="_blank"><img src="images/quizlet.png" alt="Quizlet"></a></li>\
<li id="main-list-img" title="Youtube"><a href="https://www.youtube.com/" target="_blank"><img src="images/youtube.png" alt="Youtube"></a></li>\
<li id="main-list-img" title="No Fear Shalespeare"><a href="http://nfs.sparknotes.com/romeojuliet/" target="_blank"><img src="images/nsf.jpg" alt="NFS"></a></li>\
<li id="main-list-img" title="GitHub"><a href="https://github.com/Cornchipss/Corn-Hub" target="_blank"><img src="images/github.png" alt="Github"></a></li>\
<li id="main-list-img" title="Ludum Dare"><a href="https://ldjam.com/" target="_blank"><img src="images/ludumdare.gif" alt="Ludum Dare"></a></li>\
<li id="main-list-img" title="Google"><a href="https://www.google.com/" target="_blank"><img src="images/google.jpg" alt="Google"></a></li>\
'

window.onload = function()
{
	container = document.getElementById("img-list");	
	// See cookies.js for getCookie(name)
	var stuffs = getCookie(cName);
	if(stuffs == '' || stuffs == null)
	{
		createCookie(cName, defaultVal, daysExp);
	}
	stuffs = getCookie(cName);
	
	ins(stuffs);
}

function ins(html)
{
	container.insertAdjacentHTML('beforeend', html);
}

function loadList()
{
	// Use the cookie js file to use that thing's stuffs
}