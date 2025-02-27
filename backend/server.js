const express = require('express');
const dotenv = require('dotenv').config({ path: './.env' });
const sequelize = require('./config/db');
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const artistRoutes = require('./routes/artistRoutes');
const albumRoutes = require('./routes/albumRoutes');

app.use('/api/artists', artistRoutes);
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

sequelize.sync()
    .then(() => console.log('Base de données synchronisée'))
    .catch(err => console.error('Erreur de connexion', err));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});