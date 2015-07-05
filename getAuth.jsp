<%@ page language="Java" import="java.net.*,java.io.*,org.json.simple.*"%>
<%
try{ 
    URL url = new URL("https://login.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG9ZL0ppGP5UrAslWO7Jdgx_jtpc_92K1MWhmh77qkn1ZJ_Jxac4XlNhvYSVABRSB.3i81ELQ==&client_secret=6167355528564993607&username=crm@stummy.com&password=sfdc@12345"); 
    HttpURLConnection connection = (HttpURLConnection) url.openConnection(); 
    connection.setRequestMethod("POST");
    connection.setDoOutput(true);
    connection.connect();
    InputStreamReader isr = new InputStreamReader(connection.getInputStream()); 
    BufferedReader br = new BufferedReader(isr); 
    String htmlText = ""; 
    String nextLine = ""; 
    while ((nextLine = br.readLine()) != null){ 
	      htmlText = htmlText + nextLine; 
    } 
	Object obj=JSONValue.parse(htmlText);

    org.json.simple.JSONObject obj1 = (org.json.simple.JSONObject)obj;
	//out.println(obj1.toString());
	out.println(htmlText);
	
}catch(MalformedURLException murle){ 
    System.err.println("MalformedURLException: "+ murle.getMessage()); 
}catch(IOException ioe){ 
    System.err.println("IOException: "+ ioe.getMessage()); 
}
%>
