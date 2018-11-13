module.exports = function(app, connection){
	app.get("/api/states", function(req, res){
		var idCountry = req.query.idCountry;
		connection.query("SELECT * from State where idCountry = "+idCountry, function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.post("/api/states", function(req, res){
		var idCountry = req.body.idCountry;
		var name = req.body.name;
		connection.query("insert into State(idCountry, name) "
			+"values ('"+idCountry+"', '"+name+"');", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.put('/api/states', function(req, res){
		var name = req.body.name;
		var idState = req.body.idState;
		connection.query("update State set name='"+name+"' "
			+"where idState = '"+idState+"';", function(err, rows, fields){
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