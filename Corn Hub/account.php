<!DOCTYPE html>
<html>
	<head>
		<?php global $title; $title = 'Accounts'; require($_SERVER['DOCUMENT_ROOT'].'/headinfo.php'); ?>
		<script src="/js/login-reigister.js"></script>
		<script src="/js/account-page.js"></script>
	</head>

	<body>
    <?php include($_SERVER['DOCUMENT_ROOT'].'/holiday.php'); ?>

		<div class="wrapper">
			<?php require($_SERVER['DOCUMENT_ROOT'].'/nav.php'); ?>

			<div class="main" class="tabbed-item">
				<h1 id="title">Corn Hub - Accounts</h1>
				<div class="tabs">
					<button class="tab-link" id="account-info-btn" onclick="openSection(event, 'account-info')">Account Information</button>
					<button class="tab-link" id="login-btn" onclick="openSection(event, 'login')">Login</button>
				  <button class="tab-link" id="register-btn" onclick="openSection(event, 'register')">Register</button>
				</div>
				<div style="display: block;" id="account-info" class="tabbed-item">
					<h3>This is not currently functional, but will soon be :)</h3>
				</div>
				<div style="display: none;" id="login" class="tabbed-item">
					<form id="login-form">
						<input autocomplete="email" type="text" id="email" placeholder="me@somewhere.com" />
						<input autocomplete="current-password" type="password" id="password" placeholder="password" />
						<input type="submit" value="Login" />
					</form>
				</div>
				<div style="display: none;" id="register" class="tabbed-item">
	        <form id="register-form" method="post">
	          <input autocomplete="email" type="text" id="reg-email" placeholder="me@somewhere.com" />
						<input autocomplete="username" type="text" id="reg-username" placeholder="username" />
						<input autocomplete="url" type="text" id="reg-img-url" placeholder="profile image url" />
	          <input autocomplete="new-password" type="password" id="reg-password" placeholder="password" />
						<input type="submit" value="Register" />
	        </form>
				</div>
			</div>
		</div>
	</body>
</html>
