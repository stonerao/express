/* config */
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '47.98.160.248',
    user: 'express',
    password: 'Raoyan19940529',
    database: "express"
});
connection.connect();
module.exports = async (SQL, fun) => {
    connection.query(SQL, (err, rows, fields) => {
        if (err) throw err;
        fun(rows) 
    });
}