<?php
include('config.php');
$brand_name = '';
?>

<!DOCTYPE html>
<title><?php echo $brand_name;?></title>
<style>body{ text-align:center;}</style>

<?php


if(isset($_GET['order_id']) && isset($_GET['user_token']) && isset($_GET['domain_token'])){
    
    $session = base64_decode($_GET['token']);
    $email = base64_decode($_GET['user_token']);
    $domain = base64_decode($_GET['domain_token']);
    $marchant = base64_decode($_GET['marchantToken']);
    
    
    $getUserQuery = "SELECT * FROM `lead` WHERE c_email = '".$email."' AND domain_name = '".$domain."';"; 
    $result = mysqli_query($conn, $getUserQuery);
    
    while($userData = mysqli_fetch_assoc($result)){
        $customer_email = $userData["c_email"];
    	$customer_name  = $userData["c_name"];
    	$c_country      = $userData["c_country"];
    	$c_num          = $userData["c_num"];
    }
    
                    
    $team           = "CP";
	$order_id       = $_GET['order_id'];

	$mysql	        = "select * from academic_brief where order_id=$order_id";
	$result         = mysqli_query($conn, $mysql);
	$num_rows       = mysqli_num_rows($result);
	
	
	if ($num_rows > 0){
	    
	    while($row = mysqli_fetch_array($result)) {
            
            $item_name      = "Content Writing";
            $amount         = $row['amount'];
            $currency_code  = $row['currency_code'];
            $code_id        = $row["order_code"].$row["order_id"];
	    }
	 
    	$mysqlquery	= "select * from payment where order_id=$order_id";	
    	$mysqlquery = mysqli_query($conn, $mysqlquery);
    	while($payment = mysqli_fetch_array($mysqlquery)) {
    	      $amount = $payment['remaining'];
    	}

     	$paymenturl = $marchant."?cemail=".urlencode(base64_encode($customer_email))."&tm=".urlencode(base64_encode($team))."&curcode=".$currency_code."&amount=".$amount."&orderID=".urlencode(base64_encode($code_id))."&name=".urlencode(base64_encode($customer_name))."&country=".urlencode(base64_encode($c_country))."&num=".urlencode(base64_encode($c_num))."&product=".urlencode(base64_encode($item_name))."&dm=".$domain."";
    
        header("location:$paymenturl");
        exit();
        ?>
					

    <?php	
    }else{
    	echo "Order Does Not Exist";
    	header('location:/area/index.php');
    }
}

?>

