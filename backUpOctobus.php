<?php
use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
//To Solve File REST_Controller not found
require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

/**
 * This is an example of a few basic user interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Octobus extends REST_Controller {

public $http_login;
public $http_password;

public $login;
public $password;
    function __construct()
    {
        // Construct the parent class
        parent::__construct();
		$this->load->driver('cache');
		$this->http_login = 'httptest';
		$this->http_password = 'ha3fXvQe';
		$this->login = 'viabona_api';
		$this->password = '2dzVEVPLw23Z';

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
       // $this->methods['users_get']['limit'] = 500; // 500 requests per hour per user/key
       // $this->methods['users_post']['limit'] = 100; // 100 requests per hour per user/key
      //  $this->methods['users_delete']['limit'] = 50; // 50 requests per hour per user/key
    }

	private function token(){
		if ( !$this->cache->get('token')){
			$curl = curl_init();
			curl_setopt_array($curl, array(
			  CURLOPT_URL => "https://".$this->http_login.":".$this->http_password."@octobusdemo.cloud/omio/cgi-bin/gtmapp/wapi/login",
			  CURLOPT_RETURNTRANSFER => true,
			  CURLOPT_ENCODING => "",
			  CURLOPT_MAXREDIRS => 10,
			  CURLOPT_TIMEOUT => 30,
			  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			  CURLOPT_CUSTOMREQUEST => "POST",
			  CURLOPT_POSTFIELDS => "login=".$this->login."&password=".$this->password,
			  CURLOPT_HTTPHEADER => array(
				"Content-Type: application/x-www-form-urlencoded",
				"Postman-Token: e2b88c60-a422-441c-99e7-85b470fdd8a5",
				"cache-control: no-cache"
			  ),
			));
			$response = curl_exec($curl);
			$err = curl_error($curl);
			$result = json_decode($response, TRUE);
			curl_close($curl);
			if ($err) {
			 
			  $this->response($err, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
			} else {
				$this->cache->file->save('token', $result['token'], 3*60*60);
			   
			}
		}
		return $this->cache->file->get('token');
	}
	public function test_get(){
		$curl = curl_init();
if ($this->get('direct')){
			$change = 0;
		}else{
			$change = 1;
		}
		
		if ($this->get('goback')){
			$goback = 1;
		}else{
			$goback = 0;
		}
curl_setopt_array($curl, array(
  CURLOPT_URL => "https://".$this->http_login.":".$this->http_password."@octobusdemo.cloud/omio/cgi-bin/gtmapp/wapi/trips?change=".$change."&currency=UAH&from=".$this->get('fromID')."&to=".$this->get('toID')."&goback=".$goback."&passcount=".$this->get('passengers')."&when=".$this->get('on'),
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "Content-Type: application/x-www-form-urlencoded",
    "Lang: ru",
    "Postman-Token: 23c204e3-b0b3-434a-81b9-a1a3151f0348",
    "cache-control: no-cache",
    "session: ".$this->token()
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
	}
	public function tripInfo_get(){
		if ($this->get('id')){
			$curl = curl_init();
			curl_setopt_array($curl, array(
  CURLOPT_URL => "https://".$this->http_login.":".$this->http_password."@octobusdemo.cloud/omio/cgi-bin/gtmapp/wapi/trip?currency=UAH&passcount=".$this->get('passengers')."&id=".$this->get('id'),
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "Content-Type: application/x-www-form-urlencoded",
    "Lang: ru",
    "Postman-Token: 23c204e3-b0b3-434a-81b9-a1a3151f0348",
    "cache-control: no-cache",
    "session: ".$this->token()
  ),
));
			$response = curl_exec($curl);
			$err = curl_error($curl);
			$result = json_decode($response, TRUE);
			
			curl_close($curl);
			if ($err) {
			 
			  $this->response($err, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
			} else {
				$result['infoTripBus'] = $this->infoTrip($this->get($result['tripId']));
				//$result['zaza'] = $this->infoTrip($this->get('id'));
				$this->response($result, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
			   
			}
		}else{
			$this->response('error', REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
		}
	}
	
	private function infoTrip($tripId){
		if ($tripId){
			$curl = curl_init();
			curl_setopt_array($curl, array(
  CURLOPT_URL => "https://".$this->http_login.":".$this->http_password."@octobusdemo.cloud/omio/cgi-bin/gtmapp/wapi/trip?currency=UAH&passcount=".$this->get('passengers')."&id=".$tripId,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "Content-Type: application/x-www-form-urlencoded",
    "Lang: ru",
    "Postman-Token: 23c204e3-b0b3-434a-81b9-a1a3151f0348",
    "cache-control: no-cache",
    "session: ".$this->token()
  ),
));
			$response = curl_exec($curl);
			$err = curl_error($curl);
			$result = json_decode($response, TRUE);
			
			curl_close($curl);
			if ($err) {
			 return $err;
			//  $this->response($err, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
			} else {
				return $result;
				//$this->response($result, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
			   
			}
		}else{
			$this->response('error', REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
		}
	}
	private function stopTrip($tripId){
		if ($tripId){
			$curl = curl_init();
			curl_setopt_array($curl, array(
  CURLOPT_URL => "https://".$this->http_login.":".$this->http_password."@octobusdemo.cloud/omio/cgi-bin/gtmapp/wapi/route?id=".$tripId,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "Content-Type: application/x-www-form-urlencoded",
    "Lang: ru",
    "Postman-Token: 23c204e3-b0b3-434a-81b9-a1a3151f0348",
    "cache-control: no-cache",
    "session: ".$this->token()
  ),
));
			$response = curl_exec($curl);
			$err = curl_error($curl);
			$result = json_decode($response, TRUE);
			
			curl_close($curl);
			if ($err) {
			 return $err;
			//  $this->response($err, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
			} else {
				return $result;
				//$this->response($result, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
			   
			}
		}else{
			$this->response('error', REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
		}
	}
	public function getTrips_get(){
		if ($this->get('direct') && (int)$this->get('direct') == 0){
			$change = 1;
		}else{
			$change = 0;
		}
		
		if ($this->get('goback')){
			$goback = 1;
		}else{
			$goback = 0;
		}
		$fromID = $this->getCityIDByCityName($this->get('fromID'));
		$toID = $this->getCityIDByCityName($this->get('toID'));
		$curl = curl_init();
			curl_setopt_array($curl, array(
  CURLOPT_URL => "https://".$this->http_login.":".$this->http_password."@octobusdemo.cloud/omio/cgi-bin/gtmapp/wapi/trips?change=".$change."&currency=UAH&from=".$fromID."&to=".$toID."&goback=".$goback."&passcount=".$this->get('passengers')."&when=".date("Y-m-d", strtotime($this->get('on'))),
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "Content-Type: application/x-www-form-urlencoded",
    "Lang: ru",
    "Postman-Token: 23c204e3-b0b3-434a-81b9-a1a3151f0348",
    "cache-control: no-cache",
    "session: ".$this->token()
  ),
));
			$response = curl_exec($curl);
			$err = curl_error($curl);
			$result = json_decode($response, TRUE);
			
			curl_close($curl);
			if ($err) {
			 
			  $this->response($err, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
			} else {
				$ar = [];
				foreach($result as $key => $res){
					$ar[$key] = $res;
					if(isset($res['tripId'])) {
						$ar[$key]['trip_info'] = $this->infoTrip($res['tripId']);
						$ar[$key]['trip_stop'] = $this->stopTrip($res['tripId']);
					}
					
				
				}
				$this->response($ar, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
			   
			}
	}
	
	public function getTrips1_get(){
		if ($this->get('direct') && (int)$this->get('direct') == 0){
			$change = 1;
		}else{
			$change = 0;
		}
		
		if ($this->get('goback')){
			$goback = 1;
		}else{
			$goback = 0;
		}
		$fromID = $this->getCityIDByCityName($this->get('fromID'));
		$toID = $this->getCityIDByCityName($this->get('toID'));
		$curl = curl_init();
			curl_setopt_array($curl, array(
  CURLOPT_URL => "https://".$this->http_login.":".$this->http_password."@octobusdemo.cloud/omio/cgi-bin/gtmapp/wapi/trips?change=".$change."&currency=UAH&from=2&to=7&goback=".$goback."&passcount=".$this->get('passengers')."&when=2019-11-20",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "Content-Type: application/x-www-form-urlencoded",
    "Lang: ru",
    "Postman-Token: 23c204e3-b0b3-434a-81b9-a1a3151f0348",
    "cache-control: no-cache",
    "session: ".$this->token()
  ),
));
			$response = curl_exec($curl);
			$err = curl_error($curl);
			$result = json_decode($response, TRUE);
			
			curl_close($curl);
			if ($err) {
			 
			  $this->response($err, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
			} else {
				$this->response($result, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
			   
			}
	}
	
	private function getCityIDByCityName($cityName){
		$curl = curl_init();
			curl_setopt_array($curl, array(
			  CURLOPT_URL => "https://".$this->http_login.":".$this->http_password."@octobusdemo.cloud/omio/cgi-bin/gtmapp/wapi/routecountry",
			  CURLOPT_RETURNTRANSFER => true,
			  CURLOPT_ENCODING => "",
			  CURLOPT_MAXREDIRS => 10,
			  CURLOPT_TIMEOUT => 30,
			  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			  CURLOPT_CUSTOMREQUEST => "POST",
			 //CURLOPT_POSTFIELDS => "session=".$this->token(),
			  CURLOPT_HTTPHEADER => array(
				"session: ".$this->token(),
				"Content-Type: application/x-www-form-urlencoded",
				"Lang: ru",
				"Postman-Token: e2b88c60-a422-441c-99e7-85b470fdd8a5",
				"cache-control: no-cache"
			  ),
			));
			$response = curl_exec($curl);
			$err = curl_error($curl);
			$result = json_decode($response, TRUE);
			$cityArray = [];
			foreach ($result as $res){
				foreach ($res['cities'] as $city){
					if (!isset($cityArray[$city['idCity']])){
						$cityArray[$city['idCity']] = $city;
					}
				}
			}
			$caArray = [];
			foreach ($cityArray as $ca){
				$ca['newName'] = $ca['nameCity']."_".$ca['idCity'];
				$caArray[] = $ca;
			}
			curl_close($curl);
			
			foreach ($caArray as $ca){
				if (strtolower($ca['nameCity']) == strtolower($cityName)){
					return $ca['idCity'];
				}
			}
	}
	
	public function getCityList_get(){
		$curl = curl_init();
			curl_setopt_array($curl, array(
			  CURLOPT_URL => "https://".$this->http_login.":".$this->http_password."@octobusdemo.cloud/omio/cgi-bin/gtmapp/wapi/routecountry",
			  CURLOPT_RETURNTRANSFER => true,
			  CURLOPT_ENCODING => "",
			  CURLOPT_MAXREDIRS => 10,
			  CURLOPT_TIMEOUT => 30,
			  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			  CURLOPT_CUSTOMREQUEST => "POST",
			 //CURLOPT_POSTFIELDS => "session=".$this->token(),
			  CURLOPT_HTTPHEADER => array(
				"session: ".$this->token(),
				"Content-Type: application/x-www-form-urlencoded",
				"Lang: ru",
				"Postman-Token: e2b88c60-a422-441c-99e7-85b470fdd8a5",
				"cache-control: no-cache"
			  ),
			));
			$response = curl_exec($curl);
			$err = curl_error($curl);
			$result = json_decode($response, TRUE);
			$cityArray = [];
			foreach ($result as $res){
				foreach ($res['cities'] as $city){
					if (!isset($cityArray[$city['idCity']])){
						$cityArray[$city['idCity']] = $city;
					}
				}
			}
			$caArray = [];
			foreach ($cityArray as $ca){
				$ca['newName'] = $ca['nameCity']."_".$ca['idCity'];
				$caArray[] = $ca;
			}
			curl_close($curl);
			if ($err) {
			 
			  $this->response($err, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
			} else {
				$this->response($caArray, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
			   
			}
	}

	public function getToken_get(){
		if ( !$this->cache->get('token')){
			$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://".$this->http_login.":".$this->http_password."@octobusdemo.cloud/omio/cgi-bin/gtmapp/wapi/login",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "login=".$this->login."&password=".$this->password,
  CURLOPT_HTTPHEADER => array(
    "Content-Type: application/x-www-form-urlencoded",
    "Postman-Token: e2b88c60-a422-441c-99e7-85b470fdd8a5",
    "cache-control: no-cache"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);
$result = json_decode($response, TRUE);
curl_close($curl);
if ($err) {
 
  $this->response($err, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
} else {
	$this->cache->file->save('token', $result['token'], 3*60*60);
   
}
		}
		$this->response($this->cache->file->get('token'), REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
	}
	
	//return $this->cache->get('token');
	
    

}
