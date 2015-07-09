<?php
include_once("sales_pro.php");
$x = new sales_pro;
$y = $x -> save_user_property('/services/apexrest/Order/CreateOrder', $_POST);
print_r(json_encode($y));
die();