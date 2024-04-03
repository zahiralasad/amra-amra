<?php
require __DIR__ . '/vendor/autoload.php';

$client = new \Google_Client();
$client->setApplicationName('php-google-data');
$client->setScopes([\Google_Service_Sheets::SPREADSHEETS]);
$client->setAccessType('offline');
$client->setAuthConfig(__DIR__ . '/credentials.json');

$service = new Google_Service_Sheets($client);
$spreadsheetId = "1ibmqfv_y-MVR5bkt2aSjbFle-aIwq6guJsrNhvE25UE";

$range = "entries!A1:B1";
$response = $service->spreadsheets_values->get($spreadsheetId, $range);
$values = $response->getValues();

// $range = "entries"; //sheet name
// // $response = $service->spreadsheets_values->get($spreadsheetId, $range);

// // $values = $response->getValues();


// $params = [
//     'valueInputOption' => 'RAW'
// ];

// $insert = [
//     'insertDataOptions' => 'INSERT_ROWS'
// ];

// $values = [
//     ['testing', 'zahir'],
// ];

// $body = new Google_Service_Sheets_ValueRange([
//     'values' => $values
// ]);

// $params = [
//     'valueInputOption' => 'RAW'
// ];

// $result = $service->spreadsheets_values->append(
//     $spreadsheetId,
//     $range,
//     $body,
//     $params
// );

// if($result->updates->updateRows == 1){
//     echo "Success";
// }else {
//     echo "Fail";
// }