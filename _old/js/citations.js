$(() =>
{
  $('#cite-url').submit(async (e) =>
  {
    e.preventDefault();


    let url = $('#url').val();
    if(url !== undefined)
    {
      $.ajax(url).done((res) =>
      {
        console.log(res);
      }).fail((data) =>
      {
        alert("That url isn't a working one.");
      });
    }
  });
});
