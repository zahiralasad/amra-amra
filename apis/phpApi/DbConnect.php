<?php
    /**
    * Database Connection
    */
    class DbConnect {
        private $server = 'localhost';
        private $database = 'ssbc_main';
        private $username = 'ssbc_zahir';
        private $password = 'Tushar1510';
        public function connect() {
            try {
                $connect = mysqli_connect($this->server, $this->username, $this->password, $this->database);
                return $connect;
            } catch (\Exception $e) {
                echo "Database Error: " . $e->getMessage();
            }
       }

    }
?>