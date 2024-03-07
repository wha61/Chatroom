const mysql = require("mysql2")

const connectionPool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "123456",
  database: "chat_app",
  connectionLimit: 5
})

connectionPool.getConnection((error, connection) => {
  if (error) {
    console.error("Error connecting to database:", error)
  } else {
    console.log("Mysql Connection Successful")
  }
})

const connection = connectionPool.promise()

module.exports = connection
