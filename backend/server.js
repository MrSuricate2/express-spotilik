// Import des modules
const express = require('express');
const dotenv = require('dotenv').config({path: './.env'});
const sequelize = require('./config/db');
const port = process.env.PORT || 5000;

// Initialisation de Express
const app = express();
app.use(express.json())
app.use(express.urlencoded())

const artistRoutes = require('./routes/artistRoutes');
app.use('/api/artists', artistRoutes);
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

sequelize.sync()
    .then(() => console.log('Base de données synchronisée'))
    .catch(err => console.error('Erreur de connexion', err));

// Lancement du serveur
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

