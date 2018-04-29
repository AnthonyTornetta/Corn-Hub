/**
 * Gets rid of that annoying advert in the bottom right.
 * This has a really dumb name so ad-blockers don't block this script from running
 * Very ironic
 */

$(document).ready(function()
{
  $('img').each(function()
  {
    if(this.src == 'https://cdn.rawgit.com/000webhost/logo/e9bd13f7/footer-powered-by-000webhost-white2.png') // You tried
    {
      // Sleep times are bad enough - you may not advertise on my site >:(
      this.src = "";
      this.alt = "";
    }
  });
});
