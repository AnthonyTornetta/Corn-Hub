// From https://static.checkiday.com/js/widget/min.js (with a few edits)

var dateFormat = function() {
    var a = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        b = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        c = /[^-+\dA-Z]/g,
        d = function(a, b) {
            a = String(a);
            b = b || 2;
            while (a.length < b) a = "0" + a;
            return a
        };
    return function(e, f, g) {
        var h = dateFormat;
        if (arguments.length == 1 && Object.prototype.toString.call(e) == "[object String]" && !/\d/.test(e)) {
            f = e;
            e = undefined
        }
        e = e ? new Date(e) : new Date;
        if (isNaN(e)) throw SyntaxError("invalid date");
        f = String(h.masks[f] || f || h.masks["default"]);
        if (f.slice(0, 4) == "UTC:") {
            f = f.slice(4);
            g = true
        }
        var i = g ? "getUTC" : "get",
            j = e[i + "Date"](),
            k = e[i + "Day"](),
            l = e[i + "Month"](),
            m = e[i + "FullYear"](),
            n = e[i + "Hours"](),
            o = e[i + "Minutes"](),
            p = e[i + "Seconds"](),
            q = e[i + "Milliseconds"](),
            r = g ? 0 : e.getTimezoneOffset(),
            s = {
                d: j,
                dd: d(j),
                ddd: h.i18n.dayNames[k],
                dddd: h.i18n.dayNames[k + 7],
                m: l + 1,
                mm: d(l + 1),
                mmm: h.i18n.monthNames[l],
                mmmm: h.i18n.monthNames[l + 12],
                yy: String(m).slice(2),
                yyyy: m,
                h: n % 12 || 12,
                hh: d(n % 12 || 12),
                H: n,
                HH: d(n),
                M: o,
                MM: d(o),
                s: p,
                ss: d(p),
                l: d(q, 3),
                L: d(q > 99 ? Math.round(q / 10) : q),
                t: n < 12 ? "a" : "p",
                tt: n < 12 ? "am" : "pm",
                T: n < 12 ? "A" : "P",
                TT: n < 12 ? "AM" : "PM",
                Z: g ? "UTC" : (String(e).match(b) || [""]).pop().replace(c, ""),
                o: (r > 0 ? "-" : "+") + d(Math.floor(Math.abs(r) / 60) * 100 + Math.abs(r) % 60, 4),
                S: ["th", "st", "nd", "rd"][j % 10 > 3 ? 0 : (j % 100 - j % 10 != 10) * j % 10]
            };
        return f.replace(a, function(a) {
            return a in s ? s[a] : a.slice(1, a.length - 1)
        })
    }
}();
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};
dateFormat.i18n = {
    dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};
if (typeof global_displayWidget == "undefined") {
    var global_displayWidget = 0
}
displayWidget = function() {
    var a = new Date;
    var b = dateFormat(a, "mm/dd/yyyy");
    var c = "<h3>Holidays for " + dateFormat(a, "mmmm dd, yyyy." + "</h3>"); 
    if (typeof width == "number" && typeof height == "number") {
        if (width < 280) width = 280;
        if (height < 100) height = 100
    } else {
        width = 300;
        height = 250
    }
    var d = new XMLHttpRequest;
    var e = null;
    var f = new Array;
    d.open("GET", "https://www.checkiday.com/api.php?d=" + b, true);
    d.onreadystatechange = function() {
        if (d.readyState === 4) {
            if (d.status === 200) {
                e = d.responseText;
                e = replaceAll(e, '["', "");
                e = replaceAll(e, '"]', "");
				e = replaceAll(e, '\\u00e9', "é");
                e = replaceAll(e, '\\"', '');
                f = e.split('","');
                e = "";
				e += '<div class="holiday-list">';
                for (var a = 0; a < f.length; a++)
				{
					e += '<div class="holiday">'+ f[a] + '</div>';
				}
				
				// Custom Days!
				
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth() + 1; //January is 0!
				
				if(dd == 11 && mm == 5)
				{
					e += '<div class="rainbow-text"><b>National Goodbye Bishop Day</b></div>';
				}
				
				// End Custom Days
				e += "</div>";
                document.getElementById("Checkiday_List").innerHTML = e;
                document.getElementById("Checkiday_Date").innerHTML = c
            }
        }
    };
    d.send(null);
    if (!global_displayWidget) {
        global_displayWidget = 1;
        var i = '<div id="Checkiday_Date" class="Checkiday"></div><div id="Checkiday_List" class="Checkiday"></div>';
        document.getElementById("Checkiday").innerHTML = i;
        if (document.getElementById("Checkiday_Footer") == null) {
            var j = document.createElement("div");
            j.innerHTML = '';
            document.getElementById("Checkiday").appendChild(j.firstChild)
        }
    }
};

function replaceAll(str, find, replace) 
{
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function escapeRegExp(str) 
{
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

setTimeout("displayWidget()", 1)