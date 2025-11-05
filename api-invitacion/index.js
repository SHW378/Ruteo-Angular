const express = require('express');
const cors = require('cors');
const connection = require('./db');
const app = express();
const PORT = 3000;
 
 
//
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
//Registramos los endpoints necesarios
app.post('/saveConfirmacion', (req, res) => {
    const {nombre,acompanantes,confirma, mensaje} = req.body;
    const sql = `INSERT INTO confirmaciones (nombre, acompanantes, confirma, mensaje) values(?,?,?,?)`;
    connection.query(sql, [nombre, acompanantes, confirma, mensaje], (err, results) => {
        if(err) {
            return res.status(500).json({ mensaje: 'Error al insertar datos'});
        }
        console.log('Datos registrados de manera correcta')
        res.status(201).json({ mensaje: 'Registro exitoso', idGenerado: results.insertId});
    });
    });
app.listen(PORT, () => {
    console.log(`Servidor ejecutado en http://localhost:${PORT}`)
})
 
module.exports = connection;
 