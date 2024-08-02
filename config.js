var mysql = require("mysql");

var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "travels_services",
      multipleStatements: true
});

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "travels_services",
    multipleStatements: true
})

con.connect(function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log("database Connected")
    }
})

module.exports = {
    executeQuery : function(query, callback) {
        pool.getConnection(function(err, connection) {
            if(err) {
                connection.release;
                console.log("Error connecting" + err);
                return;
            } else {
                connection.query(query, function(err, rows) {
                    connection.release();
                    if(!!err) console.log("Error executing " + err);
                    else {
                        console.log("Query Executed");
                        callback(null, rows);
                    }
                });
                connection.on("error", function(err) {
                    console.log("Error on " + err);
                });
            }
        });
    },
};