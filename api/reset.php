<?php

include('config.php');
if(isset($_POST['newPass']) && $_POST['newPass'] != ''){	

	$password = $_POST['newPass'];
	$sql = "UPDATE lead SET `pwd` = MD5('".$password."') WHERE `lead`.`id` = ".$_POST['user_id'].";";
	if (mysqli_query($conn, $sql)) {
		$return_arr['status'] = 'success';
		$return_arr['msg'] = 'password updated';
	}else{
		$return_arr['status'] = 'error';
		$return_arr['msg'] = 'Error in query';		
	}
	echo json_encode($return_arr);

}




?>