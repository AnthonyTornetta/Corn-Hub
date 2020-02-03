
var lastRemoteNid = -1;

$(document).ready(function(){

  var ajaxLoaderImgObj = $('#edit-school-wrapper .loader'),
      schoolInputObj = $('#edit-school'),
      inputMaxLength = 30; // tied to S_SCHOOL_MAX_SOLR_SEARCH_TERM_LENGTH
  
  // Prevent users from entering more than inputMaxLength characters
  schoolInputObj.attr('maxlength', inputMaxLength);

  $(document).keyup(function(e){
    
    if(!schoolInputObj.is(':focus')){
      return true;
    }
    
    // If delete or backspace stroke change maxlength to the length of value or inputMaxLength
    if(e.which == 46 || e.which == 8){
      schoolInputObj.attr('maxlength', Math.max(inputMaxLength, schoolInputObj.val().length));
    }
  });

  var query = location.search;
  var queryMap = {};
  var lang = query.replace(/^\?/, '').split('&').forEach(function(param) {
    param = param.split('=');
    queryMap[param[0]] = param[1];
  });

  var searchURLQuery = queryMap['lang'] ? '?lang=' + queryMap['lang'] : '';

  schoolInputObj.autocomplete('/register/ajax/school' + searchURLQuery, {
    minChars: 3,
    width: 310,
    mustMatch: false,
    matchCase: true,
    scroll: false,
    delay: 600,
    max: 40,
    scroll: true,
    scrollHeight: 360,
    cacheLength: 1,
    resultsClass: schoolInputObj.hasClass('top-menu-school-select') ? 'ac_results fixed_results' : 'ac_results',
    beforeSend: function(){
      ajaxLoaderImgObj.show();
      $('#s-user-login-form .remote-auth-help').remove();
    },
    parse: function(data){
      rows = typeof data == 'object' ? data : [];
      var parsed = [];
      for (var i=0; i < rows.length; i++) {
        var row = rows[i];
        parsed[parsed.length] = {
          data: row,
          value: row.title,
          result: row.title
        };
      }
      ajaxLoaderImgObj.hide();
      return parsed;
    },
    formatItem: function(row, i, max) {
      // presence of domain prop indicates custom subdomain or domain alias
      var extra_class = row.domain ? ' remote-auth' : '';
      var location = row.location;
      var schoolName = Drupal.checkPlain(row.title);
      if(row.id == undefined){
        html = '<div class="school-name no-results">' + schoolName + '</div>';
      }
      else{
        html = '<div class="school-name'+extra_class+'">' + schoolName + ' <span class="small gray">' + row.id + '</span></div><div class="school-location small gray">' + Drupal.checkPlain(location) + '</div>';
      }
      return html;
    },
    formatMatch: function(row, i, max) {
            return row.title;
    }
  }).result(function(event,data,formatted){
    var editSchoolObj = $('#edit-school');
    if(data.id == undefined){
      // If nothing was found set max length back to default - inputMaxLength
      editSchoolObj.attr('maxlength', inputMaxLength);
      editSchoolObj.val('');
      editSchoolObj.blur();
      event.stopPropagation();
      editSchoolObj.focus();
      return false;
    }
    else{      
      // Otherwise set max length to the length of the selected title
      editSchoolObj.attr('maxlength', data.title.length);
      editSchoolObj.val(data.title);
    }
    // remote login message set, show message to user instructing them to use the remote login page
    if( data.login_url_suggest && !$('.sso-login').hasClass('active')){
      var remoteHelpObj = $('.remote-auth-help');
      if( lastRemoteNid != data.id || remoteHelpObj.length == 0){
        remoteHelpObj.remove();
        lastRemoteNid = data.id;
        var remoteMsgObj = $('<span class="remote-auth-help"></span>');
        remoteMsgObj.html(data.login_url_suggest);
        $('#s-user-login-form .forgot-password').before( remoteMsgObj );
        $(document).trigger('remote-auth-data',[true]);
      }
    } 
    else {
      $('#s-user-login-form .remote-auth-help').remove();
      $(document).trigger('remote-auth-data',[false]);
    }
    $("#edit-school-nid").val(data.id);
    $("#edit-school-nid").data('selectedRow', data);
    return false;
  });


  $('#s-user-login-forgot-form').each(function(){
    var form = $(this);
    var resetNameObj = $('#reset-name');

    if( resetNameObj.length == 1 )
      $('#edit-name',form).val(resetNameObj.val());

    $('.sso-warning .confirm').bind('click',function(){
      $('#edit-force-reset',form).val('1');
      form.submit();
    });

    setTimeout(function () {
      $(".message-text").focus();
    }, 0);
  });
});
