// Functions in here are stolen from W3C.

var cookieUtilities = // Because apparently the name 'cookieUtils doesn't work in chrome >:(
{
  /**
   * Sets a cookie in the browser easily
   * @param {string} cname  The name of the cookie
   * @param {string} cvalue The value of the cookie
   * @param {number} exdays # of days until it expires
   */
  setCookie: function(cname, cvalue, exdays)
  {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  },

  /**
   * Gets the value of a cookie, or a blank string if it's not found
   * @param  {string} cname Name of the cookie
   * @return {string}       The value of the cookie
   */
  getCookie: function(cname)
  {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++)
    {
      var c = ca[i];
      while (c.charAt(0) == ' ')
        c = c.substring(1);
      if (c.indexOf(name) == 0)
        return c.substring(name.length, c.length);
    }
    return "";
  },

  deleteCookie: function(cname)
  {
    cookieUtilities.setCookie(cname, 'rip', 0);
  }
};
