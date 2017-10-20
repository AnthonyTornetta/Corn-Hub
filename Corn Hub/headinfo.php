<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-108028641-1"></script>
<script>
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());

	gtag('config', 'UA-108028641-1');
</script>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<?php
	if($title == '')
	{
		echo '<title>Corn Hub</title>';
	}
	else
	{
		echo '<title>Corn Hub : ' . $title . '</title>';
	}
?>

<link rel="stylesheet" media="all" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> <!-- Bootstrap -->
<link rel="stylesheet" media="all" href="styles/styles.css">
<link rel="icon" href="<?php echo $relDir ?>images/favicon.jpg">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>   <!-- Jquery -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> <!-- Bootstrap -->

<script type="text/javascript" src="<?php echo $relDir ?>js/cookies.js"></script> <!-- Cooookieeees (yum) -->
<script type="text/javascript" src="<?php echo $relDir ?>js/smooth.js"></script> <!-- Smooth Scroll -->
<script type="text/javascript" src="<?php echo $relDir ?>js/settings.js"></script> <!-- TODO: Settings stuffs -->