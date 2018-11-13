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
}