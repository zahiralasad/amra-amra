<?php
    /**
    * Database Connection
    */
    class DbConnect {
        private $server = 'localhost';
        private $database = 'amraamra_picnics';
        private $username = 'amraamra';
        private $password = 'BHbu.A9m6n?(';
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