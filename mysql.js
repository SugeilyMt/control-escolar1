const mysql = require('mysql2');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "midb",
    port: 3307
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "SELECT * FROM alumno";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
});