<!DOCTYPE html>
<html>
	<head>
		<?php global $title; $title = 'Extra Useful Information'; require('/storage/ssd2/446/3229446/public_html/headinfo.php'); ?>
		<script type="text/javascript" src="/js/bitcoin.js"></script>
	</head>

	<body>
    <?php include('/storage/ssd2/446/3229446/public_html/holiday.php'); ?>

		<div class="wrapper">
			<?php require('nav.php'); ?>

      <!-- APIs: https://www.reddit.com/r/webdev/comments/3wrswc/what_are_some_fun_apis_to_play_with/ -->
			<div class="main">
				<h1 id="title">Extra Useful Information!</h1>
				<h3>Bitcoin Exchange Rate: <strong>$<span id="bitcoin"></span></strong></h3>
			</div>
		</div>
	</body>
</html>
