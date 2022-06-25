-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 25, 2022 at 05:23 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sadnicebaza`
--

-- --------------------------------------------------------

--
-- Table structure for table `korisnik`
--

CREATE TABLE `korisnik` (
  `id` int(11) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `korisnicko_ime` varchar(50) DEFAULT NULL,
  `lozinka` varchar(200) DEFAULT NULL,
  `admin` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `korisnik`
--

INSERT INTO `korisnik` (`id`, `email`, `korisnicko_ime`, `lozinka`, `admin`) VALUES
(1, 'markog19@gmail.com', 'Marko', 'sha256$6xj4Kzr6$a5c1c56c76bbb31e40807ec33f99482658cdc0a3f6e1f944c31108f5b996dc27', 1),
(3, 'mdasdas@gmail.com', 'Marko1234', 'sha256$BHv23qEt$b36c8b9e85cc0056b537666859d3252aec54780bf60a94e6312945cd3a7e86b6', 1),
(4, 'markog19@gmail.com', 'MarkoGalic', 'sha256$qA9U8jwG$4133c7389a4a504bbda63ebb412ed32f92d38495df398782abafaabb5d7c774f', 1),
(5, 'idixon323@gmail.com', 'idixon', 'sha256$Xc9NbzrS$eda1ae8b7d4f95509c99225bed7eddca9e7c7f8b5f7fd8743a6e1534cd18e13c', 0);

-- --------------------------------------------------------

--
-- Table structure for table `korisnik__sadnica`
--

CREATE TABLE `korisnik__sadnica` (
  `id` int(11) NOT NULL,
  `cijena` float DEFAULT NULL,
  `sadnica_id` int(11) DEFAULT NULL,
  `korisnik_id` int(11) DEFAULT NULL,
  `broj` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `korisnik__sadnica`
--

INSERT INTO `korisnik__sadnica` (`id`, `cijena`, `sadnica_id`, `korisnik_id`, `broj`) VALUES
(1, 231, 7, 5, 3),
(2, 22213, 7, 5, 1),
(3, 22213, 7, 5, 3),
(4, 22213, 7, 5, 1),
(5, 22213, 7, 5, 2),
(6, 22213, 7, 5, 6),
(7, 22213, 7, 5, 2),
(8, 22213, 7, 5, 30),
(9, 22213, 7, 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `korisnik__usluga`
--

CREATE TABLE `korisnik__usluga` (
  `id` int(11) NOT NULL,
  `cijena` float DEFAULT NULL,
  `usluga_id` int(11) DEFAULT NULL,
  `korisnik_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `korisnik__usluga`
--

INSERT INTO `korisnik__usluga` (`id`, `cijena`, `usluga_id`, `korisnik_id`) VALUES
(1, 21, 1, 5),
(2, 21, 2, 5),
(3, 2121, 3, 5),
(4, 21, 1, 5),
(5, 21, 2, 5),
(6, 2121, 3, 5),
(7, 12, 4, 5);

-- --------------------------------------------------------

--
-- Table structure for table `sadnica`
--

CREATE TABLE `sadnica` (
  `id` int(11) NOT NULL,
  `naziv` varchar(50) DEFAULT NULL,
  `slika` varchar(500) DEFAULT NULL,
  `tip` varchar(50) DEFAULT NULL,
  `opis` varchar(50) DEFAULT NULL,
  `cijena` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sadnica`
--

INSERT INTO `sadnica` (`id`, `naziv`, `slika`, `tip`, `opis`, `cijena`) VALUES
(7, 'dasadsdsadsa', 's', 's', 's', 22213);

-- --------------------------------------------------------

--
-- Table structure for table `usluga`
--

CREATE TABLE `usluga` (
  `id` int(11) NOT NULL,
  `naziv` varchar(50) DEFAULT NULL,
  `slika` varchar(500) DEFAULT NULL,
  `opis` varchar(50) DEFAULT NULL,
  `cijena` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usluga`
--

INSERT INTO `usluga` (`id`, `naziv`, `slika`, `opis`, `cijena`) VALUES
(1, 'test', 'dsasda', '12', 21),
(2, 'dsaasd', 'dsadsa', '121', 21),
(3, 'dsaasddsad', 'dsadsadsad', '121sda', 2121),
(4, 'dasd', 'https://images.telegram.hr/iXtXCqBxsYMWyCsRY2Sp3c4aQNGJQ4aKxQVIl8tajeE/preset:single1/aHR0cHM6Ly93d3cudGVsZWdyYW0uaHIvd3AtY29udGVudC91cGxvYWRzLzIwMTkvMDMvMzU2NTgyMTI4MjNfMzgwN2FhODIyNV9rLmpwZw.jpg', '12', 12);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `korisnik`
--
ALTER TABLE `korisnik`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `korisnicko_ime` (`korisnicko_ime`);

--
-- Indexes for table `korisnik__sadnica`
--
ALTER TABLE `korisnik__sadnica`
  ADD PRIMARY KEY (`id`),
  ADD KEY `KorisnikFK` (`korisnik_id`),
  ADD KEY `SadnicaFK` (`sadnica_id`);

--
-- Indexes for table `korisnik__usluga`
--
ALTER TABLE `korisnik__usluga`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UslugaFK` (`usluga_id`);

--
-- Indexes for table `sadnica`
--
ALTER TABLE `sadnica`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usluga`
--
ALTER TABLE `usluga`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `korisnik`
--
ALTER TABLE `korisnik`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `korisnik__sadnica`
--
ALTER TABLE `korisnik__sadnica`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `korisnik__usluga`
--
ALTER TABLE `korisnik__usluga`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `sadnica`
--
ALTER TABLE `sadnica`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `usluga`
--
ALTER TABLE `usluga`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `korisnik__sadnica`
--
ALTER TABLE `korisnik__sadnica`
  ADD CONSTRAINT `KorisnikFK` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `SadnicaFK` FOREIGN KEY (`sadnica_id`) REFERENCES `sadnica` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `korisnik__usluga`
--
ALTER TABLE `korisnik__usluga`
  ADD CONSTRAINT `UslugaFK` FOREIGN KEY (`usluga_id`) REFERENCES `usluga` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
