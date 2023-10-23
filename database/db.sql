/*
 Navicat Premium Data Transfer

 Source Server         : Mysql
 Source Server Type    : MySQL
 Source Server Version : 80100 (8.1.0)
 Source Host           : localhost:3306
 Source Schema         : tesis

 Target Server Type    : MySQL
 Target Server Version : 80100 (8.1.0)
 File Encoding         : 65001

 Date: 23/10/2023 15:46:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for data
-- ----------------------------
DROP TABLE IF EXISTS `data`;
CREATE TABLE `data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `voltaje_bat` float DEFAULT NULL,
  `combustible` int DEFAULT NULL,
  `cant_aceite` int DEFAULT NULL,
  `codigo_errores` varchar(100) DEFAULT NULL,
  `kilometraje` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of data
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for devices
-- ----------------------------
DROP TABLE IF EXISTS `devices`;
CREATE TABLE `devices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clave` varchar(100) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `clave` (`clave`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of devices
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for enterprises
-- ----------------------------
DROP TABLE IF EXISTS `enterprises`;
CREATE TABLE `enterprises` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `RFC` varchar(13) DEFAULT NULL,
  `calle` varchar(100) DEFAULT NULL,
  `num_int` int DEFAULT NULL,
  `num_ext` int DEFAULT NULL,
  `cp` int DEFAULT NULL,
  `colonia` varchar(100) DEFAULT NULL,
  `estado` varchar(100) DEFAULT NULL,
  `municipio` varchar(100) DEFAULT NULL,
  `logo` longblob,
  `is_active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `RFC` (`RFC`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of enterprises
-- ----------------------------
BEGIN;
INSERT INTO `enterprises` (`id`, `nombre`, `RFC`, `calle`, `num_int`, `num_ext`, `cp`, `colonia`, `estado`, `municipio`, `logo`, `is_active`) VALUES (1, 'Transportes Solo', 'SOLS761107JM1', 'Avenida Elias Zamora Verduzco', NULL, 2094, 28219, 'Barrio 5', 'Colima', 'Manzanillo', NULL, 1);
COMMIT;

-- ----------------------------
-- Table structure for operators
-- ----------------------------
DROP TABLE IF EXISTS `operators`;
CREATE TABLE `operators` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `telefono` int DEFAULT NULL,
  `telefono_2` int DEFAULT NULL,
  `RFC` varchar(13) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `id_enterprise` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `RFC` (`RFC`),
  KEY `id_enterprise` (`id_enterprise`),
  CONSTRAINT `operators_ibfk_1` FOREIGN KEY (`id_enterprise`) REFERENCES `enterprises` (`id`),
  CONSTRAINT `operators_ibfk_2` FOREIGN KEY (`id_enterprise`) REFERENCES `enterprises` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of operators
-- ----------------------------
BEGIN;
INSERT INTO `operators` (`id`, `nombre`, `telefono`, `telefono_2`, `RFC`, `apellido`, `is_active`, `id_enterprise`) VALUES (1, 'Dorian ', 3143243, 314111345, 'RAAD020220UA5', 'Samuel', 1, NULL);
INSERT INTO `operators` (`id`, `nombre`, `telefono`, `telefono_2`, `RFC`, `apellido`, `is_active`, `id_enterprise`) VALUES (2, 'Juancho', 3143423, 31245345, 'REDS324435RTD', 'Sanchez', 1, 1);
INSERT INTO `operators` (`id`, `nombre`, `telefono`, `telefono_2`, `RFC`, `apellido`, `is_active`, `id_enterprise`) VALUES (3, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for trucks
-- ----------------------------
DROP TABLE IF EXISTS `trucks`;
CREATE TABLE `trucks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `placa` varchar(9) DEFAULT NULL,
  `eco` int DEFAULT NULL,
  `nombre_camion` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `marca` varchar(100) DEFAULT NULL,
  `modelo` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `año` int DEFAULT NULL,
  `id_operador` int DEFAULT NULL,
  `id_enterprise` int DEFAULT NULL,
  `id_device` int DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_operador` (`id_operador`),
  KEY `id_enterprise` (`id_enterprise`),
  KEY `id_device` (`id_device`),
  CONSTRAINT `trucks_ibfk_1` FOREIGN KEY (`id_operador`) REFERENCES `operators` (`id`),
  CONSTRAINT `trucks_ibfk_2` FOREIGN KEY (`id_enterprise`) REFERENCES `enterprises` (`id`),
  CONSTRAINT `trucks_ibfk_3` FOREIGN KEY (`id_device`) REFERENCES `devices` (`id`),
  CONSTRAINT `trucks_ibfk_4` FOREIGN KEY (`id_operador`) REFERENCES `operators` (`id`),
  CONSTRAINT `trucks_ibfk_5` FOREIGN KEY (`id_enterprise`) REFERENCES `enterprises` (`id`),
  CONSTRAINT `trucks_ibfk_6` FOREIGN KEY (`id_device`) REFERENCES `devices` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of trucks
-- ----------------------------
BEGIN;
INSERT INTO `trucks` (`id`, `placa`, `eco`, `nombre_camion`, `marca`, `modelo`, `año`, `id_operador`, `id_enterprise`, `id_device`, `is_active`) VALUES (1, 'RJW4323', 1, 'Alpha', 'Volvo', 'N GEN', 2012, 1, 1, NULL, 1);
INSERT INTO `trucks` (`id`, `placa`, `eco`, `nombre_camion`, `marca`, `modelo`, `año`, `id_operador`, `id_enterprise`, `id_device`, `is_active`) VALUES (2, 'FDE2312', 32, 'Zeta', 'Keenworth', 'T800', 2023, 2, 1, NULL, 1);
INSERT INTO `trucks` (`id`, `placa`, `eco`, `nombre_camion`, `marca`, `modelo`, `año`, `id_operador`, `id_enterprise`, `id_device`, `is_active`) VALUES (3, 'XYZ123', 2, 'Beta', 'MercedesBenz', 'Actros', 2020, 1, NULL, NULL, NULL);
INSERT INTO `trucks` (`id`, `placa`, `eco`, `nombre_camion`, `marca`, `modelo`, `año`, `id_operador`, `id_enterprise`, `id_device`, `is_active`) VALUES (4, 'XYZ123', 2, 'Beta', 'MercedesBenz', 'Actros', 2020, 1, NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `contraseña` varchar(128) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `id_empresa` int DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `id_device` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_device` (`id_device`),
  KEY `id_empresa` (`id_empresa`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_device`) REFERENCES `devices` (`id`),
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`id_empresa`) REFERENCES `enterprises` (`id`),
  CONSTRAINT `users_ibfk_3` FOREIGN KEY (`id_device`) REFERENCES `devices` (`id`),
  CONSTRAINT `users_ibfk_4` FOREIGN KEY (`id_empresa`) REFERENCES `enterprises` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
