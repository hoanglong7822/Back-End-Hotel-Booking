const express = require('express');
const app = express();
require('dotenv').config();
const port = 3030;
const Router = require('./routes/index');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./connection/db');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
connection();
app.use('/', Router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
