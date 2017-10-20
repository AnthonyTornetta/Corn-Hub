<!-- Not fake news! (I think) -->
<!DOCTYPE html>
<html>
	<head>
		<?php global $title; $title = 'News'; require('headinfo.php'); ?>
	</head>

	<body>
        <?php include('holiday.php'); ?>
		
		<div class="wrapper">
			<?php require('nav.php'); ?>

			<div class="main">
                <h1 id="title">Corn Hub - News</h1>        
                <p>Less depressing news :D</p>
                <br>
                <div id="news"><h3>Loading News...</h3></div>
                <script src="js/events.js"></script>
			</div>
		</div>
	</body>
</html>