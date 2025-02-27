// Import des modules
const express = require('express');
const dotenv = require('dotenv').config({path: './.env'});
const port = process.env.PORT || 5000;

const connectDB = require('./config/db');
connectDB();

// Initialisation de Express
const app = express();

// Lancement du serveur
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

