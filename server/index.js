const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "stduent_info",
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/get', (req, res)=>{
	const sqlGet = "SELECT * FROM student_db";
	db.query(sqlGet,(err, result)=>{
		res.send(result);
	});
});

app.post('/api/post', (req, res)=>{
	const name = req.body;
	res.send(name);
	// const sqlInsert = "INSERT INTO student_db (name, email, contact) VALUES (?, ?, ?)";
	// db.query(sqlInsert,[name, email, contact],(err, result)=>{
	// 	if(err){
	// 		console.log(err);
	// 	}
	// });
});

app.delete('/api/remove/:id', (req, res)=>{
	const { id } = req.params;
	const sqlRemove = "DELETE FROM student_db WHERE id =?";
	db.query(sqlRemove, id ,(err, result)=>{
		if(err){
			console.log(err);
		}
	});
});

app.get('/api/get/:id', (req, res)=>{
	const { id } = req.params;
	const sqlGet = "SELECT * FROM student_db WHERE id =?";
	db.query(sqlGet, id, (err, result)=>{
		if(err){
			console.log(err);
		}
		res.send(result);
	});
});

app.put('/api/put/:id', (req, res)=>{
	const { id } = req.params;
	const {name, email, contact} = req.body;
	const sqlUpdate = "UPDATE student_db set name=?, email=?, contact=? WHERE id=?";
	db.query(sqlUpdate,[name, email, contact, id], (err, result)=>{
		if(err){
			console.log(err);
		}
		res.send(result);
	});
});

app.get('/', (req, res)=>{
	// const sqlInsert = "INSERT INTO student_db(name, email, contact) VALUES ('billah', 'billah@gamil.com', 9897564  )";
	// db.query(sqlInsert, (err, result)=>{
	// 	console.log("error", err);
	// 	console.log("result", result);
	// 	res.send("Hello! Express");
	// });
	
});


app.listen(5000,()=>{
	console.log(`server is running on port 5000`);
});


