<!DOCTYPE html>
<html>
	<head>
		<?php global $title; $title = 'Cool thing #1'; require('/storage/ssd2/446/3229446/public_html/headinfo.php'); ?>
		<style>
			*
			{
				padding: 0;
				margin: 0;
				border: none;
			}
			html, body
			{
				width: 100%;
				height: 100%;
				background-color: #000;
			}
			.canvas
			{
				height: 100%;
				width: 100%;
				overflow:hidden;
			}
		</style>
	</head>

	<body>
		<div class="canvas">
			<canvas id="main-canvas"></canvas>
		</div>
		<script type="text/javascript" src="/js/canvas.js"></script>
	</body>
</html>
