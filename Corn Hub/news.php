<!-- Not fake news! (I think) -->
<!DOCTYPE html>
<html>
	<head>
		<?php global $title; $title = 'News'; require($_SERVER['DOCUMENT_ROOT'].'/headinfo.php'); ?>
		<link rel="stylesheet" media="all" href="/styles/news.css">

		<script src="/js/news.js"></script>
	</head>

	<body>
    <?php include($_SERVER['DOCUMENT_ROOT'].'/holiday.php'); ?>

		<div class="wrapper">
			<?php require($_SERVER['DOCUMENT_ROOT'].'/nav.php'); ?>
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
