/*
SQLyog Ultimate - MySQL GUI v8.2 
MySQL - 5.5.25 : Database - bs
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `tag` */

DROP TABLE IF EXISTS `tag`;

CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_group_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_3BC4F163C865A29C` (`tag_group_id`),
  CONSTRAINT `FK_3BC4F163C865A29C` FOREIGN KEY (`tag_group_id`) REFERENCES `taggroup` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `taggroup` */

DROP TABLE IF EXISTS `taggroup`;

CREATE TABLE `taggroup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `trick` */

DROP TABLE IF EXISTS `trick`;

CREATE TABLE `trick` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `video_id` int(11) NOT NULL,
  `start` int(11) NOT NULL,
  `end` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_1931861A29C1004E` (`video_id`),
  CONSTRAINT `FK_1931861A29C1004E` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `tricktag` */

DROP TABLE IF EXISTS `tricktag`;

CREATE TABLE `tricktag` (
  `trick_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  PRIMARY KEY (`trick_id`,`tag_id`),
  KEY `IDX_1672E82BB281BE2E` (`trick_id`),
  KEY `IDX_1672E82BBAD26311` (`tag_id`),
  CONSTRAINT `FK_1672E82BBAD26311` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`),
  CONSTRAINT `FK_1672E82BB281BE2E` FOREIGN KEY (`trick_id`) REFERENCES `trick` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `video` */

DROP TABLE IF EXISTS `video`;

CREATE TABLE `video` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vid` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `duration` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `videotag` */

DROP TABLE IF EXISTS `videotag`;

CREATE TABLE `videotag` (
  `tag_id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL,
  PRIMARY KEY (`tag_id`,`video_id`),
  KEY `IDX_8D32564BBAD26311` (`tag_id`),
  KEY `IDX_8D32564B29C1004E` (`video_id`),
  CONSTRAINT `FK_8D32564B29C1004E` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`),
  CONSTRAINT `FK_8D32564BBAD26311` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
