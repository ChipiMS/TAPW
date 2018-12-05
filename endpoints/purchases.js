module.exports = function(app, connection){
	app.get("/api/cart", function(req, res){
		var idCart = req.query.idCart;
		connection.query("SELECT * from Cart where idCart = "+idCart, function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.get("/api/cart-items", function(req, res){
		var idCart = req.query.idCart;
		connection.query("SELECT * from CartItem where idCart = "+idCart, function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.get("/api/purchases", function(req, res){
		connection.query("SELECT c.total subtotal, p.*, pr.*, pv.name provider, ca.name category, i.quantity, c.idCart, pm.name paymentMethod "
			+"from Cart c "
			+"inner join CartItem i on c.idCart = i.idCart "
			+"inner join Product pr on pr.idProduct = i.idProduct "
			+"inner join Category ca on ca.idCategory = pr.idCategory "
			+"inner join Provider pv on pv.idProvider = pr.idProvider "
			+"left join Purchase p on c.idCart = p.idCart "
			+"left join PaymentMethod pm on pm.idPaymentMethod = p.idPaymentMethod ", function(err, rows, fields){
				var response = {pending: [], completed: []}, pending = {}, completed = {}, i, row;
				if(err){
					throw err;
				}
				for(i = 0; i < rows.length; i++){
					row = rows[i];
					if(row.idPaymentMethod === null){
						if(!pending[row.idCart]){
							pending[row.idCart] = {idCart: row.idCart, total: row.subtotal, items: []};
							if(row.name !== null){
								pending[row.idCart].items.push({name: row.name, category: row.category, idCategory: row.idCategory, provider: row.provider, idProvider: row.idProvider, price: row.price, provider: row.provider, quantity: row.quantity, idProduct: row.idProduct});
							}
						}
						else{
							if(row.name !== null){
								pending[row.idCart].items.push({name: row.name, category: row.category, idCategory: row.idCategory, provider: row.provider, idProvider: row.idProvider, price: row.price, provider: row.provider, quantity: row.quantity, idProduct: row.idProduct});
							}
						}
					}
					else{
						if(!completed[row.idCart]){
							completed[row.idCart] = {idCart: row.idCart, subtotal: row.subtotal, total: row.total, idPaymentMethod: row.idPaymentMethod, paymentMethod: row.paymentMethod, idCoupon: row.idCoupon, idPurchase: row.idPurchase, pDate: row.pDate, username: row.username, items: []};
							if(row.name !== null){
								completed[row.idCart].items.push({name: row.name, category: row.category, idCategory: row.idCategory, provider: row.provider, idProvider: row.idProvider, price: row.price, provider: row.provider, quantity: row.quantity, idProduct: row.idProduct});
							}
						}
						else{
							if(row.name !== null){
								completed[row.idCart].items.push({name: row.name, category: row.category, idCategory: row.idCategory, provider: row.provider, idProvider: row.idProvider, price: row.price, provider: row.provider, quantity: row.quantity, idProduct: row.idProduct});
							}
						}
					}
				}
				for(i in pending){
					response.pending.push(pending[i]);
				}
				for(i in completed){
					response.completed.push(completed[i]);
				}
				response.original = rows;
				res.json(response);
			});
	});

	app.get("/api/purchases/last", function(req, res){
		connection.query("SELECT * from Cart Order by idCart DESC limit 1", function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
	});

	app.post("/api/cart", function(req, res){
		var total = req.body.total;
		connection.query("insert into Cart(total) "
			+"values ('"+total+"');", function(err, rows, fields){
				if(err){
					throw err;
				}
				res.json(rows);
			});
	});

	app.post("/api/cartitem", function(req, res){
		var idCart = req.body.idCart;
		var idProduct = req.body.idProduct;
		var quantity = req.body.quantity;
		connection.query("insert into CartItem(idCart,idProduct,quantity) "
			+"values ('"+idCart+"','"+idProduct+"','"+quantity+"');", function(err, rows, fields){
				if(err){
					throw err;
				}
				res.json(rows);
			});
	});

	app.post("/api/purchase", function(req, res){
		var pDate = (new Date().getFullYear())+"-"+(new Date().getMonth()+1)+"-"+(new Date().getDate());
		var total = req.body.total;
		var username = req.body.username;
		var idPaymentMethod = req.body.idPaymentMethod;
		var idCoupon = req.body.idCoupon;
		var idCart = req.body.idCart;
		connection.query("insert into Purchase(pDate,total,username,idPaymentMethod,idCoupon,idCart) "
			+"values ('"+pDate+"','"+total+"','"+username+"','"+idPaymentMethod+"','"+idCoupon+"','"+idCart+"');", function(err, rows, fields){
				if(err){
					throw err;
				}
				res.json(rows);
			});
	});


	app.get("/api/purchases/totals", function(req, res){
		var byYear = req.query.byYear;
		var byMonth = req.query.byMonth;
		var byWeek = req.query.byWeek;
		var client = req.query.client;
		connection.query("SELECT * from Purchase p "
			+"inner join Coupon c on c.idCoupon = p.idCoupon"+(client ? " where username = '"+client+"'" : ""), function(err, rows, fields){
				var response = [
				{
					values: [],
					key: 'Subtotal',
					color: '#15BA9E',
					area: true
				},
				{
					values: [],
					key: 'Descuentos',
					color: '#FF7081',
					area: true
				},
				{
					values: [],
					key: 'Total',
					color: '#666E7B'
				}
				], i, key, row, periods = {}, firstPeriod, lastPeriod, monday, idx;
				if(err){
					throw err;
				}
				for(i = 0; i < rows.length; i++){
					row = rows[i];
					if(byWeek){
						monday = new Date(row.pDate.getFullYear(), row.pDate.getMonth(), row.pDate.getDate()-row.pDate.getDay());
						key = monday.getFullYear()+("0"+(monday.getMonth()+1)).slice(-2)+("0"+monday.getDate()).slice(-2);
					}
					else if(byMonth){
						key = row.pDate.getFullYear()+("0"+(row.pDate.getMonth()+1)).slice(-2);
					}
					else{
						key = row.pDate.getFullYear();
					}
					if(periods[key]){
						periods[key].discount -= row.amount;
						periods[key].total += row.total;
						periods[key].subtotal = periods[key].total+periods[key].discount;
					}
					else{
						periods[key] = {
							total: row.total,
							discount: -row.amount,
							subtotal: row.total-row.amount
						};
					}
				}

				for(i in periods){
					if(!firstPeriod){
						firstPeriod = i;
					}
					lastPeriod = i;
				}

				if(firstPeriod){
					if(byWeek){
						firstPeriod = new Date(parseInt(firstPeriod.slice(0, 4)), parseInt(firstPeriod.slice(4, 6))-1, parseInt(firstPeriod.slice(6, 8)));
						lastPeriod = new Date(parseInt(lastPeriod.slice(0, 4)), parseInt(lastPeriod.slice(4, 6))-1, parseInt(lastPeriod.slice(6, 8)));
						for(i = firstPeriod, idx = 0; i.getTime() <= lastPeriod.getTime(); i.setDate(i.getDate()+7), idx++){
							key = i.getFullYear()+("0"+(i.getMonth()+1)).slice(-2)+("0"+i.getDate()).slice(-2);
							if(periods[key]){
								response[0].values.push({x: idx, key: key, y: periods[key].subtotal});
								response[1].values.push({x: idx, key: key, y: periods[key].discount});
								response[2].values.push({x: idx, key: key, y: periods[key].total});
							}
							else{
								response[0].values.push({x: idx, key: key, y: 0});
								response[1].values.push({x: idx, key: key, y: 0});
								response[2].values.push({x: idx, key: key, y: 0});
							}
						}
					}
					else if(byMonth){
						firstPeriod = new Date(parseInt(firstPeriod.slice(0, 4)), parseInt(firstPeriod.slice(4, 6))-1, 1);
						lastPeriod = new Date(parseInt(lastPeriod.slice(0, 4)), parseInt(lastPeriod.slice(4, 6))-1, 1);
						for(i = firstPeriod, idx = 0; i.getTime() <= lastPeriod.getTime(); i.setMonth(i.getMonth()+1), idx++){
							key = i.getFullYear()+("0"+(i.getMonth()+1)).slice(-2);
							if(periods[key]){
								response[0].values.push({x: idx, key: key, y: periods[key].subtotal});
								response[1].values.push({x: idx, key: key, y: periods[key].discount});
								response[2].values.push({x: idx, key: key, y: periods[key].total});
							}
							else{
								response[0].values.push({x: idx, key: key, y: 0});
								response[1].values.push({x: idx, key: key, y: 0});
								response[2].values.push({x: idx, key: key, y: 0});
							}
						}
					}
					else{
						firstPeriod = parseInt(firstPeriod);
						lastPeriod = parseInt(lastPeriod);
						for(i = firstPeriod, idx = 0; i <= lastPeriod; i++, idx++){
							if(periods[i]){
								response[0].values.push({x: idx, key: i, y: periods[i].subtotal});
								response[1].values.push({x: idx, key: i, y: periods[i].discount});
								response[2].values.push({x: idx, key: i, y: periods[i].total});
							}
							else{
								response[0].values.push({x: idx, key: i, y: 0});
								response[1].values.push({x: idx, key: i, y: 0});
								response[2].values.push({x: idx, key: i, y: 0});
							}
						}
					}
				}
				res.json(response);
			});
	});
}