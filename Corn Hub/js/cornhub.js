var cornhub =
{
    utils: 
    {
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    alerts:
    {
        alertId: 0,
        activeAlerts: [],
        alert: (title, msg, callback) =>
        {
            if(!msg)
            {
                let alert = cornhub.alerts.activeAlerts[title]; // In this case the title was the id

                title = alert.title;
                msg = alert.message;
                callback = alert.callback;
            }

            cornhub.alerts.activeAlerts[cornhub.alerts.alertId] = {title: title, message: msg, callback: callback};

            document.getElementsByClassName('wrapper')[0].insertAdjacentHTML('beforeend', 
            `
            <div id="${cornhub.alerts.alertId}" class="alert-box">
                <div class="alert-content">
                    <h2>${title}</h2>
                    <p>${msg}</p>
                    <button onclick='cornhub.alerts.close(${cornhub.alerts.alertId});'>OK</button>
                </div>
            </div>
            `);

            return cornhub.alerts.alertId++;
        },
        close: (id, noCallback) =>
        {
            document.getElementById(id).outerHTML = '';

            if(!noCallback && cornhub.alerts.activeAlerts[id].callback)
                cornhub.alerts.activeAlerts[id].callback();
            
            cornhub.alerts.activeAlerts[id] = undefined;
        },
        miniAlert: (title, msg, callback) =>
        {
            cornhub.alerts.activeAlerts[cornhub.alerts.alertId] = {title: title, message: msg, callback: callback};

            document.getElementsByClassName('wrapper')[0].insertAdjacentHTML('beforeend', 
            `
            <div class="notify-icon">
                <button onclick="cornhub.alerts.alert(${cornhub.alerts.alertId})" class="text">!</button>
            </div>
            `);
            
            return cornhub.alerts.alertId++;
        }
    }
};

(() =>
{
    // Delays/Closings
    let cookieName = 'delay-' + cornhub.utils.days[new Date().getDay()];

    $.ajax(
    {
        cache: false, 
        url: 'https://cors-anywhere.herokuapp.com/https://www.clsd.k12.pa.us/cms/Tools/OnScreenAlerts/UserControls/OnScreenAlertDialogListWrapper.aspx', 
        success: (res) =>
        {
            if(res)
            {
                let dataStart = ' tabindex="0"><p>';
                let dataEnd = '</p>';

                let dataBegin = res.substring(res.indexOf(dataStart) + dataStart.length);
                let data = dataBegin.substring(0, dataBegin.indexOf(dataEnd));

                if(data && data.trim())
                {
                    if(!data.toLowerCase().includes('changes to the clsd calendar'))
                    {
                        let title = (data.includes('two-hour') || data.includes('2-hr')) ? '2 Hour Delay' : (data.includes('closed') || data.includes('closing') ? 'Closing' : 'Alert');
                        
                        if(cookieUtilities.getCookie(cookieName) !== data)
                        {
                            cornhub.alerts.alert(title, data, () => 
                            {
                                cookieUtilities.setCookie(cookieName, data, 20);

                                cornhub.alerts.miniAlert(title, data, () => cookieUtilities.setCookie(cookieName, data, 20));
                            });
                        }
                        else
                        {
                            cornhub.alerts.miniAlert(title, data, () => cookieUtilities.setCookie(cookieName, data, 20));
                        }
                    }
                }
            }
        }
    });
})();