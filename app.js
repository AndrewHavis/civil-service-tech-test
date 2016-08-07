'use strict';

// Import Express
const express = require('express');
const app = express();

// Set up our root on the Express server to /public
app.use('/', express.static('./public'));

// Now start the web server and listen for requests
app.listen(8586, '0.0.0.0', () => {
    console.log('Server started on http://localhost:8586');
});