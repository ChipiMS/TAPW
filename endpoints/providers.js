module.exports = function(app, connection){
	app.get("/api/providers", function(req, res){
		var idProvider = req.query.idProvider;
		res.json(idProvider);
		connection.query("SELECT * from Provider where idProvider = "+idProvider, function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.post("/api/providers", function(req, res){
		var idProvider = req.body.idProvider;
		var name = req.body.name;
		connection.query("insert into Provider(idProvider, name) "
			+"values ('"+idProvider+"', '"+name+"');", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.put('/api/providers', function(req, res){
		var name = req.body.name;
		var idProvider = req.body.idProvider;
		connection.query("update Provider set name='"+name+"' "
			+"where idProvider = '"+idProvider+"';", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.get("/api/providers/list", function(req, res){
		var idProvider = req.query.idProvider;
		connection.query("SELECT * from Provider", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});
}