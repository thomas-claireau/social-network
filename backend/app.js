// Imports
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
// Security Imports
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
// Routes Imports
const users = require('./routes/user');
const posts = require('./routes/post');
// const comments = require('./routes/comment');

// Express app launching
const app = express();

// Helmet middlware for safe headers
app.use(helmet());
app.use(cors());

// express-rate-limit middleware to limit the amount of request done
const limiter = rateLimit({
	windowMs: 30 * 60 * 1000,
	max: 100,
});
app.use(limiter);

// Setting CORS headers
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, Content-Type, Access-Control-Allow-Headers'
	);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

// Parsing req
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Security
app.use(hpp()); // HPP middleware to protect against HTTP parameter pollution attacks

// Setting routes
app.use('/users', users);
// app.use('/api/posts', posts);
// app.use('/api/comments', comments);

// Exporting module
module.exports = app;
