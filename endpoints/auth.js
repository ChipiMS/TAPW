module.exports = function(app){
	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '0112',
		database: "shop"
	});

	app.post('/api/auth/login', function(req, res){
		var username = req.body.username, password = req.body.password;
		connection.query("SELECT * from Customer where username = '"+username+"' and password = '"+password+"';", function(err, rows, fields){
			if(err){
				throw err;
			}
			if(rows.length === 0){
				res.json({user: null});
			}
			else{
				res.json({user: rows[0]});
			}
		});
	});
}