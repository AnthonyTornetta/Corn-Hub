/*
 * REQUIRES:
 *   login-reigister.js
 * SUMMARY:
 *   Handles the different views of the account page and the forms
 */

function openSection(event, sectionName)
{
  $('.tabbed-item').css('display', 'none');

  $('.tab-link').removeClass('active');

  $(`#${sectionName}`).css('display', 'block');
  $(event).addClass('active');
}

$(() =>
{
  $('#login-form').submit(async (e) =>
  {
    e.preventDefault();
    let emailInput = $('#email').val();
    let passwordInput = $('#password').val();

    await login(emailInput, passwordInput);

    $('#password').val('');
    console.log(getUser());
  });

  $('#register-form').submit(async (e) =>
  {
    e.preventDefault();
    let emailInput = $('#reg-email').val();
    let profileImageUrl = $('reg-url').val();
    let username = $('reg-username').val().trim();
    let passwordInput = $('#reg-password').val();

    let res = validateUsername(username);
    if(res === null)
    {
      alert(res);
    }
    else
    {
      await register(emailInput, passwordInput);
    }



    $('#password').val('');
    console.log(getUser());
  });
});

function validateUsername(un)
{
    let error;
    let illegalChars = /\W/; // allow letters, numbers, and underscores

    if (un == "")
    {
      error = "You didn't enter a username.\n";
      return false;
    }
    else if ((un.length < 5) || (un.length > 15))
    {
      error = "The username is the wrong length.\n";
  		return false;
    }
    else if (illegalChars.test(fld.value))
    {
      error = "The username contains illegal characters.\n";
  		return false;
    }
    else
      return null; // Null means no error
    return error;
}

async function register(email, pword)
{
  await firebase.auth().createUserWithEmailAndPassword(email, pword).then(() =>
  {
    login(email, pword);
  }).catch((error) =>
  {
    handleError(error);
  });
}

async function login(email, pword)
{
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() =>
  {
    firebase.auth().signInWithEmailAndPassword(email, pword).then(() =>
    {
      openSection('#account-info-btn', 'account-info');
    }).catch((error) =>
    {
      handleError(error);
    });
  }).catch((error) =>
  {
    console.log(error);
  });
}

function handleError(err)
{
  switch(err.code)
  {
    case 'auth/invalid-email':
      alert('Invalid email address.');
      break;
    case 'auth/wrong-password':
      alert('Incorrect username or password.');
      break;
    case 'auth/weak-password':
      alert('That is too weak a password.');
      break;
    case 'auth/user-not-found':
      alert('Unknown user.');
      break;
    default:
      alert(err.code);
  }
  console.log(err);
}
