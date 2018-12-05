module.exports = function(app, connection){
	app.get('/api/coupon', function(req, res){
		var idCoupon = req.query.idCoupon;
		connection.query('SELECT * from Coupon where idCoupon = '+idCoupon, function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.post("/api/coupons", function(req, res){
		var amount = req.body.amount;
		connection.query("insert into Coupon(amount) "
			+"values ('"+amount+"');", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.put('/api/coupons', function(req, res){
		var amount = req.body.amount;
		var idCoupon = req.body.idCoupon;
		connection.query("update Coupon set amount='"+amount+"' "
			+"where idCoupon = '"+idCoupon+"';", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.get("/api/coupons/list", function(req, res){
		connection.query("SELECT * from Coupon", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.delete('/api/coupons', function(req, res){
		var idCoupon = req.query.idCoupon;
		connection.query("delete from Category where idCoupon = '"+idCoupon+"';", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});
}