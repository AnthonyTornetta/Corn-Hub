<!DOCTYPE html>
<html>
	<head>
		<?php global $title; $title = 'TODO List'; require('headinfo.php'); ?>
		<script type="text/javascript" src="js/bitcoin.js"></script>
	</head>

	<body>
        <?php include('holiday.php'); ?>

		<div class="wrapper">
			<?php require('nav.php'); ?>

            <!-- APIs: https://www.reddit.com/r/webdev/comments/3wrswc/what_are_some_fun_apis_to_play_with/ -->
			<div class="main">
				<h1 id="title">Extra Useful Information!</h1>
				<h3>Bitcoin Exchange Rate: <strong>$<span id="bitcoin"></span></strong></h3>
				<h3>TODO: Add more stuffs</h3>
			</div>
		</div>
	</body>
</html>
