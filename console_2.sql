CREATE DATABASE IF NOT EXISTS entities;

USE entities;

CREATE TABLE IF NOT EXISTS categories(
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
title VARCHAR(255) NOT NULL,
description TEXT(3000) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS places(
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
title VARCHAR(255) NOT NULL UNIQUE,
description TEXT(3000)
);

CREATE TABLE IF NOT EXISTS items(
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
categories_id INT NOT NULL,
places_id INT NOT NULL,
title VARCHAR(255) NOT NULL,
description TEXT(3000) DEFAULT NULL,
date_of_registration DATETIME,
image varchar(255) DEFAULT NULL,
INDEX product_index (title),
FOREIGN KEY (categories_id)
REFERENCES categories(id)
ON DELETE RESTRICT
ON UPDATE CASCADE,
FOREIGN KEY (places_id)
REFERENCES places(id)
ON DELETE RESTRICT
ON UPDATE CASCADE
);


insert into entities.categories(title, description)
values ('furniture', 'Офисная мебель'),
       ('Office equipment', 'Орг техника'),
       ('Other', 'Разное');

select * from   entities.categories;

insert into entities.places (title, description)
values ('Head office', 'Головной офис'),
       ('office', 'Центральный офис'),
       ('Back office', 'Доп офис');

select * from entities.places;

insert into entities.items(categories_id, places_id, title, description, image)
values (1, 1, 'Chair', 'Стул',  null),
       (1, 1, 'Table', 'Стол', null),
       (1, 1, 'Locker', 'Шкаф', null),
       (2, 1, 'Monitor', 'Дисплей', null),
       (2, 1, 'Keyboard', 'Клавивтура', null),
       (2, 1, 'Mouse', 'Копьютерная мышь', null),
       (2, 1, 'Printer', 'Принтер', null),
       (2, 1, 'Copier', 'Ксерокс', null);

select * from entities.items;