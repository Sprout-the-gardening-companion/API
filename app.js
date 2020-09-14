const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

//MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const plantsRoutes = require('./routes/Sprout_Routes');

app.use('/plants', plantsRoutes);

// ROUTES
app.get('/', (req, res) => {
    res.send('We are on Home');
});

app.get('/posts', (req, res) => {
    res.send('We are on posts!');
});

// Conect to DB
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  };
mongoose.connect(process.env.MONGODB_URI, options, () => {
    console.log('Connected to the Sprout DataBase!');
});

// START SERVER
app.listen(process.env.PORT);
