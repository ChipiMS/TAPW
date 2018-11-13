module.exports = function(app, connection){
	app.delete('/api/products', function(req, res){
		var idProduct = req.query.idProduct;
		connection.query("delete from Product where idProduct = '"+idProduct+"';", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.get("/api/products/list", function(req, res){
		connection.query("SELECT p.*, pr.name provider, c.name category "
			+"from Product p "
			+"inner join Category c on c.idCategory = p.idCategory "
			+"inner join Provider pr on pr.idProvider = p.idProvider;", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.post('/api/products', function(req, res){
		var name = req.body.name;
		var price = req.body.price;
		var idCategory = req.body.idCategory;
		var idProvider = req.body.idProvider;
		connection.query("insert into Product(name, price, idCategory, idProvider) "
			+"values ('"+name+"', "+price+", "+idCategory+", "+idProvider+");", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.put('/api/products', function(req, res){
		var idProduct = req.body.idProduct;
		var name = req.body.name;
		var price = req.body.price;
		var idCategory = req.body.idCategory;
		var idProvider = req.body.idProvider;
		connection.query("update Product set name='"+name+"', price='"+price+"', idCategory='"+idCategory+"', idProvider='"+idProvider+"' "
			+"where idProduct = '"+idProduct+"';", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});   
}