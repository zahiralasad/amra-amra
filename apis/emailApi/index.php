<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    require "vandor/autoload.php";
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;

    
    <!-- $objDb = new DbConnect;
    $conn = $objDb->connect();
    $method = $_SERVER['REQUEST_METHOD'];
    $teams = array(); -->

    switch($method){
        <!-- case "GET":
            $sql = "select * from ssbc_tournament_2023";
            $res = mysqli_query($conn, $sql);
            while( $team = mysqli_fetch_assoc($res))
            {
                $teams[] = $team;
            }
            echo json_encode($teams);
            break; -->
        case "POST":
            switch($_POST['request']) {
                case "sendemail":
                    // SMTP setup
                    $mail = new PHPMailer(true);
                    $mail->isSMTP();
                    $mail->Host       = 'mail.amra-amra.se';                     // Set the SMTP server to send through
                    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
                    $mail->Username   = 'info@amra-amra.se';               // SMTP username
                    $mail->Password   = 'AmraShobaiAdmin';                        // SMTP password
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTAALS;
                    $mail->Port       = 587; 

                    // receiver email

                    $mail->Subject = "Registration confirmed";

                    $email = $_POST['Email'];
                    $swishto = $_POST['SwishTo'];
                    $name = strtok($_POST['Name'], " ");
                    $mail->Body = "Dear " . $name . ",\n" . This is a confirmation email. \n We have received your infromation and you swish to ". $swishto . "\n You are now registed to the Picnic 2024.\n Best Regards,\n Admin \ amra-amra\n" 
                    
                    $mail->send();
                    
                    echo "Email sent";
                    break;
                case "adminlogin":
                    break;
                case "adminreg":
                    echo "I am in admin reg";
                    break;
            }
    }
    $conn->close();
?>