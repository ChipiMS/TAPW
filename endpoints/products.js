module.exports = function(app){
	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '0112',
		database: "shop"
	});

    app.get('/api/products', function(req, res){
    	connection.query('SELECT * from Purchases', function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
    });

    app.post('/api/products', function(req, res){
    	connection.query('SELECT * from Purchases', function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
    });

    
}