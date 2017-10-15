<!DOCTYPE html>
<html>
	<head>
		<?php global $title; $title = 'TODO List'; require('headinfo.php'); ?>
	</head>

	<body>
        <?php include('holiday.php'); ?>
		
		<div class="wrapper">
			<?php require('nav.php'); ?>
			
            <!-- APIs: https://www.reddit.com/r/webdev/comments/3wrswc/what_are_some_fun_apis_to_play_with/ -->
			<div class="main">
				<h1 id="title">TODO Stuff</h1>
                <p>These may change because the page is a WIP</p>
                <h3>Star Wars API?</h3> <!-- https://swapi.co/documentation -->
                <h3>Marvel Comics API?</h3> <!-- http://developer.marvel.com/ -->
                <h3>Pokemon API?</h3> <!-- http://pokeapi.co/ -->
			</div>
		</div>
	</body>
</html>