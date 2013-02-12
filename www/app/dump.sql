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
CREATE DATABASE /*!32312 IF NOT EXISTS*/`bs` /*!40100 DEFAULT CHARACTER SET utf8 */;

/*Table structure for table `tag` */

DROP TABLE IF EXISTS `tag`;

CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_group_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_3BC4F163C865A29C` (`tag_group_id`),
  CONSTRAINT `FK_3BC4F163C865A29C` FOREIGN KEY (`tag_group_id`) REFERENCES `taggroup` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `tag` */

LOCK TABLES `tag` WRITE;

insert  into `tag`(`id`,`tag_group_id`,`name`) values (1,1,'Regular'),(2,1,'Goofy'),(3,1,'Switch'),(4,3,'1 2'),(5,3,'A B'),(6,3,'Beef Carpaccio'),(7,3,'The King'),(8,3,'Bloody Dracula'),(9,3,'Cannonbal/UFO'),(10,3,'Chicken salad'),(11,3,'China air'),(12,3,'Crail'),(13,3,'Cross-rocket'),(14,3,'Japan air'),(15,3,'Lien air'),(16,3,'Melancholy'),(17,3,'Melon'),(18,3,'Method'),(19,3,'Mindy'),(20,3,'Mule'),(21,3,'Mute'),(22,3,'Nosegrab'),(23,3,'Nuclear'),(24,3,'Perfect'),(25,3,'Roast beed'),(26,3,'Rocket air'),(27,3,'Rusty Trombone'),(28,3,'Seabelt'),(29,3,'Slob'),(30,3,'Stalefish'),(31,3,'Squirrel'),(32,3,'Steak Tar Tar'),(33,3,'Swiss cheese air'),(34,3,'Tailfish'),(35,3,'Tailgrab'),(36,3,'Taipan air'),(37,3,'Tindy'),(38,3,'Truck driver'),(39,4,'Back flip'),(40,4,'Front flip'),(41,4,'Wildcat'),(42,4,'Tamedog'),(43,4,'McTwist'),(44,4,'Haakon flip'),(45,4,'Lando-Roll'),(46,4,'Misty'),(47,4,'Chicane'),(48,4,'Rodeo'),(49,4,'Ninety Roll'),(50,4,'Michalchuk'),(51,4,'Rippey flip'),(52,4,'Sato flip'),(53,4,'Corck'),(54,5,'50-50'),(55,5,'Boardslide'),(56,5,'Lipslide'),(57,5,'Blunt slide'),(58,5,'Nose blunt'),(59,5,'Nose slide'),(60,5,'Tail slide'),(61,5,'Nose press'),(62,5,'Tail press'),(63,5,'Smith'),(64,5,'Feeble'),(65,5,'MJ'),(66,6,'Nose pick'),(67,6,'Board stall'),(68,6,'Nose stall'),(69,6,'Tail stall'),(70,6,'Blunt stall'),(71,6,'Tail block'),(72,6,'Nose block'),(73,5,'Zeach'),(74,7,'180s'),(75,7,'360s'),(76,7,'540s'),(77,7,'720s'),(78,7,'900s'),(79,7,'1080s'),(80,7,'1260s'),(81,7,'1440s'),(82,7,'1620s'),(83,7,'Double'),(84,7,'Triple'),(85,7,'One foot'),(86,7,'Stiffy'),(87,7,'Poke'),(88,7,'Tweak'),(89,8,'Invert'),(90,8,'Handplant'),(91,8,'Sad plant'),(92,8,'Elquerial'),(93,8,'Eggplant'),(94,8,'Eggflip'),(95,8,'McEgg'),(96,8,'Andrecht'),(97,8,'Miller flip'),(98,8,'Layback'),(99,8,'HoHo'),(100,8,'Killer stand'),(101,8,'Fresh'),(102,8,'J-Tear'),(103,9,'Ollie'),(104,9,'Nollie'),(105,9,'Butter'),(106,9,'Jib'),(107,9,'Manual'),(108,9,'Nose manual'),(109,9,'Disaster'),(110,9,'Bonk'),(111,9,'Penguin walk'),(112,9,'Tail roll'),(113,9,'Nose roll'),(114,9,'Revert'),(115,5,'Pretzel'),(116,5,'Sameway'),(117,5,'Tap of'),(118,2,'BS'),(119,2,'FS'),(120,3,'Indy');

UNLOCK TABLES;

/*Table structure for table `taggroup` */

DROP TABLE IF EXISTS `taggroup`;

CREATE TABLE `taggroup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `taggroup` */

LOCK TABLES `taggroup` WRITE;

insert  into `taggroup`(`id`,`name`) values (1,'Stance'),(2,'Direction'),(3,'Grabs'),(4,'Spins'),(5,'Slides'),(6,'Stalls'),(7,'Tweaks'),(8,'Plants'),(9,'Surface');

UNLOCK TABLES;

/*Table structure for table `video` */

DROP TABLE IF EXISTS `video`;

CREATE TABLE `video` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vid` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `duration` decimal(10,0) NOT NULL,
  `start` decimal(10,0) DEFAULT NULL,
  `end` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `video` */

LOCK TABLES `video` WRITE;

UNLOCK TABLES;

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

/*Data for the table `videotag` */

LOCK TABLES `videotag` WRITE;

UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
