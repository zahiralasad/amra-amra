<?php

    error_reporting(E_ALL);

    ini_set('display_errors', 1);

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    require "vendor/autoload.php";

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;

    $method = $_SERVER['REQUEST_METHOD'];

//    echo $method;
    switch($method){
        case "GET":
                echo "I am in get";
            break;
        case "POST":
            switch($_POST['request']) {
                case "login":
                    break;
                case "picnicRegistrationEmail":
                    $name = strtok($_POST['Name'], " ");
                    $email = $_POST['Email'];
                    $swishto = $_POST['Swish'];
                    
                    $mail = new PHPMailer(true);
                    $mail->isSMTP();
                    $mail->SMTPAuth = true;
                    $mail->Host = 'mail.amra-amra.se';
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                    $mail->Username = "info@amra-amra.se";
                    $mail->Password = "AmraShobaiAdmin";
                    $mail->Port = 587;
                    $mail->setFrom("info@amra-amra.se", "AmraAmra");

                    //$mail->addAddress("zahiralasad@yahoo.com", "Zahir");

                    $mail->addAddress($email, $name);
                    $mail->Subject = "Registration Confirmed";
                    $mail->Body = "Hi ".$name.", \n We confim that we have received your information and you swished to ". $swishto. "\nThanks for your participation. \nBest Regards, \nAmra-Amra";
                    $mail->send();                   
                    $returnMessage = "Hi $name, \n We have received your registration request. \n A confirmation email has sent to $email. \n Thanks for being with us \n Amra-Amra";
                    echo $returnMessage;
                    break;
                    case "memberRegistrationEmail":
                        $name = $_POST['Name'];
                        $email = $_POST['Email'];
                        
                        $mail = new PHPMailer(true);
                        $mail->isSMTP();
                        $mail->SMTPAuth = true;
                        $mail->Host = 'mail.amra-amra.se';
                        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                        $mail->Username = "info@amra-amra.se";
                        $mail->Password = "AmraShobaiAdmin";
                        $mail->Port = 587;
                        $mail->setFrom("info@amra-amra.se", "AmraAmra");
    
                        //$mail->addAddress("zahiralasad@yahoo.com", "Zahir");
    
                        $mail->addAddress($email, $name);
                        $mail->Subject = "Registration Confirmed";
                        $mail->Body = "Hi ".$name.", \n We confim that we have received your information. Please make sure your payment is done. We will update your membership status as soon as we will recieve your payment. Please check our Members page. \nThanks for your participation. \nBest Regards, \nAmra-Amra";
                        $mail->send();                   
                        $returnMessage = "Hi $name, \n We have received your registration request. \n A confirmation email has sent to $email. \n Thanks for joning with us. \n -- Amra-Amra";
                        echo $returnMessage;
                        break;
                case "gamereg":
                    break;
                case "memberreg":
                    break;
                case "adminreg":
                    echo "I am in adminreg";
                    break;
            }

    }

?>