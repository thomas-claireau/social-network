const express = require('express');
const app = express();

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
	);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

// middleware
app.use(express.json());
app.use(express.urlencoded());

// CRUD USER
app.get('/users', (req, res) => {
	res.status(200).json({
		action: 'GET USERS',
	});
});

app.get('/users/:id', (req, res) => {
	res.status(200).json({
		action: `GET USER ${req.params.id}`,
	});
});

app.post('/users', (req, res) => {
	console.log(req.body);

	res.status(201).json({
		action: 'POST USER',
	});
});

app.put('/users/:id', (req, res) => {
	console.log(req.body);

	res.status(204);
});

app.delete('/users/:id', (req, res) => {
	res.status(204);
});
// END CRUD USER

// app.use((req, res, next) => {
// 	console.log(Date(Date.now()));
// 	next();
// });

module.exports = app;
