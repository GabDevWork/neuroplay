CREATE TABLE `student` (
  `id_student` integer PRIMARY KEY,
  `name_student` varchar(255),
  `age_student` int,
  `diagnostic_student` varchar(255),
  `user_student` varchar(255) UNIQUE,
  `password_student` varchar(255),
  `id_professional` int
);

CREATE TABLE `professional` (
  `id_professional` integer PRIMARY KEY,
  `desc_professional` varchar(255),
  `name_professional` varchar(255),
  `email_professional` varchar(255),
  `user_professional` varchar(255) UNIQUE,
  `password_professional` varchar(255)
);

ALTER TABLE `studant` ADD FOREIGN KEY (`id_professional`) REFERENCES `professional` (`id_professional`);
