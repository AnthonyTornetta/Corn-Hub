<!DOCTYPE html>
<html>
	<head>
		<?php global $title; $title = 'Todo List'; require($_SERVER['DOCUMENT_ROOT'].'/headinfo.php'); ?>
    <script src="https://www.gstatic.com/firebasejs/4.13.0/firebase.js"></script>
    <script src="/js/todo-list.js"></script>
	</head>

	<body>
    <?php include($_SERVER['DOCUMENT_ROOT'].'/holiday.php'); ?>

		<div class="wrapper">
			<?php require($_SERVER['DOCUMENT_ROOT'].'/nav.php'); ?>

			<div class="main">
				<h1 id="title">Extra Useful Information!</h1>
				<h3>Bitcoin Exchange Rate: <strong>$<span id="bitcoin"></span></strong></h3>
			</div>
		</div>
	</body>
</html>
