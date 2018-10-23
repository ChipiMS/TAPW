const express = require('express');
const app = express();

app.get('*', function(req, res){
	var splittedRoute = req.url.split("."), extension = splittedRoute[splittedRoute.length-1];
	if(extension === "js" || extension === "css" || extension === "html" || extension === "svg"){
		res.sendfile("."+req.url);
	}
	else{
		res.sendfile('./index.html');
	}
});

app.listen(3000, () => console.log('App listening on port 3000!'));