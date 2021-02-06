var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    multipleStatements: true
});

exports.initializeDatabase = () => {
    console.log("Database Connected!")
    connection.connect()
}

exports.endConnection = () => {
    connection.end()
}

exports.runQuery = (query, data) => {
    return new Promise(resolve => {
        connection.query(query, data, (error, result, fields)=> {
            if (error) throw error;
            resolve(result)
        })
    })
}

exports.connection = connection
