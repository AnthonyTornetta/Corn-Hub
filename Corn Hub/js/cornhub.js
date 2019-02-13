(() =>
{
    if(!getCookie('delay'))
    {
        $.ajax({cache: false, url: 'https://www.clsd.k12.pa.us/cms/Tools/OnScreenAlerts/UserControls/OnScreenAlertDialogListWrapper.aspx', success: (data) =>
        {
            const returnedData = res.data;
            
            if(returnedData)
            {
                let dataStart = '<ul id="onscreenalertdialoglist" ><li id=1089 tabindex="0"><p>';
                let dataEnd = '</p>';

                let dataBegin = returnedData.substring(returnedData.indexOf(dataStart) + dataStart.length);
                let data = dataBegin.substring(0, dataBegin.indexOf(dataEnd));
                alert('(This is a test feature)\n' + data);

                setCookie('delay', 'true', 0.5);
            }
        }});
    }
});