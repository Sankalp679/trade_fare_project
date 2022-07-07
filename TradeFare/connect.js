function start() {
    var mysql = require('mysql');

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Surabhi@2021",
        database: "tradefarefinal"
    });

    con.connect();
    return con;
}

module.exports = {
    start: start
}