module.exports = function(app){
	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '0112',
		database: "shop"
	});

	app.get('/api/countries', function(req, res){
		connection.query('SELECT * from Country', function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});
}