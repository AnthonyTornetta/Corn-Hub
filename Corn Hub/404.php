
<!DOCTYPE html>
<html>
	<head>
		<?php global $title; $title = '404 Error'; require($_SERVER['DOCUMENT_ROOT'].'/headinfo.php'); ?>
	</head>

	<body>

		<?php include($_SERVER['DOCUMENT_ROOT'].'/holiday.php') ?>

		<div class="wrapper">
			<?php include($_SERVER['DOCUMENT_ROOT'].'/nav.php'); ?>

			<div class="main">
				<h1>404 Err0r</h1>
				<h2>Don't worry! This just means you can't type! Click <a href="/">here</a> to get back to the main page.</h2>
				<p>Or if you clicked on a link and got this page, I can't type and you should let me know.</p>
			</div>
		</div>
	</body>
</html>
