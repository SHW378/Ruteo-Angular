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
    console.log('Datos recibidos:', { nombre, acompanantes, confirma, mensaje });
    
    // Convertir el "si"/"no" a boolean
    const confirmaBoolean = confirma === 'si' ? true : false;
    
    const sql = `INSERT INTO confirmacion (nombre, acompanantes, confirma, mensaje) values(?,?,?,?)`;
    connection.query(sql, [nombre, acompanantes, confirmaBoolean, mensaje], (err, results) => {
        if(err) {
            console.error('Error en MySQL:', err);
            return res.status(500).json({ 
                mensaje: 'Error al insertar datos',
                error: err.message 
            });
        }
        console.log('Datos registrados de manera correcta:', results);
        res.status(201).json({ mensaje: 'Registro exitoso', idGenerado: results.insertId});
    });
});
app.listen(PORT, () => {
    console.log(`Servidor ejecutado en http://localhost:${PORT}`)
});
 