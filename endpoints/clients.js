module.exports = function(app){
	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '0112',
		database: "shop"
	});

    app.get('/api/clients', function(req, res){
    	connection.query('SELECT cu.username username, cu.password password, cu.name name, cu.apellidos apellidos, cu.company company, cu.email email, cu.phone phone, a.street street, a.pc pc, a.city city, a.state state, co.name country, co.idCountry, a.idAddress from Customers cu '+
    		'inner join Countries co on cu.idCountry = co.idCountry '+
    		'inner join Addresses a on cu.idAddress = a.idAddress', function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
    });

    app.post('/api/clients', function(req, res){
    	var user_id = req.param('id');
    	connection.query('SELECT * from Purchases', function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
    });

    
}