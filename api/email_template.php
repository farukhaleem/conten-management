<?php 

$message = 
'<html>
<head>
<title>Congratulation your account has been activated at '.$brand_name.'</title>
</head>
<body>
<div style="width:630px; font-size:13px; font-family:Arial, Helvetica, sans-serif; margin:0 auto; background:#fff;">

<table style="padding:20px 0px 10px; width:100%">
<tr>
<td colspan="2"><h1 style="font-size: 16px;text-align: center;padding: 0px 0px 12px;color: #d12033;">Congratulation your account has been activated at '.$brand_name.'</h1></td>
</tr>
	<tr>
            	<td width="50%"><a href="http://'.$domain_name.'/" style="font-size:22px; display:block" target="_blank"><img src="http://'.$domain_name.'/assets/images/logo.png" alt="'.$domain_name.'"></a></td>
                <td width="50%"><a href="http://'.$domain_name.'/" style="font-size:14px; text-decoration:none; display:block; color:#333; text-align:right;" target="_blank">Contact Us</a><a href="http://'.$domain_name.'/" style="font-size:14px; text-decoration:none; display:block; color:#333; text-align:right; margin-right:8px; margin-top:6px;" target="_blank">Live Chat</a></td>
                
            </tr>
</table>

<table>

<tbody>
	<tr>
    	<td><hr style="margin-bottom:30px;"></td>
    </tr>
<tr>  
                                    <td>  
                                        <p style="font-family:Arial,Helvetica,sans-serif;color:#7f2a18;line-height:18px;font-size:12px">  
                                            <strong>Dear '.$_SESSION["c_name"].',</strong></p>  
                                          
                                        <p style="font-family:Arial,Helvetica,sans-serif;color:#777777;line-height:18px;font-size:12px;padding-bottom:10px">  
                                            Thank you for Signup with  '.$brand_name.'.  
                                        </p>  
                                       
                                        <p style="font-family:Arial,Helvetica,sans-serif;color:#777777;line-height:18px;font-size:12px;padding-bottom:10px">  
                                            <strong>Verify Your '.$brand_name.' Account</strong>  
                                        </p>  
                                        <p style="font-family:Arial,Helvetica,sans-serif;color:#777777;line-height:18px;font-size:12px;padding-bottom:10px">  
                                            Please verify and update your account profile on our website by clicking on the  
                                            following link:  
                                        </p>  
                                        <p style="font-family:Arial,Helvetica,sans-serif;color:#7f2a18;line-height:18px;font-size:12px">  
                                            <a href="http://www.'.$domain_name.'/area/" target="_blank"><strong>Dashboard</strong></a>  
                                        </p>  
                                        <p style="font-family:Arial,Helvetica,sans-serif;color:#777777;line-height:18px;font-size:12px;padding-bottom:10px">  
                                            Our system has generated the following password for your account.  you may option to change the password to something you prefer or you can use the same auto-generated password if you wish.  
                                        </p>  
                                        <p style="font-family:Arial,Helvetica,sans-serif;line-height:18px;font-size:12px;padding-bottom:10px">  
                                            <span style="color:#7f2a18">Username:</span> <span style="color:#777777">'.$_SESSION["email"].'  </span>  
                                            <br>  
                                            <span style="color:#7f2a18">Password :</span> <span style="color:#777777"><strong>1</strong> 
                                            </span>  
                                        </p>  
                                        <p style="font-family:Arial,Helvetica,sans-serif;color:#777777;line-height:18px;font-size:12px;padding-bottom:10px">  
                                            We look forward to working with you on this project. Should you have any enquiries  
                                            regarding your account or your order details, you can reach us via the Support Central    panel in your account or <strong>liveChat</strong> with us.  
                                        </p>  
                                          
                                        <br>  
                                        <p style="font-family:Arial,Helvetica,sans-serif;color:#777777;font-size:12px;padding-bottom:10px;line-height:18px">  
                                            Kind regards,<br>  
                                            <br>  
                                            <span style="font-family:Arial,Helvetica,sans-serif;color:#7f2a18;font-size:12px">  
                                                <strong>'.$brand_name_small.' Support Team</strong></span><br>  
                                           
                                            <strong>Email:</strong> <a href="mailto:+support@'.$brand_name_small.'" style="color:#b05700" target="_blank">  
                                                support@'.$domain_name.'</a>&nbsp; | &nbsp;<strong>; <strong>Website</strong>: <a href="http://'.$domain_name.'" style="color:#b05700" target="_blank">'.$domain_name.'</a>  
                                        </p>  
                                    </td>  
                                </tr>  
                            </tbody>
                            </table></div></body>
</html>

';

echo $message ;

 ?>