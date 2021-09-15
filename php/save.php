<?php
session_start();
$start = microtime(true);
$x = floatval(htmlspecialchars($_POST["xValue"]));
$y = floatval(htmlspecialchars($_POST["yValue"]));
$r = floatval(htmlspecialchars($_POST["rValue"]));
date_default_timezone_set("Europe/Moscow");
$current_time = date("H:i:s");
$message = "";
$class = "No";

if (($x > 0 && $y >= 0 && $x + $y <= $r/2) ||
    ($x <= 0 && $y >= 0 && abs($x) <= $r && abs($y) <= $r) ||
    ($x < 0 && $y < 0 && $x*$x + $y*$y <= $r*$r)) {
    $message = "Yes";
    $class = "Yes";
} else {
    $message = "No";
}

if (!is_null($r) && !is_null($x) && !is_null($y)) {
    $result = array($x, $y, $r, $message, $current_time);
    if (!isset($_SESSION['results'])) {
        $_SESSION['results'] = array();
    }
    array_push($_SESSION['results'], $result);
    print_r('<tr><td>' . $x . '</td><td>' . $y . '</td><td>' . $r . '</td><td class="' . $class . '">' . $message . '</td><td>' . $current_time . '</td></tr>');
}
//header ("Location: ".$_SERVER['HTTP_REFERER']);