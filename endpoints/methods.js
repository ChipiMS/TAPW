module.exports = function(app, connection){
	app.get('/api/methods', function(req, res){
		connection.query('SELECT * from PaymentMethod', function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.post("/api/methods", function(req, res){
		var amount = req.body.amount;
		connection.query("insert into PaymentMethod(amount) "
			+"values ('"+amount+"');", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.put('/api/methods', function(req, res){
		var amount = req.body.amount;
		var idPaymentMethod = req.body.idPaymentMethod;
		connection.query("update PaymentMethod set amount='"+amount+"' "
			+"where idPaymentMethod = '"+idPaymentMethod+"';", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.get("/api/methods/list", function(req, res){
		connection.query("SELECT * from PaymentMethod", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});
}