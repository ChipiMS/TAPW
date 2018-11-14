module.exports = function(app, connection){
	app.get("/api/categories", function(req, res){
		var idCategory = req.query.idCategory;
		connection.query("SELECT * from Category where idCategory = "+idCategory, function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.post("/api/categories", function(req, res){
		var idCategory = req.body.idCategory;
		var name = req.body.name;
		connection.query("insert into Category(idCategory, name) "
			+"values ('"+idCategory+"', '"+name+"');", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.put('/api/categories', function(req, res){
		var name = req.body.name;
		var idCategory = req.body.idCategory;
		connection.query("update Category set name='"+name+"' "
			+"where idCategory = '"+idCategory+"';", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.get("/api/categories/list", function(req, res){
		var idCategory = req.query.idCategory;
		connection.query("SELECT * from Category", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.delete('/api/categories', function(req, res){
		var idCategory = req.query.idCategory;
		connection.query("delete from Category where idCategory = '"+idCategory+"';", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});
}