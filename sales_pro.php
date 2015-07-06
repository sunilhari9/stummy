<?PHP
session_start();
class sales_pro 
{
public function  populateToken()
{
    $url="https://login.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG9ZL0ppGP5UrAslWO7Jdgx_jtpc_92K1MWhmh77qkn1ZJ_Jxac4XlNhvYSVABRSB.3i81ELQ==&client_secret=6167355528564993607&username=crm@stummy.com&password=sfdc@12345";
	
	$content = json_encode("your data to be sent");
	$curl = curl_init($url);
	curl_setopt($curl, CURLOPT_HEADER, false);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_HTTPHEADER,
	array("Content-type: application/json"));
	curl_setopt($curl, CURLOPT_POST, true);
	curl_setopt($curl, CURLOPT_POSTFIELDS, $content);
	curl_setopt ($curl, CURLOPT_SSL_VERIFYHOST, 0);
	curl_setopt ($curl, CURLOPT_SSL_VERIFYPEER, 0); 
	$json_response = curl_exec($curl);
	$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    if($status != 200 )
	{
        die("Error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
    }
    else
	{
		$response = json_decode($json_response, true);
		$instance_url=$response['instance_url'];
		$access_token=$response['access_token'];
		$_SESSION['instance_url']=$instance_url;
		$_SESSION['access_token']=$access_token;
	}
	curl_close($curl);
}

public function send_Data($relativeUrl, $json_data, $occurance)
{
//sales_pro::populateToken();
	//check whether session is set or not
 if(isset($_SESSION['instance_url']) && isset($_SESSION['access_token']) )
 {
	$instance_url=$_SESSION['instance_url'];
	$access_token=$_SESSION['access_token'];
 }

 if(!isset($instance_url) || !isset($access_token) )
  {
	//echo "instance url or access token are not defined.";
	  if($occurance==1)
		{
			sales_pro::populateToken();
		//	echo "populate token is called.";
			sales_pro::send_Data($relativeUrl, $json_data, $occurance1);
		}
  }
  else
  {
  //echo "now token found";
	$url_instance=$instance_url.$relativeUrl;
	//echo $url_instance;
	$ch = curl_init($url_instance);                                                                    
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST"); 
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);                                                                  
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
	$header = array(                                                                          
	'Content-Type: application/json',                                                                                
	'Content-Length: ' . strlen($json_data),
	'Authorization: OAuth ' . $access_token); 
	//echo "<pre>";print_r($header);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $header);                                                                                                                 
	$output = curl_exec($ch);
	curl_close($ch);
	/*$out = json_decode($output);
	if(isset($out['status']) && $out['status']==1){
		return true;
	}else{
		return false;
	}*/
	return $output;
	}
}
public  function save_user_property($relative_url, $content)
{
  // $content=array();
	$json_data = json_encode($content);
	//echo '<pre>';print_r($json_data);exit;
	//$relative_url = '/services/apexrest/Products/GetProductswithLineItems';
	$output=sales_pro::send_Data($relative_url, $json_data, 1);
	//echo $output;
	//die;
	print_r($output);exit;
	unset($_SESSION['instance_url']);
	unset($_SESSION['access_token']);
  }
} 