<%@ page language="Java" import="java.net.*,java.io.*,org.json.simple.*,org.apache.commons.codec.binary.Base64"%>
<%
try{ 
    //URL url = new URL("https://login.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG9ZL0ppGP5UrAslWO7Jdgx_jtpc_92K1MWhmh77qkn1ZJ_Jxac4XlNhvYSVABRSB.3i81ELQ==&client_secret=6167355528564993607&username=crm@stummy.com&password=sfdc@12345"); 
    URL url = new URL("https://ap2.salesforce.com/services/apexrest/Products/GetProducts"); 
    HttpURLConnection connection = (HttpURLConnection) url.openConnection(); 
    connection.setRequestMethod("POST");
	//connection.setRequestProperty("Content-Type", "application/json");
	String authString = "00D28000000UX6r!ARgAQGMueI9vZwiX2jNnEmpeSrOrMAASn3fQNDRCcROXvD3Xn9xpSKoHJfnlZ7mIdwe2HV3psD1dVwpkzPOoFuVf5jxwRkx8";
			System.out.println("auth string: " + authString);
			byte[] authEncBytes = Base64.encodeBase64(authString.getBytes());
			String authStringEnc = new String(authEncBytes);
			System.out.println("Base64 encoded auth string: " + authStringEnc);
	//connection.setRequestProperty("Authorization","OAuth "+authStringEnc);
	    String credentials = "OAuth " + authString;
	connection.setRequestProperty("Authorization", new String(Base64.encodeBase64(authString.getBytes())));
    connection.setDoOutput(true);
    connection.connect();
    InputStreamReader isr = new InputStreamReader(connection.getInputStream()); 
    BufferedReader br = new BufferedReader(isr); 
    String htmlText = ""; 
    String nextLine = ""; 
    while ((nextLine = br.readLine()) != null){ 
	      htmlText = htmlText + nextLine; 
    } 
	if(br != null)br.close();
	if(isr != null)isr.close();
	Object obj=JSONValue.parse(htmlText);

    org.json.simple.JSONObject obj1 = (org.json.simple.JSONObject)obj;
	//out.println(obj1.toString());
	
	/*
	url = new URL("https://ap2.salesforce.com/services/apexrest/Products/GetProducts"); 
    HttpURLConnection connection1 = (HttpURLConnection) url.openConnection(); 
	//connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
	connection1.setRequestProperty("Authorization","OAuth 00D28000000UX6r!ARgAQKjxWQcvhVI3tg3uMjLs9gYOMFVk8tBhN4gQHjHJb4yEPe9M93JVTq1v_pDmC3CbtfMKihKDVPaWCEUwTeTcsl81g5lD");
    connection1.setRequestMethod("GET");
    connection1.setDoOutput(true);
    connection1.connect();
	isr = new InputStreamReader(connection1.getInputStream()); 
    br = new BufferedReader(isr); 
    htmlText = "";nextLine = ""; 
    while ((nextLine = br.readLine()) != null){ 
	      htmlText = htmlText + nextLine; 
    } */
	out.println(htmlText);
}catch(MalformedURLException murle){ 
    System.err.println("MalformedURLException: "+ murle.getMessage()); 
}catch(IOException ioe){ 
    System.err.println("IOException: "+ ioe.getMessage()); 
}
%>
