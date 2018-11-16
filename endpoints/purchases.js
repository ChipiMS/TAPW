module.exports = function(app, connection){
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

	app.get("/api/purchases/totals", function(req, res){
		var byYear = req.query.byYear;
		var byMonth = req.query.byMonth;
		var byWeek = req.query.byWeek;
		connection.query("SELECT * from Purchase p "
			+"inner join Coupon c on c.idCoupon = p.idCoupon", function(err, rows, fields){
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
			], i, key, row, periods = {}, firstPeriod, lastPeriod;
			if(err){
				throw err;
			}
			for(i = 0; i < rows.length; i++){
				row = rows[i];
				if(byWeek === 1){

				}
				else if(byMonth === 1){

				}
				else{
					key = row.pDate.getFullYear();
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
			}

			for(i in periods){
				if(!firstPeriod){
					firstPeriod = i;
				}
				lastPeriod = i;
			}

			if(byWeek === 1){

			}
			else if(byMonth === 1){

			}
			else{
				firstPeriod = parseInt(firstPeriod);
				lastPeriod = parseInt(lastPeriod);
				for(i = firstPeriod; i <= lastPeriod; i++){
					if(periods[i]){
						response[0].values.push({x: i, y: periods[i].subtotal});
						response[1].values.push({x: i, y: periods[i].discount});
						response[2].values.push({x: i, y: periods[i].total});
					}
					else{
						response[0].values.push({x: i, y: 0});
						response[1].values.push({x: i, y: 0});
						response[2].values.push({x: i, y: 0});
					}
				}
			}
			res.json(response);
		});
	});
}