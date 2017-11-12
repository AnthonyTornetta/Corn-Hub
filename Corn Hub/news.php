<!-- Not fake news! (I think) -->
<!DOCTYPE html>
<html>
	<head>
		<?php global $title; $title = 'News'; require('headinfo.php'); ?>
		<link rel="stylesheet" media="all" href="styles/news.css">

		<script src="js/news.js"></script>
	</head>

	<body>
    <?php include('holiday.php'); ?>

		<div class="wrapper">
			<?php require('nav.php'); ?>
			<div class="main">
				<h1 id="title">Corn Hub - News</h1>
				<p>Less depressing news!</p>
				<div class="news" id="news">
					<h3>Loading News...</h3>
				</div>
			</div>
		</div>
	</body>
</html>
