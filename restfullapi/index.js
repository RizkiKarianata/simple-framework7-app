const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const path = require('path');
const password_hash = require('password-hash');

const date = require('date-and-time');

// const dateFormat = require('dateformat');
// console.log(dateFormat(new Date(), "ddd mmm dd yyyy HH:MM:ss UTC" ));
const now = new Date();
date.format(now, 'YYYY/MM/DD');

var cors = require('cors');
 
// parse application/json
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
 
app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"*, Origin, X-Requested-With, Content-Type, Accept"
		);
	res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Expose-Headers', '*, Authorization');  
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader("Content-Type", "application/json");
	next();
});

//create database connection
const conn = mysql.createConnection({
	  host: 'localhost',
	  user: 'root',
	  password: '',
	  database: 'db_crud'
});
 
//connect to database
conn.connect((err) =>{
	  if(err) throw err;
	  console.log('Mysql Connected...');
});

var cek = new Date();
var datestring = cek.getFullYear() + "-" + ("0" + (cek.getMonth()+1)).slice(-2) + "-" + 
("0" + cek.getDate()).slice(-2) + " " + ("0" + cek.getHours()).slice(-2) + ":" + 
("0" + cek.getMinutes()).slice(-2) + ":" + ("0" + cek.getSeconds()).slice(-2);

app.get('/api/crud',(req, res) => {
	  let sql = "SELECT * FROM tb_crud ORDER BY nama ASC";
	  let query = conn.query(sql, (err, results) => {
		    if(err) throw err;
		    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	  });
});
 
app.get('/api/crud/:id',(req, res) => {
	  let sql = "SELECT * FROM tb_crud WHERE id = "+req.params.id;
	  let query = conn.query(sql, (err, results) => {
		    if(err) throw err;
		    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	  });
});
 
app.post('/api/crud',(req, res) => {
	  let data = {nama: req.body.nama, tempat_lahir: req.body.tempat_lahir, tanggal_lahir: req.body.tanggal_lahir, 
		jenis_kelamin: req.body.jenis_kelamin, alamat: req.body.alamat, agama: req.body.agama, 
		created: datestring, modified: datestring};
		  let sql = "INSERT INTO tb_crud SET ?";
		  let query = conn.query(sql, data,(err, results) => {
			    if(err) throw err;
			    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
		  });
	});
 
app.put('/api/crud/:id',(req, res) => {
	  let sql = "UPDATE tb_crud SET nama='"+req.body.nama+"', tempat_lahir='"+req.body.tempat_lahir+
	"', tanggal_lahir='"+req.body.tanggal_lahir+"', jenis_kelamin='"+req.body.jenis_kelamin+
	"', alamat='"+req.body.alamat+"', agama='"+req.body.agama+
	"', modified='"+datestring+"' WHERE id = "+req.params.id;
	  let query = conn.query(sql, (err, results) => {
		    if(err) throw err;
		    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	  });
});
 
app.delete('/api/crud/:id',(req, res) => {
	  let sql = "DELETE FROM tb_crud WHERE id = "+req.params.id+"";
	  let query = conn.query(sql, (err, results) => {
		    if(err) throw err;
		      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	  });
});

app.listen(3000,() =>{
	  console.log('Server started on port 3000...');
});