<!DOCTYPE html>
<html>
	<head>
		<?php global $title; $title = 'Space Simulator'; require('headinfo.php'); ?>
		<script src="js/spacesim.js"></script>
		
		<style>
			* /* Simple Reset */
			{
				margin: 0;
				padding: 0;
				border: none;
				overflow: hidden;
			}
		</style>
	</head>
	
	<body onload="init()">
		<canvas id="canvas"></canvas>
	</body>
</html>