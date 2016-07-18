<?php
$path = '..';
$dev = isset($_GET['dev']) && $_GET['dev'] == 1 ? true : false;

require($path.'/config.php');

require($path.'/lng-'.$languages['active'].'/translations.php');

include ($path.'/includes/head__html.php');

$head__title = '404';

include ($path.'/includes/head__head.php');
?>

<body id="top">

	<div class="grid grid--center p404">
		<header><h1 class="article__title">404</h1></header>
		<div class="grid grid__item">
			<div class="lede">
				<p><?php echo $p404--text; ?></p>
			</div>
			<ul class="p404__links">
				<li class="links__item"><a href="#pagePrev" class="links__item--link jsHook goBack"><?php echo $p404--back; ?></a></li>
				<li class="links__item"><a href="#accueil" class="links__item--link"><?php echo $p404--home; ?></a></li>
			</ul>
		</div>
	</div>

	<?php include ($path.'/includes/foot__javascripts.php'); ?>
</body>
</html>
