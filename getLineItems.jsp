<?php
include_once("sales_pro.php");
$x = new sales_pro;
$y = $x -> save_user_property('/services/apexrest/Products/GetProductswithLineItems', $_POST);
print_r(json_encode($y));
die();