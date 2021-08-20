<?php
include('config.php');

// fetch orders data start
if( isset($_GET['order_user']) ){            
    
  $getDbTime = mysqli_query($conn, "SELECT now() AS time");
  while($time = mysqli_fetch_assoc($getDbTime)){
      $time_now = $time['time'];
  }          
  
  $getUser = mysqli_query($conn, "SELECT * FROM `session` WHERE session_id = '".$_GET['auth_token']."'");
  
  $session_time = 0;
  if(mysqli_num_rows($getUser) > 0){
    while($user_row = mysqli_fetch_assoc($getUser)){
      $session_time = (strtotime($time_now) - strtotime($user_row['session_time'])) / 60;    
    }
  }
    $return_arr = [];
    $sql    = "select * from academic_brief where client_id = ".$_GET['order_user'] ;
    $orders = mysqli_query($conn, $sql);

      $a = 0;
      while($row = mysqli_fetch_assoc($orders)) {
                
        $return_arr[$a]['order_code']           = $row['order_code'];
        $return_arr[$a]['order_id']             = $row['order_id'];
        $return_arr[$a]['date']                 = $row['date'];
        $return_arr[$a]['topic']                = $row['topic'];
        $return_arr[$a]['paper_type_caption']   = $row['paper_type_caption'];
        $return_arr[$a]['order_status']         = $row['order_status'];
        $return_arr[$a]['currency_code']        = $row['currency_code'];
        $return_arr[$a]['session_time']         = $session_time;
            
          $payments_data = [] ;
          $payments = mysqli_query($conn, "select * from payment where order_id = ".$row['order_id']);
          while($payment_row = mysqli_fetch_assoc($payments)) { 
            $return_arr[$a]['total_payment']  = $payment_row['total_payment'];
            $return_arr[$a]['total_paid']     = $payment_row['total_paid'];
            $return_arr[$a]['remaining']      = $payment_row['remaining'];
          }    
        $a++;
      }  
  
  echo json_encode($return_arr);  
}
// fetch orders data end

// get order with id start

if( isset($_GET['get_order']) ){            
  
    $sql    = "select * from academic_brief where order_id = ".$_GET['get_order'] ;
    
    if($orders = mysqli_query($conn, $sql)){
          
          $a = 0; $return_arr = [];
          while($row = mysqli_fetch_assoc($orders)) {
                    
            $return_arr[$a]['order_code']           = $row['order_code'];
            $return_arr[$a]['order_id']             = $row['order_id'];
            $return_arr[$a]['date']                 = $row['date'];
            $return_arr[$a]['topic']                = $row['topic'];
            $return_arr[$a]['paper_type_caption']   = $row['paper_type_caption'];
            $return_arr[$a]['order_status']         = $row['order_status'];
            $return_arr[$a]['currency_code']        = $row['currency_code'];
            $return_arr[$a]['deadline']             = $row['deadline'];
            $return_arr[$a]['style']                = $row['style'];
            $return_arr[$a]['language']             = $row['language'];
            $return_arr[$a]['num_of_page']          = $row['num_of_page'];
            $return_arr[$a]['academic_level']       = $row['academic_level'];
            $return_arr[$a]['num_ref']              = $row['num_ref'];
            $return_arr[$a]['details']              = $row['details'];
            $return_arr[$a]['sub_area']             = $row['sub_area_caption'];
    
    
                
              $payments_data = [] ;
              $payments = mysqli_query($conn, "select * from payment where order_id = ".$row['order_id']);
              while($payment_row = mysqli_fetch_assoc($payments)) { 
                $return_arr[$a]['total_payment']  = $payment_row['total_payment'];
                $return_arr[$a]['total_paid']     = $payment_row['total_paid'];
                $return_arr[$a]['remaining']      = $payment_row['remaining'];
              }    
            $a++;
          }  
      
      echo json_encode($return_arr);  
    }          
}
// get order with id end


// currency code start
if( isset($_GET['currency']) ){            
  $query = "SELECT usd, aud, gbp FROM `currency`";
  $result = mysqli_query($conn, $query);
      while($row = mysqli_fetch_assoc($result)) {
        $return_arr = $row;        
      }  
  echo json_encode($return_arr);  
}
// currency code end



?>