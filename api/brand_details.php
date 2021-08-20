<?php

require_once("config.php");
include('../../includes/brand_details.php');

if($_GET['domain']){
    
    $domainurl = str_replace("area.","www.", $_GET['domain'] );
    $result = mysqli_query($conn, "SELECT * FROM `brands` WHERE domain_name = '".$domainurl."'");
    
    while($row = mysqli_fetch_assoc($result)){
        $return_array = $row;
        $return_array['marchantToken'] = base64_encode($row['marchantURL']);
    }
    
    echo json_encode($return_array);
    
}



?>