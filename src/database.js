const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('SE HA CERRADO LA CONEXIÓN CON LA BASE DE DATOS');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('LA BASE DE DATOS TIENE DEMASIADAS CONEXIONES');
        }
        if(err.code === 'ECONNREFUSED'){
            console.log("LA CONEXION A LA BASE DE DATOS HA SIDO RECHAZADA");
        }
    }

    if(connection) connection.release();
    console.log('La base de datos está conectada');
    return;
});

//Convertir callbacks en promesas
pool.query = promisify(pool.query);

module.exports = pool;