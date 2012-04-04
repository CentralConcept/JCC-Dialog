#dynamic jQueryUI dialog

##Usage:

* javascript:
<pre>
$(document).ready(function(){
	$('.dialog').open_dialog({
		href        : '',
		method		: 'link',
		dataType	: 'script',
		response	: '',
		ajaxtype	: 'GET',
		dialogtitle : 'title',
		dialogtext  : 'text',
		dialogclass : 'message error',
		dialogheight: 220,
		dialogwidth : 400,
		dialogid    : 'dialog',
		messageid   : 'dialogchange',
		modal       : true
	});
})
</pre>
* * method
choose if you just want to follow a link ('link') or to fire a ajax ('ajax') request
* * dataType (taken von api.jquery.com):
The type of data that you're expecting back from the server. If none is specified, jQuery will try to infer it based on the MIME type of the response (an XML MIME type will yield XML, in 1.4 JSON will yield a JavaScript object, in 1.4 script will execute the script, and anything else will be returned as a string). The available types (and the result passed as the first argument to your success callback) are:
"xml": Returns a XML document that can be processed via jQuery.
"html": Returns HTML as plain text; included script tags are evaluated when inserted in the DOM.
"script": Evaluates the response as JavaScript and returns it as plain text. Disables caching by appending a query string parameter, "_=[TIMESTAMP]", to the URL unless the cache option is set to true. Note: This will turn POSTs into GETs for remote-domain requests.
"json": Evaluates the response as JSON and returns a JavaScript object. In jQuery 1.4 the JSON data is parsed in a strict manner; any malformed JSON is rejected and a parse error is thrown. (See json.org for more information on proper JSON formatting.)
"jsonp": Loads in a JSON block using JSONP. Adds an extra "?callback=?" to the end of your URL to specify the callback. Disables caching by appending a query string parameter, "_=[TIMESTAMP]", to the URL unless the cache option is set to true.
"text": A plain text string.
* * resonse
If you want to show a message after the ajax dialog request is completed. if you have jGrowl it will be used


* HTML:
	`<a href="dialog.html" class="dialog" rel="dialog text" title="dialog title">opendialog</a>`