        <nav>
            <ul class="nav header__nav header__nav--desk" data-title="Navigation">
<?php

foreach ($navigation__texts AS $key => $value) {
?>
                <li class="nav__item"><a href="<?php echo $navigation__urls[$key]; ?>"><?php echo $value; ?></a>
<?php
}
?>
                <li class="flush--right nav__item nav__item--search jsHook">
                    <a href="#recherche" title="<?php echo $navigation__search; ?>"><span class="accessibility"><?php echo $navigation__search; ?></span></a>
                </li>
            </ul>
        </nav>

<div class="ghostBar">
    The ghost Nav !
</div>
