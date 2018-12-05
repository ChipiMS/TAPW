module.exports = function(app, connection){
	app.delete('/api/clients', function(req, res){
		var username = req.query.username;
		connection.query("delete from Customer where username = '"+username+"';", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.get("/api/clients/list", function(req, res){
		connection.query("SELECT cu.*, s.name state, s.idCountry, co.name country "
			+"from Customer cu "
			+"inner join State s on s.idState = cu.idState "
			+"inner join Country co on s.idCountry = co.idCountry;", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.get("/api/client", function(req, res){
		var username = req.query.username;
		connection.query("SELECT * from Customer where username='"+username+"' limit 1;", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.post('/api/client', function(req, res){
		var username = req.body.username;
		var password = req.body.password;
		//var dCreate = req.body.dCreate;
		var dCreate = (new Date().getFullYear())+"-"+(new Date().getMonth()+1)+"-"+(new Date().getDate());
		var name = req.body.name;
		var lastName = req.body.lastName;
		var email = req.body.email;
		var phone = req.body.phone;
		var street = req.body.street;
		var city = req.body.city;
		var postalCode = req.body.postalCode;
		var idState = req.body.idState;
		connection.query("insert into Customer(username, password, dCreate, name, lastName, email, phone, street, city, postalCode, idState) "
			+"values ('"+username+"', '"+password+"', '"+dCreate+"', '"+name+"', '"+lastName+"', '"+email+"', '"+phone+"', '"+street+"', '"+city+"', '"+postalCode+"', "+idState+");", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.put('/api/clients', function(req, res){
		var username = req.body.username;
		//var password = req.body.password;
		//var dCreate = req.body.dCreate;
		var name = req.body.name;
		var lastName = req.body.lastName;
		var email = req.body.email;
		var phone = req.body.phone;
		var street = req.body.street;
		var city = req.body.city;
		var postalCode = req.body.postalCode;
		var idState = req.body.idState;
		connection.query("update Customer set name='"+name+"', lastName='"+lastName+"', email='"+email+"', phone='"+phone+"', street='"+street+"', city='"+city+"', postalCode='"+postalCode+"', idState='"+idState+"' "
			+"where username = '"+username+"';", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	
}