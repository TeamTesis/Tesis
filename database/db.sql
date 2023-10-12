CREATE TABLE `trucks` (
  `id` int AUTO_INCREMENT,
  `placa` varchar(9),
  `eco` varchar(100),
  `nombre` varchar(100),
  `marca` varchar(100),
  `modelo` varchar(100),
  `año` int,
  `id_operador` int,
  `id_enterprise` int,
  `id_device` int,
  `is_active` tinyint(1),
  PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
  `id` int AUTO_INCREMENT,
  `nombre` varchar(100),
  `apellido` varchar(100),
  `contraseña` varchar(128),
  `correo` varchar(100),
  `id_empresa` int,
  `is_active` tinyint(1),
  `id_device` int,
  PRIMARY KEY (`id`)
);

CREATE TABLE `devices` (
  `id` int AUTO_INCREMENT,
  `clave` varchar(100) UNIQUE,
  `nombre` varchar(100),
  `status` tinyint(1),
  PRIMARY KEY (`id`)
);

CREATE TABLE `operators` (
  `id` int AUTO_INCREMENT,
  `nombre` varchar(100),
  `telefono` int,
  `telefono_2` int,
  `RFC` varchar(13) UNIQUE,
  `apellido` varchar(100),
  `is_active` tinyint(1),
  `id_enterprise` int,
  PRIMARY KEY (`id`)
);

CREATE TABLE `enterprises` (
  `id` int AUTO_INCREMENT,
  `nombre` varchar(100),
  `RFC` varchar(13) UNIQUE,
  `calle` varchar(100),
  `num_int` int,
  `num_ext` int,
  `cp` int,
  `colonia` varchar(100),
  `estado` varchar(100),
  `municipio` varchar(100),
  `logo` longblob,
  `is_active` tinyint(1),
  PRIMARY KEY (`id`)
);

CREATE TABLE `data` (
  `id` int AUTO_INCREMENT,
  `voltaje_bat` float,
  `combustible` int,
  `cant_aceite` int,
  `codigo_errores` varchar(100),
  `kilometraje` bigint,
  PRIMARY KEY (`id`)
);
