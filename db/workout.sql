/*
SQLyog Community v13.1.7 (64 bit)
MySQL - 5.7.26 : Database - workout
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`workout` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `workout`;

/*Table structure for table `body_data` */

DROP TABLE IF EXISTS `body_data`;

CREATE TABLE `body_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `height` float DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `fat` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `body_data` */

/*Table structure for table `comment` */

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `content` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `date` (`date`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

/*Data for the table `comment` */

insert  into `comment`(`id`,`date`,`content`) values 
(6,'2021-11-15',NULL),
(10,'2021-11-14',NULL),
(21,'2021-11-11',NULL),
(22,'2021-11-17',NULL),
(24,'2021-11-18',NULL);

/*Table structure for table `movement` */

DROP TABLE IF EXISTS `movement`;

CREATE TABLE `movement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL,
  `part` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `NAME` (`name`),
  UNIQUE KEY `name_2` (`name`),
  UNIQUE KEY `name_3` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

/*Data for the table `movement` */

insert  into `movement`(`id`,`pid`,`part`,`name`,`type`) values 
(1,0,'胸部','平板卧推',0),
(2,0,'胸部','哑铃上斜卧推',0),
(3,0,'胸部','绳索夹胸',0),
(4,1,'背部','引体向上',1),
(5,1,'背部','杠铃划船',0),
(6,1,'背部','高位下拉',0),
(7,2,'肩部','哑铃坐姿推举',0),
(8,2,'肩部','哑铃侧平举',0),
(9,2,'肩部','面拉',0),
(10,3,'臀腿','深蹲',0),
(11,3,'臀腿','硬拉',0),
(12,3,'臀腿','腿举',0),
(13,4,'二头','哑铃弯举',0),
(14,4,'二头','杠铃弯举',0),
(15,4,'二头','牧师椅弯举',0),
(16,5,'三头','绳索下压',0),
(17,5,'三头','仰卧臂屈伸',0),
(18,5,'三头','绳索过头臂屈伸',0),
(19,6,'核心','平板支撑',2),
(20,6,'核心','卷腹',0),
(21,6,'核心','仰卧抬腿',1),
(22,0,'胸部','test1',0),
(23,2,'肩部','绳索单侧侧平举',0),
(24,5,'三头','哑铃颈后臂屈伸',0),
(25,0,'胸部','test2',2),
(26,7,'有氧','慢跑',2),
(29,0,'胸部','test4',2),
(30,0,'胸部','plan1',1);

/*Table structure for table `plan` */

DROP TABLE IF EXISTS `plan`;

CREATE TABLE `plan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

/*Data for the table `plan` */

insert  into `plan`(`id`,`name`) values 
(15,'plan2'),
(10,'跑步');

/*Table structure for table `plan_detail` */

DROP TABLE IF EXISTS `plan_detail`;

CREATE TABLE `plan_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `name` varchar(255) NOT NULL COMMENT '计划名称',
  `move_id` int(11) NOT NULL COMMENT '动作编号',
  PRIMARY KEY (`id`),
  KEY `name` (`name`),
  KEY `move_id` (`move_id`),
  CONSTRAINT `move_id` FOREIGN KEY (`move_id`) REFERENCES `movement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8;

/*Data for the table `plan_detail` */

insert  into `plan_detail`(`id`,`name`,`move_id`) values 
(19,'跑步123',1),
(20,'跑步123',3),
(34,'plan3',6),
(35,'plan3',9),
(36,'plan3',22),
(37,'plan3',3),
(38,'plan3',2),
(39,'卧推',1),
(52,'plan1',10),
(53,'plan1',11),
(54,'plan1',12),
(55,'plan1',22),
(56,'plan1',23),
(57,'plan1',25),
(66,'跑步',26),
(67,'跑步',10),
(68,'跑步',12),
(69,'plan2',23),
(70,'plan2',22),
(71,'plan2',25),
(72,'plan2',29),
(73,'test1',26);

/*Table structure for table `record` */

DROP TABLE IF EXISTS `record`;

CREATE TABLE `record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `move_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `count` int(11) NOT NULL,
  `weight` float DEFAULT '0',
  `times` int(11) DEFAULT '0',
  `volume` float NOT NULL DEFAULT '0',
  `unit` tinytext,
  `timer` int(11) DEFAULT '0' COMMENT '时长',
  `distance` float DEFAULT '0' COMMENT '距离',
  `breaktime` int(11) NOT NULL DEFAULT '0' COMMENT '组间休息',
  `comment` tinytext COMMENT '评论',
  PRIMARY KEY (`id`),
  KEY `id` (`move_id`)
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8;

/*Data for the table `record` */

insert  into `record`(`id`,`move_id`,`date`,`count`,`weight`,`times`,`volume`,`unit`,`timer`,`distance`,`breaktime`,`comment`) values 
(1,1,'2021-10-19 00:00:00',1,50,8,400,'kg',0,0,90,''),
(2,1,'2021-10-18 00:00:00',2,50,8,400,'kg',0,0,90,''),
(3,1,'2021-10-18 00:00:00',1,100,10,1000,'kg',0,0,90,''),
(4,1,'2021-10-16 00:00:00',1,50,8,400,'kg',0,0,90,''),
(5,3,'2021-10-18 00:00:00',1,50,6,300,'kg',0,0,90,''),
(6,2,'2021-10-18 00:00:00',1,55,10,550,'kg',0,0,90,''),
(7,1,'2021-10-18 00:00:00',3,60,5,300,'kg',0,0,90,''),
(8,2,'2021-10-18 00:00:00',2,70,5,350,'kg',0,0,90,''),
(9,6,'2021-10-16 00:00:00',1,80,5,400,'kg',0,0,90,''),
(10,12,'2021-10-19 00:00:00',1,100,8,800,'kg',0,0,120,''),
(11,13,'2021-10-19 00:00:00',1,50,10,500,'lbs',0,0,120,''),
(12,3,'2021-10-19 00:00:00',3,50,10,500,'lbs',0,0,120,''),
(13,1,'2021-10-20 00:00:00',1,50,10,500,'lbs',0,0,14,NULL),
(14,1,'2021-10-18 00:00:00',4,40,8,320,'kg',0,0,89,NULL),
(15,16,'2021-10-10 00:00:00',1,90,10,900,'lbs',0,0,3,NULL),
(16,16,'2021-10-10 00:00:00',2,90,10,900,'lbs',0,0,4,NULL),
(17,16,'2021-10-10 00:00:00',3,90,100,900,'lbs',0,0,4,NULL),
(18,16,'2021-10-10 00:00:00',4,90,8,720,'lbs',0,0,78,NULL),
(19,17,'2021-10-07 00:00:00',1,15,12,180,'kg',0,0,77,NULL),
(20,17,'2021-10-07 00:00:00',2,15,12,180,'kg',0,0,66,NULL),
(21,17,'2021-10-07 00:00:00',3,15,12,180,'kg',0,0,3,NULL),
(22,17,'2021-10-07 00:00:00',4,15,12,180,'kg',0,0,90,NULL),
(28,7,'2021-12-01 20:25:32',1,50,12,600,'lbs',NULL,0,0,NULL),
(29,7,'2021-12-01 20:25:31',2,50,12,600,'lbs',NULL,0,0,NULL),
(30,7,'2021-12-01 20:25:36',3,50,10,500,'lbs',NULL,0,0,NULL),
(31,7,'2021-12-01 20:25:34',4,50,15,750,'lbs',NULL,0,0,NULL),
(32,8,'2021-12-01 20:25:37',1,50,15,750,'lbs',NULL,0,0,NULL),
(33,8,'2021-12-01 20:25:41',2,50,15,750,'lbs',NULL,0,0,NULL),
(36,9,'2021-11-11 20:25:42',1,75,12,900,'lbs',NULL,0,0,NULL),
(37,9,'2021-11-11 20:25:48',2,75,12,900,'lbs',NULL,0,0,NULL),
(38,9,'2021-11-11 20:25:53',3,75,12,900,'lbs',NULL,0,0,NULL),
(39,9,'2021-11-11 20:25:50',4,75,12,900,'lbs',NULL,0,0,NULL),
(40,23,'2021-11-06 00:00:00',1,50,8,400,'lbs',0,0,0,NULL),
(41,23,'2021-11-06 00:00:00',2,50,8,400,'lbs',0,0,0,NULL),
(42,23,'2021-11-06 00:00:00',3,50,8,400,'lbs',0,0,0,NULL),
(43,23,'2021-11-06 00:00:00',4,50,8,400,'lbs',0,0,0,NULL),
(44,24,'2021-11-06 00:00:00',1,30,10,300,'lbs',0,0,0,NULL),
(45,24,'2021-11-06 00:00:00',2,30,10,300,'lbs',0,0,0,NULL),
(46,24,'2021-11-06 00:00:00',3,30,10,300,'lbs',0,0,0,NULL),
(48,24,'2021-11-06 00:00:00',4,50,10,500,'lbs',0,0,0,NULL),
(49,16,'2021-11-06 00:00:00',1,60,12,720,'lbs',0,0,0,NULL),
(50,16,'2021-11-06 00:00:00',2,60,12,720,'lbs',0,0,0,NULL),
(51,16,'2021-11-06 00:00:00',3,60,12,720,'lbs',0,0,0,NULL),
(52,16,'2021-11-06 00:00:00',4,60,12,720,'lbs',0,0,0,NULL),
(53,17,'2021-11-06 00:00:00',1,15,15,225,'kg',0,0,0,NULL),
(54,17,'2021-11-06 00:00:00',2,15,12,180,'kg',0,0,0,NULL),
(55,17,'2021-11-06 00:00:00',3,15,10,150,'kg',0,0,0,NULL),
(56,17,'2021-11-06 00:00:00',4,15,10,150,'kg',0,0,0,NULL),
(57,18,'2021-11-06 00:00:00',1,60,15,900,'lbs',0,0,0,NULL),
(58,18,'2021-11-06 00:00:00',2,75,12,900,'lbs',0,0,0,NULL),
(59,18,'2021-11-06 00:00:00',3,75,12,900,'lbs',0,0,0,NULL),
(60,18,'2021-11-06 00:00:00',4,60,12,720,'lbs',0,0,0,NULL),
(61,1,'2021-12-01 20:25:24',1,50,8,400,'kg',NULL,0,0,''),
(62,1,'2021-12-01 20:25:20',2,50,8,400,'kg',NULL,0,0,''),
(64,22,'2021-12-02 15:15:07',1,50,10,0,'kg',NULL,0,100,'123'),
(84,22,'2021-11-01 00:00:00',1,25,10,250,'kg',0,0,0,NULL),
(85,25,'2021-12-01 00:00:00',1,0,0,0,NULL,60,NULL,0,NULL),
(97,25,'2021-12-02 20:07:09',1,0,0,0,NULL,3600,50,0,NULL),
(111,25,'2021-12-01 22:35:07',2,0,0,0,NULL,26,0,0,NULL),
(112,25,'2021-12-02 20:07:14',3,0,0,0,NULL,5,0,0,NULL),
(115,25,'2021-12-02 19:11:08',2,30,12,360,'kg',4,0,0,NULL),
(116,1,'2021-12-02 00:00:00',1,50,10,500,'kg',0,0,0,NULL),
(117,1,'2021-12-02 20:03:22',4,30,16,480,'kg',0,0,0,NULL),
(119,3,'2021-12-02 00:00:00',1,50,6,300,'kg',0,0,0,NULL),
(120,1,'2021-12-02 19:09:03',3,30,12,360,'kg',0,0,0,NULL),
(121,3,'2021-12-02 00:00:00',3,50,6,300,'kg',0,0,0,NULL),
(122,26,'2021-12-06 00:00:00',1,0,0,0,NULL,1435,3410,0,NULL),
(137,1,'2021-12-02 00:00:00',2,30,12,360,'kg',0,0,0,NULL),
(138,22,'2021-12-08 00:00:00',1,50,12,600,'kg',0,0,0,NULL),
(139,22,'2021-12-08 00:00:00',2,50,12,600,'kg',0,0,0,NULL),
(140,25,'2021-12-08 00:00:00',1,0,0,0,NULL,124,50,0,NULL),
(141,25,'2021-12-08 00:00:00',2,0,0,0,NULL,5,0,0,NULL),
(142,1,'2021-12-08 00:00:00',1,50,8,400,'kg',0,0,0,NULL),
(143,1,'2021-12-08 00:00:00',2,50,12,600,'kg',0,0,0,NULL),
(144,25,'2021-12-08 00:00:00',3,0,0,0,NULL,9,100,0,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
