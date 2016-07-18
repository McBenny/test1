<?php
include('foot__analytics.php');

$foot__js__list = $foot__js__prepend + $foot__js__list + $foot__js__append;

foreach ($foot__js__list AS $key => $value) {
?>
    <script type="text/javascript" src="<?php echo $value; ?>"></script>
<?php
}
?>
