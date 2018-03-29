<!-- Good luck, young traveler
 -->

<!DOCTYPE html>
<html>
	<head>
		<?php global $title; $title = 'APUSH'; require($_SERVER['DOCUMENT_ROOT'].'/headinfo.php'); ?>

		<link rel="stylesheet" media="all" href="/styles/main-page.css" />
	</head>

	<body>
		<?php include($_SERVER['DOCUMENT_ROOT'].'/holiday.php') ?>

		<div class="wrapper">
			<?php include($_SERVER['DOCUMENT_ROOT'].'/nav.php'); ?>

			<div class="main">
        <h1 id="title">Corn Hub - APUSH</h1>
        <p style="cursor: pointer;" title="JUDICIAL REVIEW!" onclick="let item = document.getElementById('title'); item.innerHTML = 'Corn Hub - JUDICIAL REVIEW'; item.classList.add('rainbow-text');">Marbury vs Madison</p>
        <h2>Quizlets</h2>
        <p><a href="https://quizlet.com/243017626/period-4-review-flash-cards/" title="Thanks Rachel" target="_blank">Period 4 Quizlet</a></p>
				<p><a href="https://quizlet.com/256616875/period-6-review-flash-cards/" title="Thanks Rachel" target="_blank">Period 6 Quizlet</a></p>
				<h2>Unit Study Guides</h2>
				<p><a href="/apush/notesheets/unit4-study.docx" download title="Thanks Daniel">Unit 4 Study Guide</a></p>
				<p><a href="/apush/notesheets/unit6-study.docx" download title="Thanks Daniel">Unit 6 Study Guide</a></p>
				<h2>Risser Ramma Ball Summaries</h2>
				<p><a href="/apush/rrball/rrball-per4.docx" download title="Thanks Daniel">Risser Ramma Ball Period 4</a></p>
				<p><a href="/apush/rrball/rrball-per6.docx" download title="Thanks Troy">Risser Ramma Ball Period 6</a></p>
			</div>
		</div>
	</body>
</html>
