<?php

	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	header("Access-Control-Allow-Credentials: true");
	header('Access-Control-Max-Age: 1728000');
	header("Content-Type: multipart/form-data"); 	
 
    $target_dir = "../upload/reference-paper/";
    
    $newname = time().'-'.basename($_FILES["image"]["name"]); 
    $target_file = $target_dir.$newname;

  	if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
		echo $newname;
  	}

?>