/* config */
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: "test"
});
module.exports = async (SQL, fun) => {
    connection.query(SQL, (err, rows, fields) => {
        if (err) throw err;
        fun(rows)
    });
}