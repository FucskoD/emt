var db = require('./db.js');
var express = require('express'); // Web Framework
var app = express();

app.get('/orders', function (req, res) {
   
    var request = new db.Request();
    request.query('select * from dbo.orders', function(err, recordset) {
        if(err) console.log(err);
        res.send(JSON.stringify(recordset)); // Result in JSON format
    });    
});

// Start server and listen on http://localhost:8081/
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("app listening at http://%s:%s", host, port)
});
