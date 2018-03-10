<!DOCTYPE html>
<html>
  <head>
  	<?php global $title; $title = 'Weather'; require('/storage/ssd2/446/3229446/public_html/headinfo.php'); ?>

  	<script src="/js/weather.js"></script>
  	<link rel="stylesheet" media="all" href="/styles/weather.css">
  </head>
  <body>
    <?php require('/storage/ssd2/446/3229446/public_html/nav.php'); ?>
    <div class="main">
      <div id="weather-holder">
      <h1 id="title">Corn Hub - Weather</h1>
      <p>*Results may vary</p>
        <div id="current">
          <div class="col-3">
            <div style="text-align: left;">
              <div id="current-precipitation"></div>
              <div id="current-humidity"></div>
            </div>

            <div style="text-align: center;">
              <div id="current-temp">Loading Weather</div>
              <div id="current-temp-range"></div>
            </div>

            <div style="text-align: right;">
              <div id="current-wind"></div>
              <div id="current-location"></div>
            </div>
          </div>
        </div>
        <ul id="weather-forecast-list">
          <li class="description">
            <div class="time-desc" style="text-align: left;">Time</div>
            <div class="temperature-range-desc" style="text-align: left;">Range</div>
            <div class="humidity-desc" style="text-align: center;">Description</div>
            <div class="precipitation-desc" style="text-align: right;">Humidity</div>
            <div class="wind-speed-desc" style="text-align: right;">Wind Speed</div>
          </li>
        </ul>
      </div>
    </div>
  </body>
</html>
