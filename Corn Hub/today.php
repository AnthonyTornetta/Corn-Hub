<!DOCTYPE html>
<html>
	<head>
		<?php global $title; $title = 'This Day in History'; require($_SERVER['DOCUMENT_ROOT'].'/headinfo.php'); ?>

	  <script type="text/javascript" src="/js/today.js"></script> <!-- Today Info -->

		<style>
		.col-3
		{
			display: grid;
		  grid-template-columns: repeat(3, 30%);
		  grid-auto-rows: minmax(200px, auto);
		  grid-column-gap: 3%;
		  grid-row-gap: 3%;
		}
		</style>
	</head>

	<body>
		<?php include($_SERVER['DOCUMENT_ROOT'].'/holiday.php'); ?>

		<div class="wrapper">
			<?php require($_SERVER['DOCUMENT_ROOT'].'/nav.php'); ?>

			<div class="main" id="main">
				<h1 id="title">Corn Hub - This Day in History</h1>
				<p>The more you know</p>
				<div class="col-3">
					<div>
						<div id="ticker">
							<ul id="events">
								<li>Loading Events...</li>
							</ul>
						</div>
					</div>

					<div>
						<div id="ticker">
							<ul id="births">
								<li>Loading Births...</li>
							</ul>
						</div>
					</div>

					<div>
						<div id="ticker">
							<ul id="deaths">
								<li>Loading Deaths...</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
