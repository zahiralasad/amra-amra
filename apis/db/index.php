<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    include 'DbConnect.php';

    $objDb = new DbConnect;
    $conn = $objDb->connect();
    $method = $_SERVER['REQUEST_METHOD'];
    $teams = array();
    // echo $_POST["request"];
    switch($method){
        case "GET":
            $sql = "select * from team_entries";
            $res = mysqli_query($conn, $sql);
            while( $team = mysqli_fetch_assoc($res))
            {
                $teams[] = $team;
            }
            echo json_encode($teams);
            break;
        case "POST":
            switch($_POST['request']) {
                case "login":
                    $email = $_POST['email'];
                    $password = $_POST['password'];
                    $sql = "select * from ssbc_admins where email='$email' and password='$password'";
                    $res = mysqli_query($conn, $sql);

                    if(mysqli_num_rows($res) > 0)
                    {
                        $row = mysqli_fetch_assoc($res);
                        // echo "Hi " .$row["first_name"]. ", you are logged in successfully";
                        echo $row["first_name"];
                    }
                    else
                    {
                        // echo "Failed to login, please try with correct credential";
                        echo "";
                    }
                    break;
                case "gamereg":
                    $player = $_POST['player'];
                    $partner = $_POST['partner'];
                    $group = $_POST['group'];
                    $email = $_POST['email'];
                    $phone = $_POST['phone'];
                    $city = $_POST['city'];
                    $sql = "select * from ssbc_tournament_2023 where phone='$phone' or email='$email'";
                    $res = mysqli_query($conn, $sql);

                    if(mysqli_num_rows($res) > 0)
                    {
                        echo "Please check registered team list, \nlooks like your team is already registered, \nWe found your phone number or email in our data";      
                    }
                    else
                    {
                        echo "Team Registration Successful";
                        // $sql_ins = "insert into ssbc_tournament_2023 (player1, player2, level, email, phone, city, payment) values ('$player', '$partner', '$group', '$email', '$phone', '$city', 'Pending')";

                        // if ($conn->query($sql_ins) === TRUE) {
                        //     echo "Team Registration Successful";
                        // } else {
                        //     echo "Couldn't Register your team. \nError: " . $sql . "<br>" . $conn->error;
                        // }
                    }            
                    break;
                case "memberreg":
                    $firstName = $_POST['first_name'];
                    $lastName = $_POST['last_name'];
                    $address = $_POST['address'];
                    $email = $_POST['email'];
                    $phone = $_POST['phone'];
                    
                    $sql = "select * from ssbc_members where phone='$phone' or email='$email'";
                    $res = mysqli_query($conn, $sql);

                    if(mysqli_num_rows($res) > 0)
                    {
                        echo "Please check them member list, \nlooks like your team is already a member, \nWe found your phone number or email in our data";      
                    }
                    else
                    {
                        echo "Member Registration Successful";
                        // $sql_ins = "insert into ssbc_tournament_2023 (player1, player2, level, email, phone, city, payment) values ('$player', '$partner', '$group', '$email', '$phone', '$city', 'Pending')";

                        // if ($conn->query($sql_ins) === TRUE) {
                        //     echo "Team Registration Successful";
                        // } else {
                        //     echo "Couldn't Register your team. \nError: " . $sql . "<br>" . $conn->error;
                        // }
                    }            
                    break;
                case "adminreg":
                    echo "I am in admin reg";
                    break;
            }
    }
    $conn->close();
?>