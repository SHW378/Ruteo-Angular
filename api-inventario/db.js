const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mcesar_sql1705',
    database: 'inventario_db'
});

connection.connect((err) => {
    if(err) {
        console.log('Error conectado a mysql: ', err);
    }
    else {  
        console.log('Conectado exitosamente a mysql');
    }
});

module.exports = connection;