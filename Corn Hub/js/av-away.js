// Gets rid of that annoying advert in the bottom right.
// This has a really dumb name so ad-blockers don't block this script from running
// Kinda ironic

$(document).ready(function()
{
  $('a').each(function()
  {
    if(this.title == 'Hosted on free web hosting 000webhost.com. Host your own website for FREE.')
    {
      // Sleep times are bad enough - you may not advertise on my site >:(
      this.innerHTML = "";
    }
  });
});
