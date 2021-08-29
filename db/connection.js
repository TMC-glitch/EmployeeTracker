const mysql = require("mysql");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'employee_tracker'
});

connection.connect(function (err) {
    if (err) throw err
});
module.exports = connection;