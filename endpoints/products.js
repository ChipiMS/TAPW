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
		var productIdx, product, categories = {}, category, categoryId, response = [];
		var orderByCategory = req.query.orderByCategory;
		connection.query("SELECT p.*, pr.name provider, c.name category, c.idCategory "
			+"from Product p "
			+"inner join Category c on c.idCategory = p.idCategory "
			+"inner join Provider pr on pr.idProvider = p.idProvider;", function(err, rows, fields){
			if(err){
				throw err;
			}
			if(orderByCategory){
				for(productIdx = 0; productIdx < rows.length; productIdx++){
					product = rows[productIdx];
					if(!categories[product.idCategory]){
						categories[product.idCategory] = {
							name: product.category,
							products: []
						};
					}
					category = categories[product.idCategory];
					category.products.push(product);
				}
				for(categoryId in categories){
					response.push(categories[categoryId]);
				}
				res.json(response);
			}
			else{
				res.json(rows);
			}
		});
	});

	app.get("/api/products", function(req, res){
		var idCategory = req.query.idCategory;
		connection.query("SELECT p.*, pr.name provider from Product p inner join Provider pr on pr.idProvider = p.idProvider where p.idCategory = "+idCategory, function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.get("/api/product", function(req, res){
		var idProduct = req.query.idProduct;
		connection.query("SELECT * from Product where idProduct = "+idProduct, function(err, rows, fields){
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