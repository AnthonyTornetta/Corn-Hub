var accountManager =
{
  _username: undefined,
  _onLogins: [],
  _onLogouts: [],

  /**
   * Saves a given UUID as a cookie
   * @param  {string} uuid The UUID to save
   */
  saveUUID: function(uuid)
  {
    if(uuid)
      cookieUtilities.setCookie('uuid', uuid, 14); // You're UUID expires in 2 weeks, so 14 days
  },

  /**
   * Gets the UUID of the user
   * @return {string} The UUID if there is one present, or an empty string if there is none
   */
  getUUID: function()
  {
    return getCookie('uuid');
  },

  register: function(username, password, email)
  {
    return new Promise(function(resolve, reject)
    {
      $.post(`https://cornchipss.com/api/users?username=${username}&password=${password}&email=${email}&action=register`, function(data)
      {
        if(data.error)
          reject(data.error);
        else
        {
          accountManager.saveUUID(data.uuid);
          accountManager._onLogins.forEach(function(e)
          {
            e(data);
          });
          resolve(data);
        }
      }, 'json');
    });
  },

  login: function(unameOrUUID, password)
  {
    return new Promise(function (resolve, reject)
    {
      if(!password)
      {
        $.post(`https://cornchipss.com/api/users?uuid=${unameOrUUID}&action=login`, function(data)
        {
          if(data.error)
          {
            reject(data.error);
          }
          else
          {
            accountManager.saveUUID(data.uuid);
            accountManager._username = data.username;
            accountManager._onLogins.forEach(function(e)
            {
              e(data);
            });
            resolve(data);
          }
        }, 'json');
      }
      else
      {
        $.post(`https://cornchipss.com/api/users?username=${unameOrUUID}&password=${password}&action=login`, function(data)
        {
          if(data.error)
            reject(data.error);
          else
          {
            console.log(data);
            accountManager.saveUUID(data.uuid);
            accountManager._username = data.username;
            accountManager._onLogins.forEach(function(e)
            {
              e(data);
            });
            resolve(data);
          }
        }, 'json');
      }
    });
  },

  getUsername: function()
  {
    return accountManager._username;
  },

  onLogin: function(callback)
  {
    accountManager._onLogins.push(callback);
  },

  onLogout: function(callback)
  {
    accountManager._onLogouts.push(callback);
  },

  logout: function(callback)
  {
    cookieUtilities.deleteCookie('uuid');
    accountManager._onLogouts.forEach(function(e)
    {
      e();
    });
    accountManager._username = undefined;
  }
};

(function()
{
  let uuid = cookieUtilities.getCookie('uuid');
  if(uuid)
    accountManager.login(uuid);
})();
