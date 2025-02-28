require('dotenv').config();
const sequelize = require('./config/db');
const { Genre, Artist, Album, Track } = require('./models');

// Fonction pour attendre entre les opérations
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function seedDatabase() {
    try {
        console.log('Connexion à la base de données...');
        await sequelize.authenticate();

        console.log('Synchronisation des modèles...');
        // Utilisez { force: true } avec précaution car cela SUPPRIME les tables existantes
        // En production, utilisez plutôt { alter: true } ou omettez l'option
        await sequelize.sync({ alter: true });

        // 1. Seed des Genres
        console.log('Seed des Genres...');
        const genres = await Genre.bulkCreate([
            {
                title: 'Rock',
                description: 'Rock music is a broad genre of popular music that originated as "rock and roll" in the United States in the late 1940s and early 1950s.'
            },
            {
                title: 'Pop',
                description: 'Pop music is a genre of popular music that originated in its modern form during the mid-1950s in the United States and the United Kingdom.'
            },
            {
                title: 'Hip Hop',
                description: 'Hip hop music, also known as rap music, is a genre of popular music that originated in the United States in the 1970s.'
            },
            {
                title: 'Electronic',
                description: 'Electronic music is music that employs electronic musical instruments, digital instruments, or circuitry-based music technology in its creation.'
            },
            {
                title: 'Jazz',
                description: 'Jazz is a music genre that originated in the African-American communities of New Orleans, Louisiana in the late 19th and early 20th centuries.'
            }
        ]);

        // Attendre un peu pour s'assurer que les genres sont bien créés
        await wait(500);

        // 2. Seed des Artistes
        console.log('Seed des Artistes...');
        const artists = await Artist.bulkCreate([
            {
                name: 'David Bowie',
                avatar: 'david_bowie.jpg',
                biography: 'David Robert Jones, known professionally as David Bowie, was an English singer-songwriter and actor.'
            },
            {
                name: 'Daft Punk',
                avatar: 'daft_punk.jpg',
                biography: 'Daft Punk was a French electronic music duo formed in 1993 in Paris.'
            },
            {
                name: 'Kendrick Lamar',
                avatar: 'kendrick_lamar.jpg',
                biography: 'Kendrick Lamar Duckworth is an American rapper, songwriter, and record producer.'
            },
            {
                name: 'Adele',
                avatar: 'adele.jpg',
                biography: 'Adele Laurie Blue Adkins is an English singer and songwriter.'
            },
            {
                name: 'Miles Davis',
                avatar: 'miles_davis.jpg',
                biography: 'Miles Dewey Davis III was an American jazz trumpeter, bandleader, and composer.'
            }
        ]);

        // 3. Seed des Albums
        console.log('Seed des Albums...');
        const albums = await Album.bulkCreate([
            {
                title: 'Heroes',
                cover_image: 'heroes.jpg',
                release_date: new Date('1977-10-14'),
                artist_id: artists[0].id
            },
            {
                title: 'Random Access Memories',
                cover_image: 'random_access_memories.jpg',
                release_date: new Date('2013-05-17'),
                artist_id: artists[1].id
            },
            {
                title: 'To Pimp a Butterfly',
                cover_image: 'to_pimp_a_butterfly.jpg',
                release_date: new Date('2015-03-15'),
                artist_id: artists[2].id
            },
            {
                title: '25',
                cover_image: '25.jpg',
                release_date: new Date('2015-11-20'),
                artist_id: artists[3].id
            },
            {
                title: 'Kind of Blue',
                cover_image: 'kind_of_blue.jpg',
                release_date: new Date('1959-08-17'),
                artist_id: artists[4].id
            }
        ]);

        // 4. Seed des Pistes
        console.log('Seed des Pistes...');
        const tracks = await Track.bulkCreate([
            {
                title: 'Heroes',
                duration: '06:07:00',
                album_id: albums[0].id
            },
            {
                title: 'Beauty and the Beast',
                duration: '03:32:00',
                album_id: albums[0].id
            },
            {
                title: 'Get Lucky',
                duration: '06:07:00',
                album_id: albums[1].id
            },
            {
                title: 'Instant Crush',
                duration: '05:37:00',
                album_id: albums[1].id
            },
            {
                title: 'King Kunta',
                duration: '03:54:00',
                album_id: albums[2].id
            },
            {
                title: 'Alright',
                duration: '03:39:00',
                album_id: albums[2].id
            },
            {
                title: 'Hello',
                duration: '04:55:00',
                album_id: albums[3].id
            },
            {
                title: 'When We Were Young',
                duration: '04:50:00',
                album_id: albums[3].id
            },
            {
                title: 'So What',
                duration: '09:22:00',
                album_id: albums[4].id
            },
            {
                title: 'Blue in Green',
                duration: '05:37:00',
                album_id: albums[4].id
            }
        ]);

        // 5. Seed des associations Track-Artist
        console.log('Seed des associations Track-Artist...');
        const trackArtistPromises = [];

        // Associer chaque piste à son artiste principal
        for (let i = 0; i < tracks.length; i++) {
            const artistIndex = Math.floor(i / 2); // Chaque artiste a 2 pistes
            trackArtistPromises.push(tracks[i].addArtist(artists[artistIndex]));
        }
        await Promise.all(trackArtistPromises);

        // 6. Seed des associations Track-Genre
        console.log('Seed des associations Track-Genre...');
        const trackGenrePromises = [];

        // Répartir les genres entre les pistes
        trackGenrePromises.push(tracks[0].addGenre(genres[0])); // Heroes -> Rock
        trackGenrePromises.push(tracks[1].addGenre(genres[0])); // Beauty and the Beast -> Rock

        trackGenrePromises.push(tracks[2].addGenre(genres[3])); // Get Lucky -> Electronic
        trackGenrePromises.push(tracks[3].addGenre(genres[3])); // Instant Crush -> Electronic
        trackGenrePromises.push(tracks[3].addGenre(genres[0])); // Instant Crush -> Rock aussi

        trackGenrePromises.push(tracks[4].addGenre(genres[2])); // King Kunta -> Hip Hop
        trackGenrePromises.push(tracks[5].addGenre(genres[2])); // Alright -> Hip Hop

        trackGenrePromises.push(tracks[6].addGenre(genres[1])); // Hello -> Pop
        trackGenrePromises.push(tracks[7].addGenre(genres[1])); // When We Were Young -> Pop

        trackGenrePromises.push(tracks[8].addGenre(genres[4])); // So What -> Jazz
        trackGenrePromises.push(tracks[9].addGenre(genres[4])); // Blue in Green -> Jazz

        await Promise.all(trackGenrePromises);

        console.log('Seeding terminé avec succès !');

    } catch (error) {
        console.error('Erreur lors du seeding:', error);
    } finally {
        // Fermer la connexion
        await sequelize.close();
    }
}

// Exécuter le script
seedDatabase();