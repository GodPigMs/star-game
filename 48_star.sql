-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- 主機: 127.0.0.1
-- 產生時間： 2018-08-17 13:32:50
-- 伺服器版本: 10.1.25-MariaDB
-- PHP 版本： 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `48_star`
--

-- --------------------------------------------------------

--
-- 資料表結構 `rank`
--

CREATE TABLE `rank` (
  `id` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `score` int(100) NOT NULL,
  `time` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 資料表的匯出資料 `rank`
--

INSERT INTO `rank` (`id`, `name`, `score`, `time`) VALUES
(1, 'XDDDD', 55, 153),
(6, 'ZXCAD', 10, 10),
(7, 'HIHI', 65, 104),
(8, 'HIHI', 65, 104),
(9, 'Test4', 187, 120),
(10, '7777', 277, 77),
(11, 'QQ', 87, 111),
(12, 'QQ2', 87, 111),
(13, 'QQ2', 87, 111),
(14, 'QQ3', 87, 111),
(15, 'QQQQQQ', 105, 104),
(16, '0706', 75, 173),
(17, '77+', 80, 110),
(18, 'XDDDDD', 15, 38),
(19, 'ddd', 95, 128),
(20, 'XDDDDD', 80, 135),
(21, 'fgegeg', 170, 154),
(22, 'wetwt', 120, 68),
(23, 'XDDDDDDDD', 280, 125),
(24, 'XDDDDD', 310, 119),
(25, 'ggrwe', 300, 101),
(26, 'DDDD', 160, 50),
(27, 'grgr', 20, 15),
(28, 'jyjy', 90, 49),
(29, 'ds', 15, 8),
(30, 'gegheg', 135, 51),
(31, 'drgr', 270, 98),
(32, 'wwww', 325, 114),
(33, 'hhh', 115, 38),
(34, 'fdfd', 40, 13),
(35, 'ddd', 105, 47),
(36, 'gfgfgf', 120, 58),
(37, 'gfgfgf', 120, 59),
(38, 'gfgfgf', 120, 59),
(39, 'gfgfgf', 120, 59),
(40, 'gfgfgf', 120, 59),
(41, 'gfgfgf', 120, 60),
(42, 'gfgfgf', 120, 60),
(43, 'gfgfgf', 120, 60),
(44, 'gfgfgf', 120, 60),
(45, 'gfgfgf', 120, 61),
(46, 'gfgfgf', 120, 61),
(47, 'gfgfgf', 120, 61),
(48, 'gfgfgf', 120, 61),
(49, 'gfgfgf', 120, 61),
(50, 'gfgfgf', 120, 62),
(51, 'gfgfgf', 120, 62),
(52, 'gfgfgf', 120, 62),
(53, 'gfgfgf', 120, 62),
(54, 'gfgf', 70, 31),
(55, 'gfgf', 70, 34),
(56, 'gfgf', 70, 36),
(57, 'fdf', 15, 9),
(58, 'XDDDD', 35, 12),
(59, 'XDDDD', 35, 12),
(60, 'XDDDD', 35, 12),
(61, 'XDDD', -20, 15),
(62, 'XDDD', 15, 11),
(63, 'XDDD', 15, 11),
(64, 'XDDD', 15, 11),
(65, 'XDDD', 15, 11),
(66, 'XDDD', 15, 11),
(67, 'XDDD', 15, 11),
(68, 'dadadd', 160, 58),
(69, 'XDDD', 185, 63),
(70, 'XDDD', -15, 13),
(71, 'fff', 1, 1),
(72, 'XDDD', 80, 44),
(73, 'DDDD', 0, 16);

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `rank`
--
ALTER TABLE `rank`
  ADD PRIMARY KEY (`id`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `rank`
--
ALTER TABLE `rank`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
