<!DOCTYPE html>
<html>
	<head>
		<?php global $title; $title = 'Accounts'; require($_SERVER['DOCUMENT_ROOT'].'/headinfo.php'); ?>
		<script src="/js/login-reigister.js"></script>
		<script src="/js/account-page.js"></script>
	</head>

	<body onload="openSection('account-info')">
    <?php include($_SERVER['DOCUMENT_ROOT'].'/holiday.php'); ?>

		<div class="wrapper">
			<?php require($_SERVER['DOCUMENT_ROOT'].'/nav.php'); ?>

			<div class="main" class="tabbed-item">
				<h1 id="title">Corn Hub - Accounts</h1>
				<div class="tabs">
					<button class="tab-link" onclick="openSection(event, 'account-info')">Account Information</button>
					<button class="tab-link" onclick="openSection(event, 'login')">Login</button>
				  <button class="tab-link" onclick="openSection(event, 'register')">Register</button>
				</div>
				<div id="account-info" class="tabbed-item">
					ajsbhdjahsbdjabhdsjhasbdjasdbh
					<br />
					asldkasdkasdbnjkasndasd
				</div>
				<div id="login" class="tabbed-item">
					<form id="login-form">
						<input autocomplete="email" type="text" id="email" placeholder="me@somewhere.com" />
						<input autocomplete="current-password" type="password" id="password" placeholder="password" />
						<input type="submit" value="Login" />
					</form>
				</div>
				<div id="register" class="tabbed-item">
	        <form id="register-form">
	          <input autocomplete="email" type="text" id="reg-email" placeholder="me@somewhere.com" />
	          <input autocomplete="new-password" type="password" id="reg-password" placeholder="password" />
						<input type="submit" value="Register" />
	        </form>
				</div>
			</div>
		</div>
	</body>
</html>
