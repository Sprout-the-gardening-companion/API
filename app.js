const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
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

// Conect to Firebase
// const serviceAccount = require(process.env.SERVICE_ACCOUNT_CREDS);

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://sprout-the-garden-companion.firebaseio.com"
// });

// const db = admin.firestore();

// START SERVER
app.listen(process.env.PORT, console.log(`Listening on port ${process.env.PORT}`));
