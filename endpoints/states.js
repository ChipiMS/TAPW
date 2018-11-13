module.exports = function(app){
	var mysql = require("mysql");
	var connection = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "0112",
		database: "shop"
	});

	app.get("/api/states", function(req, res){
		var idCountry = req.query.idCountry;
		connection.query("SELECT * from State where idCountry = "+idCountry, function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.get("/api/states/list", function(req, res){
		var idCountry = req.query.idCountry;
		connection.query("SELECT * from State", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});
}