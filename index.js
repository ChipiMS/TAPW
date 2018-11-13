var express = require("express");
var bodyParser = require("body-parser");
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '0112',
	database: "shop"
});
var app = express();
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
███████╗███╗   ██╗██████╗ ██████╗  ██████╗ ██╗███╗   ██╗████████╗███████╗
██╔════╝████╗  ██║██╔══██╗██╔══██╗██╔═══██╗██║████╗  ██║╚══██╔══╝██╔════╝
█████╗  ██╔██╗ ██║██║  ██║██████╔╝██║   ██║██║██╔██╗ ██║   ██║   ███████╗
██╔══╝  ██║╚██╗██║██║  ██║██╔═══╝ ██║   ██║██║██║╚██╗██║   ██║   ╚════██║
███████╗██║ ╚████║██████╔╝██║     ╚██████╔╝██║██║ ╚████║   ██║   ███████║
╚══════╝╚═╝  ╚═══╝╚═════╝ ╚═╝      ╚═════╝ ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝*/
require('./endpoints/auth')(app, connection);
require('./endpoints/clients')(app, connection);
require('./endpoints/countries')(app, connection);
require('./endpoints/products')(app, connection);
require('./endpoints/purchases')(app, connection);
require('./endpoints/states')(app, connection);

/*
███████╗██╗██╗     ███████╗    ████████╗██╗   ██╗██████╗ ███████╗███████╗
██╔════╝██║██║     ██╔════╝    ╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔════╝
█████╗  ██║██║     █████╗         ██║    ╚████╔╝ ██████╔╝█████╗  ███████╗
██╔══╝  ██║██║     ██╔══╝         ██║     ╚██╔╝  ██╔═══╝ ██╔══╝  ╚════██║
██║     ██║███████╗███████╗       ██║      ██║   ██║     ███████╗███████║
╚═╝     ╚═╝╚══════╝╚══════╝       ╚═╝      ╚═╝   ╚═╝     ╚══════╝╚══════╝*/
app.get('*', function(req, res){
	var splittedRoute = req.url.split("?")[0].split("."), extension = splittedRoute[splittedRoute.length-1];
	if(extension === "js" || extension === "css" || extension === "html" || extension === "svg" || extension === "woff" || extension === "woff2" || extension === "ttf" || extension === "ico"){
		res.sendfile("."+req.url.split("?")[0]);
	}
	else{
		res.sendfile('./index.html');
	}
});

app.listen(3000, () => console.log('App listening on port 3000!'));