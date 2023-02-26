const dbConfig = require("../config/db.config.js");
const mysql = require('mysql2');

const queryTableExample = 
    `CREATE TABLE IF NOT EXISTS example (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_stylistic_device INT NOT NULL,
    text VARCHAR(255),
    author VARCHAR(255))ENGINE=INNODB;`;

const queryTableStylisticDevice = 
    `CREATE TABLE IF NOT EXISTS stylisticdevice (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(1000))ENGINE=INNODB;`;
    

db =  mysql.createConnection(dbConfig);
    db.connect(function(err) {
        if (err) throw err;
        console.log('connected')
      });
    
    
db.query(queryTableExample, function (err, result) {
        if (err) throw err;
        console.log('example table created');
    });  


db.query(queryTableStylisticDevice, function (err, result) {
        if (err) throw err;
        console.log('stylisticdevice table created');
    });  

db.end();

module.exports = db;
