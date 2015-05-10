$('#myModal').on('shown.bs.modal', function () {
  $('#username').focus()
});
//Facebook starts here
function FbClick() {
		FB.login(function(response) {
			if (response.authResponse) {
				console.log('Welcome!  Fetching your information.... ');
				FB.api('/me?fields=name,email', function(response) {
					$('#fbDetails').html("Name:"+response.email);
					console.log('Good to see you111111, ' + response.name + '.');
					console.log('Good to see you222222, ' + response.email + '.');
				});
				FB.api('/me/picture', function(response) {
					console.log(response);
					$('#fbDetails').append('\<br/>Photo:<img id="theImg" src="'+response.data.url+'" />');
					
				});
			} else {
				console.log('User cancelled login or did not fully authorize.');
			}
		});
	}
window.fbAsyncInit = function() {
  FB.init({
    appId      : '794671257313774',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.3' // use version 2.2
  });
};
(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) return;
js = d.createElement(s); js.id = id;
js.src = "https://connect.facebook.net/en_US/sdk.js";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
 
 
 //Google Code here
 
  var clientId = '329751334451-i3pefpbhvrrq902pj8ghgem6t4g17ejg.apps.googleusercontent.com';

      // Enter the API key from the Google Develoepr Console - to handle any unauthenticated
      // requests in the code.
      // The provided key works for this sample only when run from
      // https://google-api-javascript-client.googlecode.com/hg/samples/authSample.html
      // To use in your own application, replace this API key with your own.
      var apiKey = 'AIzaSyBMbYNFQ1X9pvPsujGAjTk4aava5KuwCfU';

      // To enter one or more authentication scopes, refer to the documentation for the API.
      var scopes = 'https://www.googleapis.com/auth/plus.me';

      // Use a button to handle authentication the first time.
      function handleClientLoad() {
        gapi.client.setApiKey(apiKey);
      }

      function handleAuthResult(authResult) {
		makeApiCall();
      }

      function handleAuthClick(event) {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
        return false;
      }

      // Load the API and make an API call.  Display the results on the screen.
      function makeApiCall() {
	  
        gapi.client.load('plus', 'v1', function() {
          var request = gapi.client.plus.people.get({
            'userId': 'me',
			   'collection': 'visible'

          });
          request.execute(function(resp) {
		  console.log(resp);
            var heading = document.createElement('h4');
            var image = document.createElement('img');
            image.src = resp.image.url;
            heading.appendChild(image);
            heading.appendChild(document.createTextNode(resp.displayName));
			$('#googleDetails').html("Name:"+resp.emails[0].value);
			$('#googleDetails').append('\<br/>Photo:<img id="theImg" src="'+resp.image.url+'" />');
            //document.getElementById('content').appendChild(heading);
			console.log(resp.emails[0].value);
          });
        });
      }