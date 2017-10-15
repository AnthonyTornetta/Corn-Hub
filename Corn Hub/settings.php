<!-- Developed by Cornchip -->
<!--
    Developed while listening to: https://www.youtube.com/watch?v=fr6KVNt-1Ek
 -->
<!DOCTYPE html>
<html>
	<head>
		<?php global $title; $title = 'Settings'; require('headinfo.php'); ?>
	</head>

	<body>
        <?php include('holiday.php'); ?>
		
		<div class="wrapper">
			<?php require('nav.php'); ?>
			
			<div class="main">
				<h1 id="title">Corn Hub - Settings</h1>
				<p>Note: You must have cookies enabled</p>
				
				<h2>Notice: This is a WIP (Work in Progress) and does nothing atm</h2>
				
				<noscript>
					<h2>These settings won't work for you because javascript is not enabled in your browser ;(</h2>
				</noscript>
				
					<h3>Main page info:</h3>
				<p style="font-size:30px;">Bit coin info 
				<label class="switch">
				    <input type="checkbox" checked>
				    <span class="slider round"></span>
					
				</label>
				 Weather info</p>
			</div>
		</div>
	</body>
</html>