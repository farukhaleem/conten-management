<?php
include('config.php');

if(isset($_POST['paperTopic'])){

	$return_arr 			= $_POST ;
	$client_id 				= $_POST['user'];
	$pdt 					= $_POST['paperType'];
	$deadline 				= $_POST['deadline'];
	$order_code 			= $_POST['order_code'];
	$style 					= stripslashes($_POST['style']);
	$language 				= stripslashes($_POST['language']);
	$pages   				= stripslashes($_POST['pages']);
	$space 					= stripslashes($_POST['pageType']);
	$level 					= stripslashes($_POST['academicLevel']);
	$Subject_area 			= stripslashes($_POST['subjectArea']);
	$referece 				= stripslashes($_POST['references']);
	$amount 				= stripslashes($_POST['totalCost']);
	$Subject_area_caption 	= stripslashes($_POST['sub_area_caption']);
	$pdt_caption 			= stripslashes($_POST['pdt_caption']);
	$topic   				= stripslashes($_POST['paperTopic']);
	$detail 				= mysqli_real_escape_string($conn, stripslashes($_POST['detail']));
	$currency 				= $_POST['currency'];
	$reference_file_arr 	= implode(",", $_POST['image']);

	
	$sql = "INSERT INTO academic_brief (`order_id`, `client_id`, `topic`, `paper_type`, `paper_type_caption`, `deadline`, `style`, `language`, `num_of_page`, `space`, `academic_level`, `sub_area`, `sub_area_caption`, `num_ref`, `details`, `order_status`,`amount`, `date` ,
	`read_status`,`currency_code` ,`order_code`) VALUES (NULL, '$client_id', '$topic', '$pdt', '$pdt_caption', '$deadline', '$style', '$language', '$pages', '$space','$level', '$Subject_area', '$Subject_area_caption', '$referece', '$detail', 'Pending','$amount', CURRENT_TIMESTAMP,  '0','$currency','$order_code');";

	$return_arr['paperTopic_item'] 	= $_POST['paperTopic'];
	
	if (mysqli_query($conn, $sql)) {
		$last_id 	= mysqli_insert_id($conn);
		$finalcode 	= $order_code.$last_id;

		$query = "INSERT INTO `payment` (`p_id`, `order_id`, `client_id`, `total_paid`, `remaining`, `total_payment`, `co_order_number`, `currency_code`, `product_id`) VALUES (NULL, '$last_id', '$client_id', '0', '$amount', '$amount', '0', '$currency', '$finalcode');";
	
		mysqli_query($conn, $query);
		$file_query = "INSERT INTO reference_file_tbl (`file_id`,`client_id` ,`order_id` ,`file_name`)VALUES (NULL ,  '$client_id', '$last_id',  '".$reference_file_arr."');";

		mysqli_query($conn, $file_query);
		$encoded = urlencode( base64_encode('success') );


		$return_arr['status'] = 'success';
		$return_arr['order_id'] = $last_id ;

		  
	}else {
		$return_arr['status'] = 'success';
		$return_arr['msg'] = mysqli_error($conn);
	}

	echo json_encode($return_arr);
	mysqli_close($conn);
}


?>