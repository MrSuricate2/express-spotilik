CREATE TABLE `Albums` (
  `id` integer PRIMARY KEY,
  `title` varchar(255) NOT NULL,
  `cover_image` varchar(255),
  `release_date` date,
  `artist_id` integer,
  `createdAt` date,
  `updatedAt` date
);

CREATE TABLE `Tracks` (
  `id` integer PRIMARY KEY,
  `title` varchar(255) NOT NULL,
  `duration` time,
  `album_id` integer,
  `createdAt` date,
  `updatedAt` date
);

CREATE TABLE `Artists` (
  `id` integer PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `avatar` varchar(255),
  `biography` text,
  `createdAt` date,
  `updatedAt` date
);

CREATE TABLE `Genres` (
  `id` integer PRIMARY KEY,
  `title` varchar(255) UNIQUE NOT NULL,
  `description` text,
  `createdAt` date,
  `updatedAt` date
);

CREATE TABLE `Users` (
  `id` integer PRIMARY KEY,
  `username` varchar(255) UNIQUE NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `createdAt` date,
  `updatedAt` date
);

CREATE TABLE `Tracks_has_Artists` (
  `track_id` int,
  `artist_id` int,
  `createdAt` date,
  `updatedAt` date
);

CREATE TABLE `Tracks_has_genres` (
  `track_id` integer,
  `genre_id` integer,
  `createdAt` date,
  `updatedAt` date
);

ALTER TABLE `Albums` ADD FOREIGN KEY (`artist_id`) REFERENCES `Artists` (`id`);

ALTER TABLE `Tracks` ADD FOREIGN KEY (`album_id`) REFERENCES `Albums` (`id`);

ALTER TABLE `Tracks_has_genres` ADD FOREIGN KEY (`track_id`) REFERENCES `Tracks` (`id`);

ALTER TABLE `Tracks_has_genres` ADD FOREIGN KEY (`genre_id`) REFERENCES `Genres` (`id`);

ALTER TABLE `Tracks_has_Artists` ADD FOREIGN KEY (`artist_id`) REFERENCES `Artists` (`id`);

ALTER TABLE `Tracks_has_Artists` ADD FOREIGN KEY (`track_id`) REFERENCES `Tracks` (`id`);

ALTER TABLE `Tracks_has_genres` ADD FOREIGN KEY (`genre_id`) REFERENCES `Tracks_has_genres` (`track_id`);
