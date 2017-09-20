var sql = require('mssql'); // MS Sql Server client

// Connection string parameters.
var sqlConfig = {
    user: 'appConnect',
    password: 'Turmix90',
    server: 'jdbc:sqlserver://192.168.43.59',
    database: 'eve'
};

var connection = sql.connect(sqlConfig, function (err) {
    if (err)
        throw err; 
});

module.exports = connection;