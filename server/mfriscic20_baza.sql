-- -----------------------------------------------------
-- Table `RWA2022mfriscic20`.`uloga`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `uloga` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `naziv_uloge` VARCHAR(50) NOT NULL,
  `opis_uloge` VARCHAR(200) NULL,
  UNIQUE (`naziv_uloge`)
);
INSERT INTO `uloga` (`id`, `naziv_uloge`, `opis_uloge`)
VALUES (1, 'admin', 'administrator sustava'),
  (2, 'registrirani_korisnik', 'uloga za korisnika'),
  (3, 'gost', 'uloga za gosta');
SELECT *
FROM `uloga`;
-- -----------------------------------------------------
-- Table `RWA2022mfriscic20`.`korisnik`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `korisnik` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `ime` VARCHAR(50) NULL,
  `prezime` VARCHAR(50) NULL,
  `email` VARCHAR(70) NOT NULL,
  `korime` VARCHAR(50) NOT NULL,
  `lozinka` VARCHAR(70) NOT NULL,
  `uloga_id` INT NOT NULL,
  `aktivan` TINYINT NULL,
  `token` CHAR(10) NULL,
  `sol` CHAR(50) NULL,
  `blokiran` TINYINT(2) NULL,
  `totpKljuc` VARCHAR(200) NULL,
  UNIQUE (`totpKljuc`),
  UNIQUE (`korime`),
  UNIQUE (`email`),
  FOREIGN KEY (`uloga_id`) REFERENCES `uloga` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO `korisnik` (
    `id`,
    `ime`,
    `prezime`,
    `email`,
    `korime`,
    `lozinka`,
    `uloga_id`,
    `aktivan`,
    `token`,
    `sol`,
    `blokiran`,
    `totpKljuc`
  )
VALUES (
    5,
    'filip',
    'filip',
    'mfriscic20@student.foi.hr',
    'martin',
    '8f4b95fa7503616847269e8db18676732a448200849e46c67c84be795dad5224',
    1,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  ),
  (
    11,
    'ime korisnika',
    'prezime korisnika',
    'martin.friscic6@gmail.com',
    'totp',
    'b043089b80136b5bfde434e6218dc495f34da5b1ef86336ab5e30fefd99385f7',
    2,
    1,
    NULL,
    NULL,
    NULL,
    'AEERAAAAAMAAAARABAAAAAAAAMCRACAABAAACCIAAZAAABICA5BAAAAFAAAAAAAAAAAAACAABAERAARJARERABAFAAAAOAAAAZAARBI'
  ),
  (
    12,
    'tmMail',
    'prezime',
    'xzkyhqbldjytpkjqir@tmmwj.com',
    'tmMail',
    'a51fe2a9980b0291960a44b67aacb87d90c35f2529ed2acd97ef364424cc5010',
    2,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  ),
  (
    34,
    'molim',
    'radi',
    'usbxbfurrbatweampm@tmmbt.net',
    'mradi',
    'e503af5b01dc8b43fbc55aa8ea3f32c4126c7385661ae8f00f6ed06469bd512c',
    2,
    1,
    NULL,
    NULL,
    NULL,
    NULL
  ),
  (
    39,
    'mile',
    'mile',
    'epzxsetugjrvloeaoi@tmmcv.com',
    'mile',
    '759b088074ffb484cdae1becdabb351056804c7c285066b23e7698e5d5f861aa',
    2,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  ),
  (
    40,
    'ivan',
    'ivanic',
    'xlypizcrvhthjjxajc@tmmwj.net',
    'ii',
    '4616a8a6924edab471283c9ef8995c1af67ea0a3c7aa5a67bd21317602adee17',
    2,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  ),
  (
    41,
    'probniKljuc',
    'probniKljuc',
    'drqfwofmtpqqmffxez@tmmwj.com',
    'probniKljuc',
    'e8a41d4645580e66b23961547cba60759c5a94dbe37a6474ebfc8ddf529c37ec',
    2,
    NULL,
    NULL,
    NULL,
    NULL,
    'AABRAAAHAIBRACAIAZAAMAZAAAAARBAAARAAKAACAADRAAAAAMCRAAABBEAAAAAAAZAAABIBBACRABAAA5AAOAAJAAAAKAAAAAAAAAR'
  ),
  (
    42,
    'aktivacijski',
    'aktivacijski',
    'dodxioixjbgmkrwlve@tmmbt.net',
    'aktivacijski',
    '7c2040721873021171ca62b660d1ad324fa7071b8b4744b8ebdce7d01172f7ab',
    2,
    1,
    NULL,
    NULL,
    NULL,
    'AAAAMAAGAAAAIAAIBEAAGCICARAAOBIAA5AAAAAGAAAAABZAAADAAAACARAAABRJAMCREAREAACATAAJAZBAAAAABEAREAAAAAAAOBR'
  ),
  (
    43,
    'nakondsadsadsadsadas',
    'nakon',
    'sdryynymktiqslppqi@tmmbt.com',
    'nakon',
    '59179f5c964f5ac1c7e03c92a48c9dd94815b0fbddaf5a90f0dfee7083c626dc',
    2,
    1,
    NULL,
    NULL,
    NULL,
    'AIEAOAAJAAARMARCBEBAABZCBEBRGAAEAAAAAAABA5CRACAAAAEROCIFAICACAAAAABAIAAHAZAAKBIGAMAAAAAAAABAABAJAAAAAAZ'
  ),
  (
    44,
    'obican',
    'obican',
    'nilzaegbqsfwmrhjtu@tmmwj.com',
    'obican',
    '2317c5cc4e67b0cb5f55b26fdcf5fe0a24012503ae99d22b26f3c866d281be2b',
    2,
    1,
    NULL,
    NULL,
    NULL,
    'AAAAEBICAIEAGAAHAZAAGBICAMCAICIAAAAAAAAAAAAAKCAAAMBACAZBAAEAAAZABADAGAAJAAAACBZAAACRAAAABEERAAAAARAATAZ'
  ),
  (
    46,
    'administrator',
    'administrator',
    'tevaj46335@hempyl.com',
    'administrator',
    '2317c5cc4e67b0cb5f55b26fdcf5fe0a24012503ae99d22b26f3c866d281be2b',
    1,
    1,
    NULL,
    NULL,
    NULL,
    'ARAARARAAZAAAAAAAAAARARAA5AAAAZAAAARABIAAAAARAZJARBAABAAAAAAAAACAADRGAAAAAAAAAAFAABRKAAHAABAAAAAA5ARAAR'
  ),
  (
    47,
    'miki',
    'miki',
    'mfcpzytcdxwzelqlpz@tmmbt.com',
    'miki',
    '46e1862701ccc12591f6ee9c1101af07b5e73833172474649e12a4c1f29bb312',
    2,
    NULL,
    NULL,
    NULL,
    NULL,
    'A5AATAREAZAAGAAIARERMAZIAACRGARAARDRAAAIAEDREAAHAAAARAAAAAEAAAZAAAAATBZGAADATCIAAAERRAAAA5AAMBIAARARRBA'
  ),
  (
    49,
    'mile',
    'mile',
    'kopah27374@hempyl.com',
    'ffff',
    '714b50e84e1cfd536549892a4c00ceb8fee5023acf5b585082493d7df1a403a6',
    2,
    NULL,
    NULL,
    NULL,
    NULL,
    'AACAAAAGAAAAAAAJAAAAIAADAMAARBIGAMAAAAAJAAAACAZAAADAAAAJAIAAEAAAAAAAAARGBEAARAAHAAAAAAIAAACRTCADBEAAABA'
  ),
  (
    51,
    'meu',
    'meu',
    'ywjciwmvcdvymhufsc@tmmwj.net',
    'meu',
    'c6e49c9803a3f79c61e88398d8ccd664c6fa1dc1fb6e963b2905d894f8ee4997',
    2,
    1,
    NULL,
    NULL,
    NULL,
    'AIAAAARAA5CRABZAAAARAAZAA5EAAAAJBEDAAAAAAACRKAIABACAABIBAAAAAAAAAIAAABRAAEAAACAAAACRKBIDAMAAAAZCAZAAIAA'
  ),
  (
    52,
    'ppp',
    'ppp',
    'nunucclmeyiemvphqv@tmmwj.net',
    'ppp',
    '4d305f548f260fc16ff5be0adecdd799d907a1e7cf0fb0fff9c77ae7deec7311',
    2,
    1,
    NULL,
    NULL,
    NULL,
    'A5AAABIAA5AAMAAABABAIARAAMCAMBZHARAAOAAAAAAATAAAAEAAOAABAMEREAAHAECACARAARAACAZEAAAAGAAAAAEAACAAAABRAAR'
  ),
  (
    53,
    'azurirani222',
    'azurirani',
    'evezcfvphaelneftrq@tmmbt.com',
    'azurirani',
    'ce94cce62634284187a69629d4f00f1c62b3033330196b5846964f43062e4e61',
    2,
    1,
    NULL,
    NULL,
    NULL,
    'BEAACAACAAARKBAFARAAIAAAAABARAAHAAAATCABAAAARAAAAAEREBRAAAERKAADBEAAKAADAAAAAAAAARARAAAGAAAAABIBAAAAABI'
  ),
  (
    69,
    'mimi32',
    'mimi32',
    'yvh08099@nezid.com',
    'mimi32',
    'dafe3a06751d5f62e7e844d7473fbddc5b950e29a807130f6723015f5ed73a06',
    2,
    NULL,
    NULL,
    NULL,
    NULL,
    'AAAAAAAAAAAAAARAAAAAKAZHAMAAAAIAAECAACIBA5BAGAIAARCAGBREARAAACIIARAAKAZFARAAABIGAZAAAAIAAAERKAAHBEEROCI'
  ),
  (
    70,
    'Ivica',
    'Olić',
    'tefayig186@invodua.com',
    'iolic',
    'a0e7c635688073afda502f9fd01a0c2a7f616702fc01f05e02a5c070f2f41316',
    2,
    1,
    NULL,
    NULL,
    NULL,
    'AACRABAAAAAAKBIBAAAAEAADAAAAIAAAAABAAAAAAAARMAAGBABRACAGAACREBIAARAAAAABAAAAABRJAABAACIEAAAAAAIAAZARAAA'
  );
SELECT *
FROM `korisnik`;
-- -----------------------------------------------------
-- Table `RWA2022mfriscic20`.`film`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `film` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `adult` TINYINT(2) NOT NULL,
  `backdrop_path` VARCHAR(100) NULL,
  `belongs_to_collection` VARCHAR(45) NULL,
  `budget` INT NULL,
  `date_added` DATETIME NULL,
  `homepage` VARCHAR(45) NULL,
  `imdb_id` VARCHAR(9) NULL,
  `original_language` VARCHAR(45) NOT NULL,
  `original_title` VARCHAR(100) NOT NULL,
  `overview` VARCHAR(1000) NULL,
  `popularity` DOUBLE NOT NULL,
  `poster_path` VARCHAR(70) NULL,
  `release_date` VARCHAR(45) NOT NULL,
  `revenue` INT NULL,
  `runtime` INT NULL,
  `odobreno` TINYINT(2) NULL,
  `tagline` VARCHAR(45) NULL,
  `title` VARCHAR(120) NOT NULL,
  `video` TINYINT(2) NOT NULL,
  `vote_average` INT NOT NULL,
  `vote_count` INT NOT NULL,
  `korisnik_id` INT NULL,
  FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO `film` (
    `id`,
    `adult`,
    `backdrop_path`,
    `belongs_to_collection`,
    `budget`,
    `date_added`,
    `homepage`,
    `imdb_id`,
    `original_language`,
    `original_title`,
    `overview`,
    `popularity`,
    `poster_path`,
    `release_date`,
    `revenue`,
    `runtime`,
    `odobreno`,
    `tagline`,
    `title`,
    `video`,
    `vote_average`,
    `vote_count`,
    `korisnik_id`
  )
VALUES (
    1013860,
    0,
    '/kmzppWh7ljL6K9fXW72bPN3gKwu.jpg',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    'en',
    'R.I.P.D. 2: Rise of the Damned',
    'When Sheriff Roy Pulsipher finds himself in the afterlife, he joins a special police force and returns to Earth to save humanity from the undead.',
    3827.074,
    '/g4yJTzMtOBUTAR2Qnmj8TYIcFVq.jpg',
    '2022-11-15',
    NULL,
    NULL,
    NULL,
    NULL,
    'R.I.P.D. 2: Rise of the Damned',
    0,
    7,
    181,
    NULL
  );
SELECT *
FROM `film`;
INSERT INTO `film` (
    `id`,
    `adult`,
    `backdrop_path`,
    `belongs_to_collection`,
    `budget`,
    `date_added`,
    `homepage`,
    `imdb_id`,
    `original_language`,
    `original_title`,
    `overview`,
    `popularity`,
    `poster_path`,
    `release_date`,
    `revenue`,
    `runtime`,
    `odobreno`,
    `tagline`,
    `title`,
    `video`,
    `vote_average`,
    `vote_count`,
    `korisnik_id`
  )
VALUES (
    4523,
    0,
    '/u4UpRDi0w84aNrigr9p049rMHiy.jpg',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    'en',
    'Enchanted',
    'The beautiful princess Giselle is banished by an evil queen from her magical, musical animated land and finds herself in the gritty reality of the streets of modern-day Manhattan. Shocked by this strange new environment that doesnt operate on a happily ever after basis, Giselle is now adrift in a chaotic world badly in need of enchantment. But when Giselle begins to fall in love with a charmingly flawed divorce lawyer who has come to her aid - even though she is already promised to a perfect fairy tale prince back home - she has to wonder: Can a storybook view of romance survive in the real world?',
    66.434,
    '/8KCNzCArLlvLdQoHx6npua2VSVc.jpg',
    '2007-11-20',
    NULL,
    NULL,
    1,
    NULL,
    'Enchanted',
    0,
    7,
    4728,
    NULL
  );
INSERT INTO `film` (
    `id`,
    `adult`,
    `backdrop_path`,
    `belongs_to_collection`,
    `budget`,
    `date_added`,
    `homepage`,
    `imdb_id`,
    `original_language`,
    `original_title`,
    `overview`,
    `popularity`,
    `poster_path`,
    `release_date`,
    `revenue`,
    `runtime`,
    `odobreno`,
    `tagline`,
    `title`,
    `video`,
    `vote_average`,
    `vote_count`,
    `korisnik_id`
  )
VALUES (
    65,
    0,
    '/bfccQmQWNFQYRv4PHgCnjDu7PXn.jpg',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    'en',
    '8 Mile',
    'For Jimmy Smith, Jr., life is a daily fight just to keep hope alive. Feeding his dreams in Detroits vibrant music scene, Jimmy wages an extraordinary personal struggle to find his own voice - and earn a place in a world where rhymes rule, legends are born and every moment… is another chance.',
    46.807,
    '/7BmQj8qE1FLuLTf7Xjf9sdIHzoa.jpg',
    '2002-11-08',
    NULL,
    NULL,
    0,
    NULL,
    '8 Mile',
    0,
    7,
    6132,
    NULL
  ) -- -----------------------------------------------------
  -- Table `RWA2022mfriscic20`.`zanr`
  -- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS `zanr` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `naziv` VARCHAR(150) NOT NULL,
    UNIQUE (`naziv`)
  );
INSERT INTO `zanr` (`id`, `naziv`)
VALUES (28, 'Action'),
  (12, 'Adventure'),
  (16, 'Animation'),
  (37, 'asdfas'),
  (10402, 'Music');
SELECT *
FROM `zanr`;
/ / tu mi ocito fale svi oni zanrovi -- -----------------------------------------------------
-- Table `RWA2022mfriscic20`.`zanr_film`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zanr_film` (
  `zanr_id` INT NOT NULL,
  `film_id` INT NOT NULL,
  FOREIGN KEY (`zanr_id`) REFERENCES `zanr` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (`film_id`) REFERENCES `film` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO `zanr_film` (`zanr_id`, `film_id`)
VALUES (10402, 65),
  (28, 809183),
  (12, 19995),
  (16, 4523);
SELECT *
FROM `zanr_film`;



DELETE FROM korisnik WHERE id = 84;