'use strict';

// Import Express
const express = require('express');
const app = express();

// Set up our root on the Express server to /public
app.use('/', express.static('./public'));

// Run our tests when we go to /test
app.use('/test', express.static('./test'));

// Get front-end dependencies via /bower_components
app.use('/lib', express.static('./bower_components'));

// Get the GOV.UK template
app.use('/govuk_template', express.static('./node_modules/govuk_template_ejs'));

// Get our list of candidates from /candidates
app.get('/candidates', (req, res) => {
    res.sendFile(__dirname + '/app/db/candidates.json');
});

// Now start the web server and listen for requests
app.listen(8586, '0.0.0.0', () => {
    console.log('Server started on http://localhost:8586');
});
