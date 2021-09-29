const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan')


const db = require('./database/db');
const registration_route = require('./routes/registrstion_route');
const bloodgroup_route = require('./routes/bloodgroup_route');
const image_route = require('./routes/image_route');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(registration_route);
app.use(bloodgroup_route);
app.use(image_route);
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'public')));

app.listen(90, ()=>{console.log('server started on 90 Port...')})