<!-- Most of this is stupid and useless -->
<!DOCTYPE html>
<html>
	<head>
		<?php global $title; $title = 'Stupid Stuff'; require($_SERVER['DOCUMENT_ROOT'].'/headinfo.php'); ?>
	</head>

	<body>
    <?php include($_SERVER['DOCUMENT_ROOT'].'/holiday.php'); ?>

		<div class="wrapper">
			<?php require($_SERVER['DOCUMENT_ROOT'].'/nav.php'); ?>

			<div class="main">
        <h1 id="title">Corn Hub - Stupid Things I Think Are Cool</h1>
        <p>Note: None of these programs will harm your computer. They just use some fancy graphical things to make really cool effects.</p>

				<h2><a href="https://www.dropbox.com/s/omlqr6x8uwsqotu/melter.exe?dl=1">Screen Melter</a></h2>
				<p>Melts your screen. Press the Escape key to stop it :).</p>

				<h2><a href="https://www.dropbox.com/s/i4gyq0allabc56z/pranked.exe?dl=1">Pranked</a></h2>
				<p>It's just a prank bro. Press Escape + P to stop it.</p>

				<h2><a href="/programs/rainbow.scr" download>Rainbow Screensaver</a></h2>
				<p>This creates a rainbow screen saver. You cannot set the screen saver on school computers, but you can do it to your home computer :).</p>
			</div>
		</div>
	</body>
</html>
