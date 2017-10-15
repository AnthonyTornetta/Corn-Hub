<!-- This day in history! -->
<!DOCTYPE html>
<html>
	<head>
		<?php global $title; $title = 'This Day in History'; require('headinfo.php'); ?>
		
        <script type="text/javascript" src="js/ticker.js"></script> <!-- Ticker -->
        <script type="text/javascript" src="js/today.js"></script> <!-- Today Info -->
	</head>

	<body>
		<?php include('holiday.php'); ?>
		
		<div class="wrapper">
			<?php require('nav.php'); ?>

			<div class="main">
				
                <h1 id="title">Corn Hub - This Day in History</h1>
				
                <!-- The one people care about -->
				<div class="blue-box">
                    <h3>Events</h3>
					<div id="ticker">
						<ul id="events">
							<li>Not Working Atm...</li>
							<noscript>
								<h2>This page will not work because you don't have javascript enabled.</h2>
							</noscript>
						</ul>
					</div>
                </div>
                
                <!-- Happy one -->
                <div class="blue-box">
                    <h3>Births</h3>
                    <div id="ticker">
						<ul id="births">
							<li>Not Working Atm...</li>
							<noscript>
								<h2>This page will not work because you don't have javascript enabled.</h2>
							</noscript>
						</ul>
					</div>
                </div>
                
                <!-- Depressing one -->
                <div class="blue-box">
                    <h3>Deaths</h3>
                    <div id="ticker">
						<ul id="deaths">
							<li>Not Working Atm...</li>
                            <noscript>
								<h2>This page will not work because you don't have javascript enabled.</h2>
							</noscript>
                        </ul>
					</div>
                </div>
			</div>
		</div>
	</body>
</html>