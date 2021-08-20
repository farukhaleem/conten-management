<?php
session_start();

if(isset($_POST['pn']) && $_POST['pn'] != ''){
    
    $sign = '+';
    $Cnum = $sign.$_POST['code'].$_POST['pn'];

}

// Require the bundled autoload file - the path may need to change
// based on where you downloaded and unzipped the SDK
require $_SERVER['DOCUMENT_ROOT'].'/sms/src/Twilio/autoload.php';


// Use the REST API Client to make requests to the Twilio REST API
use Twilio\Rest\Client;


//Your Account SID and Auth Token from twilio.com/console

$sid = 'AC7191bccefb297cb8e3fe618751bfa5bd';
$token = '9ff80d59001329f2de81bd58592ff9c9';
$client = new Client($sid, $token);

$return_arr = [];

if(isset($_POST['cn']) && $_POST['cn'] != ''){
	
	require_once("config.php");
	
	$domain_name 	= $_POST['domain_name'];
	$domain         = ltrim($domain_name,"www.");
	
	$brand_name     = rtrim($domain,".co.uk");
	$brand_name     = rtrim($brand_name,".com");
	
	$page_name 		= $_POST['page_name'];
	$c_name	 		= stripslashes($_POST['cn']);
	$c_email 		= stripslashes($_POST['em']);
	$c_country 		= stripslashes($_POST['pc']);
	$c_country_name = stripslashes($_POST['ctry']);
	$direction	 	= stripslashes($_POST['direction']);
	$c_code	 		= stripslashes($_POST['code']);
	$c_num 			= stripslashes($_POST['pn']);
	$c_anum 		= stripslashes($_POST['apc']);
	$c_acode 		= stripslashes($_POST['acode']);
	$topic 			= stripslashes($_POST['topic']);
	$c_desc 		= stripslashes($_POST['c_desc']);
	$pwd 			= '1';//substr(str_shuffle('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') , 0 , 10 );
	$create_pwd 	= $pwd;
	$pwd 			= md5($pwd);
	$subject 		= $domain_name;
	//$pwd 			= $_POST['pwd'];


	$sql = "INSERT INTO lead (`id`, `domain_name`, `page_name`, `c_name`, `c_email`, `c_num`, `c_anum`, `c_code`, `c_acode`, `c_country`, `pwd`, `topic`, `lead_time`, `c_desc`) VALUES (NULL, '$domain_name', '$page_name', '$c_name', '$c_email', '$c_num', '$c_anum', '$c_code', '$c_acode', '$c_country_name', '$pwd', '$topic', CURRENT_TIMESTAMP, '$c_desc')";

	if (mysqli_query($conn, $sql)) {
		$return_arr['status'] = 'success';
		$encoded = urlencode( base64_encode('success_user_msg'));
		$return_url = $page_name."?rule=".$encoded."?=stdName=".$c_name;
		
		$last_id = mysqli_insert_id($conn);

		$_SESSION["user"] 		= $last_id;
		$_SESSION["email"] 		= $c_email;
		$_SESSION["c_name"] 	= $c_name;
		$_SESSION["c_code"] 	= $c_code;
		$_SESSION["c_country"] 	= $c_country_name;
		$_SESSION["c_num"] 		= $c_num;
		
		$return_arr["user_token"]   = urlencode(base64_encode($c_email));
        $return_arr["domain_token"] = urlencode(base64_encode($domain_name));
		
		$return_arr['data'] 	= $_POST;
		$return_arr['last_id'] 	= $last_id;
		$return_arr['token'] 	= 'jhsjdhsadsjkanmkxzkdhsSu45s4dSD'.'&pm=0';
		$return_arr['email_item'] 	= '<sales@'.$domain.'>';
		
		
		if($direction == 1){
			//send sms to client phone
			try{
				$client->messages->create(
				    // the number you'd like to send the message to
				    $Cnum,
				    array(
				        // A Twilio phone number you purchased at twilio.com/console
				        'from' => '+447723481189',
				        // the body of the text message you'd like to send
				        'body' => "Thank You for choosing ".$domain_name." as your reliable partner! UK's Best Writing Company. Further Help Reach Us at ales@$domain"
				    )
				);
				// Display a confirmation message on the screen
			  	$smserror = "success";

			}catch (Exception $e) {
        		$smserror = "failed";
        	}	
			$return_arr['redirection'] = '/#/placeorder?appearfirst=1' ;		
		
		}
		else{
			$return_arr['redirection'] = "https://".$domain_name.$direction."?stdName=".$c_name ;
		}
	 
	} else {
	    $return_arr['msg'] = "Sorry, Something wents wrong. Please Try Again!" ;
	}

	$message = '
        <html>
            <head><title>Congratulation your account has been activated at '.$brand_name.'</title></head>
            <body>
                <div style="width:630px; font-size:13px; font-family:Arial, Helvetica, sans-serif; margin:0 auto; background:#fff;">
                    <table style="padding:20px 0px 10px; width:100%">
                        <tr><td colspan="2"><h1 style="font-size: 16px;text-align: center;padding: 0px 0px 12px;color: #d12033; text-transform: capitalize;">Congratulation your account has been activated at '.$brand_name.'</h1></td></tr>
        	            <tr><td width="50%"><a href="https://www.'.$domain.'/" style="font-size:22px; display:block" target="_blank"><img style="max-width: 160px;" src="https://www.'.$domain.'/assets/images/logo.png" alt="'.$domain.'"></a></td><td width="50%"><a href="https://www.'.$domain.'/" style="font-size:14px; text-decoration:none; display:block; color:#333; text-align:right;" target="_blank">Contact Us</a><a href="https://www.'.$domain.'/" style="font-size:14px; text-decoration:none; display:block; color:#333; text-align:right; margin-right:8px; margin-top:6px;" target="_blank">Live Chat</a></td></tr>
                    </table>
                    <table>
                        <tbody>
        	                <tr><td><hr style="margin-bottom:30px;"></td></tr>
                            <tr>  
                                <td>  
                                    <p style="font-family:Arial,Helvetica,sans-serif;color:#7f2a18;line-height:18px;font-size:12px"><strong>Dear '.$_SESSION["c_name"].',</strong></p>  
                                    <p style="font-family:Arial,Helvetica,sans-serif;color:#777777;line-height:18px;font-size:12px;padding-bottom:10px; text-transform: capitalize;">Thank you for Signup with  '.$brand_name.'. </p>  
                                    <p style="font-family:Arial,Helvetica,sans-serif;color:#777777;line-height:18px;font-size:12px;padding-bottom:10px"><strong style="text-transform: capitalize;">Verify Your '.$brand_name.' Account</strong> </p>  
                                    <p style="font-family:Arial,Helvetica,sans-serif;color:#777777;line-height:18px;font-size:12px;padding-bottom:10px">Please verify and update your account profile on our website by clicking on the following link:</p>  
                                    <p style="font-family:Arial,Helvetica,sans-serif;color:#7f2a18;line-height:18px;font-size:12px">  <a href="https://area.'.$domain.'" target="_blank"><strong>Dashboard</strong></a> </p>  
                                    <p style="font-family:Arial,Helvetica,sans-serif;color:#777777;line-height:18px;font-size:12px;padding-bottom:10px">Our system has generated the following password for your account.  you may option to change the password to something you prefer or you can use the same auto-generated password if you wish.  </p>  
                                    <p style="font-family:Arial,Helvetica,sans-serif;line-height:18px;font-size:12px;padding-bottom:10px"> <span style="color:#7f2a18">Username:</span> <span style="color:#777777">'.$_SESSION["email"].'  </span><br><span style="color:#7f2a18">Password :</span> <span style="color:#777777"><strong>1</strong></span></p>  
                                    <p style="font-family:Arial,Helvetica,sans-serif;color:#777777;line-height:18px;font-size:12px;padding-bottom:10px">We look forward to working with you on this project. Should you have any enquiries regarding your account or your order details, you can reach us via the Support Central panel in your account or <strong>liveChat</strong> with us. </p><br>  
                                    <p style="font-family:Arial,Helvetica,sans-serif;color:#777777;font-size:12px;padding-bottom:10px;line-height:18px"> Kind regards,<br><br><span style="font-family:Arial,Helvetica,sans-serif;color:#7f2a18;font-size:12px; text-transform: capitalize;"><strong>'.$brand_name.' Support Team</strong></span><br><strong>Email:</strong> <a href="mailto:sales@'.$domain.'" style="color:#b05700" target="_blank">sales@'.$domain.'</a>&nbsp; | &nbsp;<strong>; <strong>Website</strong>: <a href="https://www.'.$domain.'" style="color:#b05700" target="_blank">https://www.'.$domain.'</a> </p>  
                                </td>  
                            </tr>  
                        </tbody>
                    </table>
                </div>
            </body>
        </html> 
    ';


	$headers  = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

	$headers .= 'From: <sales@'.$domain.'>' . "\r\n";
	$headers .= 'Bcc: engrkamranarain@hotmail.com' . "\r\n";
	
	if(mail($c_email, $subject, $message, $headers)){
		$return_arr['email_status'] = 'Email sent to client.';
	}
	
	$return_arr['sms_status'] = $smserror;
	$return_arr['email_temp'] 	= $message;
	
	mysqli_close($conn);

}else{
	 
	$return_arr['status'] = 'error';
	$return_arr['msg'] = 'All feilds required';

}

echo json_encode($return_arr);

?>