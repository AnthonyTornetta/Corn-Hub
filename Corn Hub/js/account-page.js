$(function()
{
  $('#form-register').on("submit", function(e)
  {
    e.preventDefault();

    let uname, pword, email;
    uname = document.getElementById('register-username').value;
    pword = document.getElementById('register-password').value;
    email = document.getElementById('register-email').value;

    if(pword !== document.getElementById('register-password2').value)
    {
      alert('Your two passwords didn\'t match!');
      return false;
    }
    if(!uname || !email || !pword)
      alert('You must fill out all the fields!');

    accountManager.register(uname, pword, email)
      .then(function()
      {
        document.getElementById('register-username').value = '';
        document.getElementById('register-password').value = '';
        document.getElementById('register-password2').value = '';
        document.getElementById('register-email').value = '';
      })
      .catch(function(err)
      {
        alert(err);
      });

    return false;
  });

  $('#form-login').on("submit", function(e)
  {
    e.preventDefault();

    let uname, pword;
    uname = document.getElementById('login-username').value;
    pword = document.getElementById('login-password').value;

    accountManager.login(uname, pword)
    .then(
      function()
      {
        document.getElementById('login-username').value = '';
        document.getElementById('login-password').value = '';
      })
    .catch(
      function(ex)
      {
        alert(ex);
      }
    );

    return false;
  });

  if(accountManager.getUsername()) // This will not happen unless they have the fastest internet ever invented by man, but you never know :)
    document.getElementById('username').innerHTML = 'Welcome back, ' + accountManager.getUsername() + '!';

  accountManager.onLogin(function(data)
  {
    document.getElementById('username').innerHTML = 'Welcome back, ' + data.username + '!';
  });

  accountManager.onLogout(function()
  {
    document.getElementById('username').innerHTML = 'Login or Register :D';
  });
});
