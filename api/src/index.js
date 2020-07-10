const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
    host: 'banco',
    user: 'root',
    password: 'ramonrrp',
    database: 'programadorabordo'
});

connection.connect();
app.get('/products', function(req, res){
    connection.query('SELECT * FROM products', function (error, results){
        if (error){
            throw error
        };
        res.send(results.map(item => ({ name: item.name, price: item.price }
            )));
        
    });
});


app.listen(9001, '0.0.0.0', function(){
   console.log('ouvindo na porta 9001');
})