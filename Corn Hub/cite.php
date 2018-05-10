<?php
/*
sample:
Dean, Cornelia. "Executive on a Mission: Saving the Planet." The New York Times, 22 May 2007, www.nytimes.com/2007/05/22/science/earth/22ander.html?_r=0. Accessed 12 May 2016.
from https://www.nytimes.com/2007/05/22/science/earth/22ander.html?_r=0
 */
 ?>

<!DOCTYPE html>
<html>
	<head>
		<?php global $title; $title = ''; require($_SERVER['DOCUMENT_ROOT'].'/headinfo.php'); ?>

		<link rel="stylesheet" media="all" href="/styles/cornybib.css"/>
    <script src="/js/citation.js"></script>
	</head>

	<body>
		<?php include($_SERVER['DOCUMENT_ROOT'].'/holiday.php') ?>

		<div class="wrapper">
			<?php include($_SERVER['DOCUMENT_ROOT'].'/nav.php'); ?>

			<div class="main">
				<h1 id="title">Corn Hub - CornyBib</h1>
				<p>Because EasyBib doesn't work.</p>
        <form id="cite-url">
          <input type="text" autocomplete="url" id="url" placeholder="Site Url" />
          <input value="Cite" type="submit" />
        </form>

        <form id="cite-info" method="post" >
          <p>Article Title: <input type="text" autocomplete="text" id="article-title" placeholder="Article Title" /></p>
          <div id="contributors">
            <p>Authors</p>
            <p><input type="text" autocomplete="name" id="title" placeholder="First" /> <input type="text" autocomplete="name" id="middle" placeholder="Middle" /> <input type="text" autocomplete="name" id="last" placeholder="Last" /></p>
          </div>
          <p>Website Title: <input type="text" autocomplete="text" id="web-title" placeholder="Website Title" /></p>
          <p>Publisher: <input type="text" autocomplete="name" id="publisher" placeholder="Publisher" /></p>
          <p>URL: <input type="text" autocomplete="name" id="url" /></p>
          <p>
            Published: <input type="date" autocomplete="off" id="day" />
          </p>
          <input value="Cite" type="submit" />
        </form>

        <div id="cite-box">
          <h3>Citations</h3>
          <ul id="cite-list">

          </ul>
        </div>
			</div>
		</div>
	</body>
</html>
