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

	app.get('/api/countries/states', function(req, res){
		connection.query('SELECT c.*, s.name state, idState from Country c left join State s on c.idCountry = s.idCountry', function(err, rows, fields){
			var response = [], aux = {}, i;
			if(err){
				throw err;
			}
			for(i = 0; i < rows.length; i++){
				if(!aux[rows[i].idCountry]){
					aux[rows[i].idCountry] = {name: rows[i].name, idCountry: rows[i].idCountry, states: []};
					if(rows[i].state !== null){
						aux[rows[i].idCountry].states.push({name: rows[i].state, idState: rows[i].idState});
					}
				}
				else{
					if(rows[i].state !== null){
						aux[rows[i].idCountry].states.push({name: rows[i].state, idState: rows[i].idState});
					}
				}
			}
			for(i in aux){
				response.push(aux[i]);
			}
			res.json(response);
		});
	});

	app.post("/api/countries", function(req, res){
		var name = req.body.name;
		connection.query("insert into Country( name) "
			+"values ('"+name+"');", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.put('/api/countries', function(req, res){
		var name = req.body.name;
		var idCountry = req.body.idCountry;
		connection.query("update Country set name='"+name+"' "
			+"where idCountry = '"+idCountry+"';", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});
}