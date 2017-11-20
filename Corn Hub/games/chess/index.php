<!DOCTYPE html>
<html>
	<head>
		<?php global $title; $title = 'Stupid Chess'; global $relDir; $relDir = '../../'; require('../../headinfo.php'); ?>

		<script src="js/ref.js"></script>
		<script src="js/pieces/piece.js"></script>
    <script src="js/pieces/pawn.js"></script>
    <script src="js/board.js"></script>
    <script src="js/chess.js"></script>

		<style>
		*
		{
			margin:0;
			padding:0;
		}

		html
		{
			overflow: hidden;
		}
		</style>

	</head>

	<body>
		<canvas id="canvas"></canvas>
	</body>
</html>
