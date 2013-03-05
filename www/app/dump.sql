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
  CONSTRAINT `FK_3BC4F163C865A29C` FOREIGN KEY (`tag_group_id`) REFERENCES `taggroup` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `tag` */

LOCK TABLES `tag` WRITE;

insert  into `tag`(`id`,`tag_group_id`,`name`) values (1,1,'Regular'),(2,1,'Goofy'),(3,1,'Switch'),(4,3,'1 2'),(5,3,'A B'),(6,3,'Beef Carpaccio'),(7,3,'The King'),(8,3,'Bloody Dracula'),(9,3,'Cannonbal/UFO'),(10,3,'Chicken salad'),(11,3,'China air'),(12,3,'Crail'),(13,3,'Cross-rocket'),(14,3,'Japan air'),(15,3,'Lien air'),(16,3,'Melancholy'),(17,3,'Melon'),(18,3,'Method'),(19,3,'Mindy'),(20,3,'Mule'),(21,3,'Mute'),(22,3,'Nosegrab'),(23,3,'Nuclear'),(24,3,'Perfect'),(25,3,'Roast beed'),(26,3,'Rocket air'),(27,3,'Rusty Trombone'),(28,3,'Seabelt'),(29,3,'Slob'),(30,3,'Stalefish'),(31,3,'Squirrel'),(32,3,'Steak Tar Tar'),(33,3,'Swiss cheese air'),(34,3,'Tailfish'),(35,3,'Tailgrab'),(36,3,'Taipan air'),(37,3,'Tindy'),(38,3,'Truck driver'),(39,4,'Back flip'),(40,4,'Front flip'),(41,4,'Wildcat'),(42,4,'Tamedog'),(43,4,'McTwist'),(44,4,'Haakon flip'),(45,4,'Lando-Roll'),(46,4,'Misty'),(47,4,'Chicane'),(48,4,'Rodeo'),(49,4,'Ninety Roll'),(50,4,'Michalchuk'),(51,4,'Rippey flip'),(52,4,'Sato flip'),(53,4,'Corck'),(54,5,'50-50'),(55,5,'Boardslide'),(56,5,'Lipslide'),(57,5,'Blunt slide'),(58,5,'Nose blunt'),(59,5,'Nose slide'),(60,5,'Tail slide'),(61,5,'Nose press'),(62,5,'Tail press'),(63,5,'Smith'),(64,5,'Feeble'),(65,5,'MJ'),(66,6,'Nose pick'),(67,6,'Board stall'),(68,6,'Nose stall'),(69,6,'Tail stall'),(70,6,'Blunt stall'),(71,6,'Tail block'),(72,6,'Nose block'),(73,5,'Zeach'),(74,7,'180s'),(75,7,'360s'),(76,7,'540s'),(77,7,'720s'),(78,7,'900s'),(79,7,'1080s'),(80,7,'1260s'),(81,7,'1440s'),(82,7,'1620s'),(83,7,'Double'),(84,7,'Triple'),(85,7,'One foot'),(86,7,'Stiffy'),(87,7,'Poke'),(88,7,'Tweak'),(89,8,'Invert'),(90,8,'Handplant'),(91,8,'Sad plant'),(92,8,'Elquerial'),(93,8,'Eggplant'),(94,8,'Eggflip'),(95,8,'McEgg'),(96,8,'Andrecht'),(97,8,'Miller flip'),(98,8,'Layback'),(99,8,'HoHo'),(100,8,'Killer stand'),(101,8,'Fresh'),(102,8,'J-Tear'),(103,9,'Ollie'),(104,9,'Nollie'),(105,9,'Butter'),(106,9,'Jib'),(107,9,'Manual'),(108,9,'Nose manual'),(109,9,'Disaster'),(110,9,'Bonk'),(111,9,'Penguin walk'),(112,9,'Tail roll'),(113,9,'Nose roll'),(114,9,'Revert'),(115,5,'Pretzel'),(116,5,'Sameway'),(117,5,'Tap of'),(118,2,'BS'),(119,2,'FS'),(120,3,'Indy'),(121,10,'Success'),(122,10,'Fail');

UNLOCK TABLES;

/*Table structure for table `taggroup` */

DROP TABLE IF EXISTS `taggroup`;

CREATE TABLE `taggroup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `taggroup` */

LOCK TABLES `taggroup` WRITE;

insert  into `taggroup`(`id`,`name`) values (1,'Stance'),(2,'Direction'),(3,'Grabs'),(4,'Spins'),(5,'Slides'),(6,'Stalls'),(7,'Tweaks'),(8,'Plants'),(9,'Surface'),(10,'Result');

UNLOCK TABLES;

/*Table structure for table `trick` */

DROP TABLE IF EXISTS `trick`;

CREATE TABLE `trick` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `video_id` int(11) NOT NULL,
  `start` int(11) NOT NULL,
  `end` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_start` (`start`,`video_id`),
  KEY `IDX_1931861A29C1004E` (`video_id`),
  CONSTRAINT `FK_1931861A29C1004E` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `trick` */

LOCK TABLES `trick` WRITE;

insert  into `trick`(`id`,`video_id`,`start`,`end`) values (1,1,0,177),(2,1,33,138),(3,1,31,138),(4,1,8,112),(5,1,34,118),(12,2,0,56),(14,2,13,56),(15,3,0,24),(16,3,3,16),(17,4,0,22),(18,5,0,48),(19,6,0,205),(20,7,0,113),(21,8,0,132),(22,9,0,116),(23,10,0,85),(24,11,0,69),(25,12,0,174),(26,12,39,94),(27,12,94,134),(28,12,134,156);

UNLOCK TABLES;

/*Table structure for table `tricktag` */

DROP TABLE IF EXISTS `tricktag`;

CREATE TABLE `tricktag` (
  `trick_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  PRIMARY KEY (`trick_id`,`tag_id`),
  KEY `IDX_1672E82BB281BE2E` (`trick_id`),
  KEY `IDX_1672E82BBAD26311` (`tag_id`),
  CONSTRAINT `FK_1672E82BB281BE2E` FOREIGN KEY (`trick_id`) REFERENCES `trick` (`id`),
  CONSTRAINT `FK_1672E82BBAD26311` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `tricktag` */

LOCK TABLES `tricktag` WRITE;

insert  into `tricktag`(`trick_id`,`tag_id`) values (1,14),(1,26),(2,118),(2,119),(3,18),(3,19),(3,118),(3,119),(4,1),(4,9),(4,10),(5,54),(5,55),(17,41),(18,41),(21,118),(22,118),(25,30),(25,118),(26,6),(26,118),(27,19),(27,21),(28,1),(28,118),(28,119);

UNLOCK TABLES;

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `user` */

LOCK TABLES `user` WRITE;

UNLOCK TABLES;

/*Table structure for table `video` */

DROP TABLE IF EXISTS `video`;

CREATE TABLE `video` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vid` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `duration` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `video` */

LOCK TABLES `video` WRITE;

insert  into `video`(`id`,`vid`,`name`,`duration`) values (1,'3ohob-4TmC4','Urban MTB POV in Chile - Red Bull Valparaíso Cerro Abajo 2013','177'),(2,'Ir2TdfSwH8g','Harlem Shake Miami HEAT Edition','56'),(3,'-j-DxLXFEx4','AMBA0902','24'),(4,'an-dw_CCUiU','Дебил на Жигулях','22'),(5,'2jvLalY6ubc','Dynamic Robot Manipulation','48'),(6,'cNZPRsrwumQ','BigDog Overview (Updated March 2010)','205'),(7,'ISznqY3kESI','RHex Rough-Terrain Robot','113'),(8,'3gi6Ohnp9x8','BigDog Reflexes','132'),(9,'xqMVg5ixhd0','BigDog Evolution','116'),(10,'SSbZrQp-HOk','AlphaDog Proto','85'),(11,'6b4ZZQkcNEo','Sand Flea Jumping Robot','69'),(12,'0hkCcoenLW4','High power militar robotic exoskeleton','174');

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
