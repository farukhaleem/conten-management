<?php

if(isset($_GET['em']) && isset($_GET['id']) && isset($_GET['cn']) && isset($_GET['token'])){
?>

    <script>
              localStorage.setItem('user', "<?php echo $_GET['em']; ?>");
              localStorage.setItem('id', "<?php echo $_GET['id']; ?>");
              localStorage.setItem('userName', "<?php echo $_GET['cn']; ?>");
              localStorage.setItem('token', "<?php echo $_GET['token']; ?>");
              localStorage.setItem('role', true);
              localStorage.setItem('pm', "<?php echo $_GET['pm']; ?>");
          
              localStorage.setItem('user_token', "<?php echo $_GET['user_token']; ?>");
              localStorage.setItem('domain_token', "<?php echo $_GET['domain_token']; ?>");
              localStorage.setItem('visit_type', "first_visit");
              window.location.href = '/#/placeorder?appearfirst=1';
    </script>

<?php  
}


?>