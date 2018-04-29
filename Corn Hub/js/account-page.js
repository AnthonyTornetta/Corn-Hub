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
});

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
    firebase.auth().signInWithEmailAndPassword(email, pword).catch((error) =>
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
