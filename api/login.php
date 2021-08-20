<?php
session_start();
include('config.php');

if( isset($_POST['username']) && isset($_POST['password'])){            
  
  $error = false;

  if($_POST['username'] == '' || $_POST['password'] == ''){
    $return_arr['status']    = 'errors';
    $return_arr['msg']    = '* All feilds are required !';
    $error = true;
  }else{
    $error = false;    
  }

  if(!$error){

    $username = strip_tags(stripcslashes($_POST['username']));
    $password = strip_tags(stripcslashes($_POST['password']));
    $token = openssl_random_pseudo_bytes(16);
    $token = bin2hex($token);

    $getUser = mysqli_query($conn, "SELECT * FROM `session` WHERE account_id = '".$username."'");
    if(mysqli_num_rows($getUser) > 0){
      while($user_row = mysqli_fetch_assoc($getUser)){
        $id = $user_row['id'];  
        $session_query = "UPDATE `session` SET `session_id` = '".$token."' WHERE `session`.`id` = ".$id.";";
      }
    }else{
        $session_query = "INSERT INTO `session` (`id`, `account_id`, `session_id`) VALUES (NULL, '".$username."', '".$token."');";
    }

    if(mysqli_query($conn, $session_query)){
    
       $query = 'SELECT * FROM `lead` WHERE `c_email` = "'.$username.'" and pwd = "'.md5($password).'"';
    
      $result = mysqli_query($conn, $query);
      
      $num_rows = mysqli_num_rows($result);
      
      if ($num_rows > 0) 
      {
        $a = 0;
        while($row = mysqli_fetch_array($result)) {
          $id = $row["id"];
          $email = $row["c_email"];
          $c_name = $row["c_name"];
          $c_code = $row["c_code"];
          
          $c_country = $row["c_country"];
          $c_num = $row["c_num"];
          $domain_name = $row["domain_name"];
          $pm = 0;    
        $orders = mysqli_query($conn, "select credit from store_credit where `store_credit`.lead_id = ".$row['id'].";");
          while($order = mysqli_fetch_assoc($orders)) {
             $pm = $order['credit'] ; 
          }
          $a++;
        }
        
        


        $_SESSION["user"]     = $id;
        $_SESSION["email"]    = $email;
        $_SESSION["c_name"]   = $c_name;
        $_SESSION["c_code"]   = $c_code;
        $_SESSION["c_country"]  = $c_country;
        $_SESSION["c_num"]    = $c_num;

        $return_arr["user"] = $id;
        $return_arr["email"] = $email;
        $return_arr["c_name"] = $c_name;
        $return_arr["c_code"] = $c_code;
        $return_arr["c_country"] = $c_country;
        $return_arr["c_num"] = $c_num;
        $return_arr['status']    = 'success';
        $return_arr["user_token"] = urlencode(base64_encode($email));
        $return_arr["domain_token"] = urlencode(base64_encode($domain_name));
        $return_arr['token']    = $token;
        $return_arr['pm']    = $pm;
        
      }else{
        
        $return_arr['status']    = 'error';
        $return_arr['msg']    = '* Invalid username or password !';
        } 
         
      } 
    }
  
  echo json_encode($return_arr);  
}

?>