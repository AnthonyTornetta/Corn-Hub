(() =>
{
    if(!cookieUtilities.getCookie('delay'))
    {
        $.ajax(
        {
            cache: false, 
            url: 'https://cors-anywhere.herokuapp.com/https://www.clsd.k12.pa.us/cms/Tools/OnScreenAlerts/UserControls/OnScreenAlertDialogListWrapper.aspx', 
            success: (res) =>
            {
                if(res)
                {
                    let dataStart = '<ul id="onscreenalertdialoglist" ><li id=1089 tabindex="0"><p>';
                    let dataEnd = '</p>';

                    let dataBegin = res.substring(res.indexOf(dataStart) + dataStart.length);
                    let data = dataBegin.substring(0, dataBegin.indexOf(dataEnd));
                    alert('(This is a test feature)\n' + data);

                    cookieUtilities.setCookie('delay', 'true', 0.5);
                }
            }
        });
    }
})();