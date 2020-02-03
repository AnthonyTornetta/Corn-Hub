$(document).ready(function(){

  var signUp = $('#sign-up-free, .top-nav.sign-up');
  signUp.attr('href', signUp.attr('data-href'));

  $('body').bind('click', function(e){
      var bodyTarget = $(e.target);

      disableBodyClose = false;
  });
	$('#edit-school-wrapper').hide();
	$('#edit-mail').blur(function(){
		var val = $(this).val();
		if(val.length == 0){
		  return;
		}
		if($('#edit-school-wrapper').is(':visible') && val.indexOf("@") != -1){
			$('#edit-school-wrapper').hide();
		}
		else if(!$('#edit-school-wrapper').is(':visible') && val.indexOf("@") == -1){
			$('#edit-school-wrapper').show();
      if(!Modernizr.input.placeholder) {
        $('#edit-school').placeHolder();
      }
		}
	});

  var schoolWrapper = $('#edit-school-wrapper');
  var mailWrapper = $('#edit-mail-wrapper');
  var passWrapper = $('#edit-pass-wrapper');
  var toggle = $('.sso-login');


  $(document).on('click touchstart', '.sso-login .sso-login-link', function(){
    var visibleLink = $('.clickable', toggle);
    var hiddenLink = $('.hidden', toggle);

    schoolWrapper.show();
    mailWrapper.hide();
    passWrapper.hide();
    toggle.addClass('active');
    visibleLink.removeClass('clickable').addClass('hidden');
    hiddenLink.addClass('clickable').removeClass('hidden');
    $("#edit-school").focus();
  });

  $(document).on('click', '.sso-login .regular-login-link', function(){
    var visibleLink = $('.clickable', toggle);
    var hiddenLink = $('.hidden', toggle);

    schoolWrapper.hide();
    mailWrapper.show();
    passWrapper.show();
    $('#edit-mail').blur(); // activate code to keep 'school' shown if email field contains a username
    toggle.removeClass('active');
    visibleLink.removeClass('clickable').addClass('hidden');
    hiddenLink.addClass('clickable').removeClass('hidden');
    $("#edit-mail").focus();
  });

  $(document).on("keypress", ".sso-login .sso-login-link, .sso-login .regular-login-link", function (ev){
    if (ev.which === 13) {
      $(ev.target).trigger("click");
    }
  });

  var loginForm = $('#s-user-login-form');

  // Login Form Behaviors Closure
  loginForm.each(function(){
    var message = "";
    var editSchoolInputObj = $('#edit-school'),
        editSchoolNIDInputObj = $('#edit-school-nid'),
        rememberSchoolCheckbox = $('#remember-school'),
        clearSchoolFieldObj = $('#clear-school-field'),
        schoolCookie = readCookie('school-cookie');

    loginForm.submit(function(e){

	    // disable submit
	    loginForm.find('#edit-submit').attr('disabled', 'disabled');

      // If selecting a school for SSO login, forward user to login URL
      if(!$('.sso-login').hasClass('active'))
        return;

      e.preventDefault();

      if ($("#edit-school-nid").val() == 0) {
        message = Drupal.t('The school you entered cannot be recognized.');

        renderErrorMessage(message);
        loginForm.find('#edit-submit').removeAttr('disabled');

        return;
      }

      var data = $("#edit-school-nid").data('selectedRow');
      // If there's a subdomain and login is not 'schoology', forward to the subdomain
      // (that way we can take advantage if they're already logged into the subdomain)
      if(data.domain && data.domain.length && data.login_type && data.login_type != 'schoology'){
        var extra = '';
        var match = window.location.search.match(/destination=(.+?)(?:&|$)/);
        var subLocation = 'http://' + data.domain;
        if(match){
          // Replay the original request to the custom domain.
          // If we don't replay the exact request, then things like 3-legged OAuth won't
          // work properly.
          extra = unescape(match[1]);
          subLocation +=  '/' + extra;
        }
        window.location = subLocation;
      }
      // If no subdomain but remote auth is still configured, forward to the remote auth URL.
      else if(data.login_type == 'remote_auth'){
        var queryString = '';
        if(window.location.search.length){
          if(data.login_url.match(/\?/)){
            queryString = window.location.search.replace('?','&')
          }
          else {
            queryString = window.location.search;
          }
        }
        window.location = (data.login_url + queryString);
      }
      else {
        message = Drupal.t('This school is not currently using SSO / Remote Authentication. Please sign in using an email address or username.');

        renderErrorMessage(message);
        loginForm.find('#edit-submit').removeAttr('disabled');
      }
    });

    setTimeout(function () {
      $(".message-text").focus();
    }, 0);

    // Create a cookie if they're logging into a school
    loginForm.bind('submit.cookie',function(){
      if( $('#remember-school').is(":checked") ) { // Did they check the option to remember the login?

        // Grab the school name and the school nid and create a cookie obj
        var schoolCookieObj = {
          'school'      : $('#edit-school').val(),
          'school_nid'  : $('#edit-school-nid').val()
        };

        // Create (or extend) cookies for these values for 30 days
        if(schoolCookieObj.school_nid) {
          createCookie('school-cookie',JSON.stringify(schoolCookieObj),30);
        }
      } else { // The option to remember their school isn't checked - so erase the cookies if they exist
        eraseCookie('school-cookie');
      }
    });

    // Populate School field if the cookie is set
    if(schoolCookie) {
      var schoolCookieObj = $.parseJSON(schoolCookie); // Turn the school cookie string into a JSON Object
      rememberSchoolCheckbox.attr('checked',true); // Set the Remember checkbox to checked
      editSchoolInputObj.val(schoolCookieObj.school); // Populate the edit school field with the name of the school from the cookie
      editSchoolNIDInputObj.val(schoolCookieObj.school_nid); // Populate the edit-school-nid field with the NID value from the cookie
    }

    // Make the clear fild button work
    clearSchoolFieldObj.bind('click',function(){
      editSchoolInputObj.val(''); // empty the edit school field
      editSchoolNIDInputObj.val(''); // empty the edit school nid field
      clearSchoolFieldObj.removeClass('visible'); // hide the clear field button
      editSchoolInputObj.trigger('blur').trigger('focus'); // focus the edit school field
      if($('.remote-auth-help').length) { // if the remote auth helper exists, remove it
        $('.remote-auth-help').remove();
      }
      $(document).trigger('remote-auth-data',[false]); // fire the event to enable the remember my school checkbox
    });

    // When the value of the edit school field changes, show / hide the clear field button
    editSchoolInputObj.bind('change keyup focus blur',function(){
      if(editSchoolInputObj.val() === '') { // if the edit school field value is empty, hide the clear field button
        clearSchoolFieldObj.removeClass('visible');
      } else { // if the edit school field value is not empty, show the clear field button
        clearSchoolFieldObj.addClass('visible');
      }
    }).trigger('change');

    // bind the event that listens for a remote authorization school and disables the remember my school feature for them
    $(document).bind('remote-auth-data',function(e,isRemoteAuth){
      if(isRemoteAuth) { // a school is considered "remote authorization"
        rememberSchoolCheckbox
          .attr({
            'checked': false, // uncheck the remember my school checkbox
            'disabled': true // disable the checkbox for remember my school
          })
          .addClass('disabled') // add in a hook for styling
          .closest('label')
            .addClass('disabled') // add in a hook for styling
            .closest('#remember-school-wrapper')
              .addClass('hidden'); // hide the checkbox
      } else { // a school is not considered "remote authorization"
        rememberSchoolCheckbox
          .attr('disabled',false) // enable the checkbox for remember my school
          .removeClass('disabled') // remove the styling hook class
          .closest('label')
            .removeClass('disabled') // remove the styling hook class
            .closest('#remember-school-wrapper')
              .removeClass('hidden'); // show the checkbox
      }
    });
  });

  // Quick script for external links
  $('a[rel*=external]').bind('click',function(e){
    e.preventDefault();
    $(this).attr('rel').search('popup') === -1 ? window.open(this.href) : newWindow = window.open(this.href,'','location=false,resizable=1,scrollbars=1,height=310,width=700');
  });

  // Contact Page Script
  $('body.contact').each(function(){
    var hash = window.location.hash;
    if(hash === "#enterprise") {
      $('body').addClass('enterprise');
    }
    $(window).bind('hashchange',function(){
      var hash = window.location.hash;
      if(hash === "#enterprise") {
        $('body').addClass('enterprise');
      } else {
        $('body').removeClass('enterprise');
      }
    });

    Modernizr.load({
      test: $('html').hasClass('ie7'),
      yep: ['/sites/all/misc/jquery.hashchange.min.js','/js/contact.hashchange.polyfill.js']
    });
  });

  // MS Task Pane App
  if(initMsTaskPaneApp()) {
    $('.ms-task-pane-view #supplementary .sign-in-header').text('Login to Schoology');
    var isHomePage = location.href.indexOf('/home.php') != -1;
    var isForgotPage = location.href.indexOf('/login/forgot') != -1;
    var back_btn;

    if(isHomePage) {
      var login_btn = $('<div id="ms-task-pane-login-btn"><input type="submit" class="btn-submit" value="Login"></div>');
      $('.ms-task-pane-view.home #branding #logo').after(login_btn);
      login_btn.click(function(){
        location.href = '/login';
      });
    }
    else {
      $('.ms-task-pane-view #supplementary #edit-submit').val('Login');
      back_btn = $('<div id="ms-task-pane-login-back-btn"><span class="h3">Back</span></div>');
      $('.ms-task-pane-view #branding').after(back_btn);
      back_btn.click(function(){
        location.href = '/login';
      });
    }

    if(back_btn && !isForgotPage) {
      back_btn.css('visibility', 'hidden');
    }
  }

});

// Modernizr Polyfills
Modernizr.load([{
  // Placeholder Polyfills
  test: Modernizr.input.placeholder,
  nope: ['/css/placeholder_polyfill.min.css','/js/rAF.js','/js/placeholder_polyfill.jquery.min.combo.js']
},{
  // JSON Polyfills
  test: window.JSON,
  nope: '/sites/all/misc/json2.js'
}]);


var disableBodyClose = false;

// Cookie Creation helper functions borrowed from Quirksmode
// http://www.quirksmode.org/js/cookies.html

// Cookie Helper Function - Create
function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

// Cookie Helper Function - Read
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

// Cookie Helper Function - Erase
function eraseCookie(name) {
  createCookie(name,"",-1);
}

/**
 * MS Task Pane App
 *  Attempt to call "window.external.GetContext()" in Javascript (or equivalent) -> if an exception is thrown, the
 *  requester is not the task pane app; if there is no exception, the requester is the task pane & the
 *  login screen should be formatted accordingly.
 *
 * @returns {boolean|*}
 */
function initMsTaskPaneApp() {
  var pageBody = isApp = false;
  try {
    if(readCookie('s_app_ms_task_pane_app') != 1) {
      window.external.GetContext();
    }
    pageBody = $('body:eq(0)');
    pageBody.addClass('ms-task-pane-view');
    isApp = true;
  }
  catch (e) {
    // this is not a ms task pane app
  }
  return isApp && pageBody && pageBody.hasClass('ms-task-pane-view');
}

function renderErrorMessage (message) {
  var errorMessage = $('<div class="messages error"><div class="messages-container"><table><tbody>' +
      '<tr><td><div class="messages-icon"></div></td>' +
      '<td><div tabindex="0" class="message-text">' + Drupal.t('Error') + ': ' + message + '</div></td>' +
      '</tr></tbody></table></div></div>');

  setTimeout(function(){
    errorMessage.fadeOut();
  }, 10000);

  $('#login-container .login-content').find('.messages.error').remove();
  $('#login-container .login-content').prepend(errorMessage);
  $("#edit-school").addClass('error');
  $(".message-text").focus();
}
