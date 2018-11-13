module.exports = function(app, connection){
    app.get('/api/purchases', function(req, res){
    	connection.query('SELECT * from Purchases', function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
    });

    app.post('/api/purchases', function(req, res){
    	connection.query('SELECT * from Purchases', function(err, rows, fields){
			if(err){
				throw err;
			}
			res.json(rows);
		});
    });

    
}