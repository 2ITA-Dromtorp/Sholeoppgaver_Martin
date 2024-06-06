-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 06. Jun, 2024 16:10 PM
-- Tjener-versjon: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `examen2024`
--

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `bestillinger`
--

CREATE TABLE `bestillinger` (
  `bestillingsNummer` int(5) NOT NULL,
  `produktID` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`produktID`)),
  `sum` int(15) NOT NULL,
  `dato` varchar(40) NOT NULL,
  `bedriftsNavn` varchar(100) NOT NULL,
  `fornavn` varchar(50) NOT NULL,
  `etternavn` varchar(50) NOT NULL,
  `epost` varchar(100) NOT NULL,
  `tlf` int(10) NOT NULL,
  `betaling` varchar(30) NOT NULL,
  `firmaadresse` varchar(50) NOT NULL,
  `leveringssted` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dataark for tabell `bestillinger`
--

INSERT INTO `bestillinger` (`bestillingsNummer`, `produktID`, `sum`, `dato`, `bedriftsNavn`, `fornavn`, `etternavn`, `epost`, `tlf`, `betaling`, `firmaadresse`, `leveringssted`) VALUES
(1, '1', 10000, '2024-06-06', '', '', '', '', 0, '', '', ''),
(2, '[\"2\",\"2\",\"2\",\"3\",\"3\"]', 55000, '06/06/2024 12:08:16', '', '', '', '', 0, '', '', ''),
(3, '[\"2\",\"2\",\"1\"]', 40000, '06/06/2024 12:11:15', '', '', '', '', 0, '', '', ''),
(4, '[\"2\",\"2\",\"1\"]', 40000, '06/06/2024 12:18:30', '', '', '', '', 0, '', '', ''),
(5, '[\"2\",\"2\",\"2\",\"3\",\"3\"]', 55000, '06/06/2024 12:19:02', '', '', '', '', 0, '', '', ''),
(6, '[\"3\",\"3\",\"3\",\"3\",\"3\",\"3\",\"3\",\"3\",\"3\",\"3\",\"3\"]', 55000, '06/06/2024 12:22:12', '', '', '', '', 0, '', '', ''),
(7, '[\"3\",\"3\",\"3\",\"2\",\"2\"]', 45000, '06/06/2024 12:22:28', '', '', '', '', 0, '', '', ''),
(8, '[\"2\",\"2\",\"2\",\"3\",\"3\"]', 55000, '06/06/2024 15:23:16', 'soijfsoij', 'oij', 'oij', 'oij@gmail.com', 3425, '3425', 'iojoi', 'joij'),
(9, '[\"2\",\"2\",\"2\",\"3\",\"3\"]', 55000, '06/06/2024 15:24:39', 'soijfsoij', 'oij', 'oij', 'oij@gmail.com', 3425, '3425', 'iojoi', 'joij');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `products`
--

CREATE TABLE `products` (
  `ID` int(3) NOT NULL,
  `produktNavn` varchar(40) NOT NULL,
  `pris` int(6) NOT NULL,
  `antall` int(6) NOT NULL,
  `beskrivelse` varchar(255) NOT NULL,
  `specs` varchar(255) NOT NULL,
  `bildeBane` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dataark for tabell `products`
--

INSERT INTO `products` (`ID`, `produktNavn`, `pris`, `antall`, `beskrivelse`, `specs`, `bildeBane`) VALUES
(1, 'Lenovo Yogaslim 7', 10000, 994, 'Kommer snart', 'Veldig bra', 'https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8MTIxNTg5fGltYWdlL2pwZWd8aDA2L2hhNC8xMDY5NTkyNjIxODc4Mi5qcGd8ZDdhNjM5MjRjOTAyYzE2ZjY5NmEwYmNkMDg5MTdjM2VhZjA2NDZhMTJlOWJlZDY5MmE1MzcxMWE1YTFkZTE4YQ/-gallery-9.jpg'),
(2, 'Stasjonær PC', 15000, 485, 'Kraftig stasjonær PC for arbeidsstasjoner', 'Intel i7, 16GB RAM, 512GB SSD', 'https://www.komplett.no/img/p/1002/1243435.jpg'),
(3, 'Projektor', 5000, 278, 'Høyoppløselig projektor for presentasjoner', '1080p, 3000 lumen', 'https://www.komplett.no/img/p/800/1184050.jpg'),
(4, 'Trådløst AP', 2000, 197, 'Raskt og pålitelig trådløst tilgangspunkt', 'WiFi 6, Dual Band', 'https://www.sikkerheten-selv.no/content/uploads/2023/04/takmontert-aksesspunkt-AP-216.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bestillinger`
--
ALTER TABLE `bestillinger`
  ADD PRIMARY KEY (`bestillingsNummer`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bestillinger`
--
ALTER TABLE `bestillinger`
  MODIFY `bestillingsNummer` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `ID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
