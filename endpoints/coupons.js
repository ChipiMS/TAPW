module.exports = function(app, connection){
	app.get('/api/coupons', function(req, res){
		connection.query('SELECT * from Coupon', function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.post("/api/coupons", function(req, res){
		var name = req.body.name;
		connection.query("insert into Coupon( name) "
			+"values ('"+name+"');", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.put('/api/coupons', function(req, res){
		var name = req.body.name;
		var idCoupon = req.body.idCoupon;
		connection.query("update Coupon set name='"+name+"' "
			+"where idCoupon = '"+idCoupon+"';", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});
}