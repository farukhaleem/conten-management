<?php



header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Max-Age: 1728000');
header("Content-Type:application/json");



$servername = "localhost";
$username = "user_rsp";
$password = "M9E3eTT?8SzQ";
$dbname = "rsp_crmnew";

// updated version

$conn = new mysqli($servername, $username, $password, $dbname);



if ($conn -> connect_errno) {

  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;

  exit();

}



?>