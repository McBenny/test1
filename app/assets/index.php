<?php
$path = '.';
$dev = isset($_GET['dev']) && $_GET['dev'] == 1 ? true : false;

require($path.'/config.php');

include_once($path.'/lng-'.$languages['default'].'/translations.php');
if ($languages['default'] != $languages['active']) {
    include_once($path.'/lng-'.$languages['active'].'/translations.php');
}

include ($path.'/'.$varSite['includes'].'/head__html.php');

$head__title = 'Home page';
/*
$head__style = '
        a {color: inherit;}
        .inactive {color: #999; text-decoration: none; cursor: default;}
';
*/

include ($path.'/'.$varSite['includes'].'/head__head.php');

/*
$foot__js__prepend = array(
    $path.'/scripts/script-before.js'
);
$foot__js__append = array(
    $path.'/scripts/script-after.js'
);
*/
?>

<body id="top">
<?php 
if ($dev) {
    include ($path.'/'.$varSite['includes'].'/_table-of-content.php');
}
?>

<?php include($varSite['includes'].'/navigation.php'); ?>

<h1>This is the homepage</h1>

<?php include ($path.'/'.$varSite['includes'].'/inuit-demo__buttons.php'); ?>

<?php /*include ($path.'/'.$varSite['includes'].'/header.php');*/ ?>

<?php /*include ($path.'/'.$varSite['includes'].'/headband.php');*/ ?>

<?php /*include ($path.'/'.$varSite['includes'].'/footer.php');*/ ?>

<?php include ($path.'/'.$varSite['includes'].'/foot__javascripts.php'); ?>

</body>
</html>