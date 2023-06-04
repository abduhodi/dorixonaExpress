create database dorixona;

use dorixona;

create table regions (
  id int primary key not null,
  name varchar(50)
);

create table districts(
  id int primary key auto_increment not null,
  name varchar(50),
  region_id int
);

create table pharmacies(
  id int primary key auto_increment not null,
  name varchar(255) not null,
  address varchar(255) not null,
  location varchar(255) not null,
  phone varchar(20) not null,
  email varchar(100),
  region_id int,
  district_id int
);

create table types(
  id int primary key auto_increment,
  name varchar(255)
);
create table medicines (
  id int primary key auto_increment,
  name varchar(255) not null,
  manufacturer varchar(255) not null,
  type_id int not null,
  price float,
  expire_date date not null,
  info text not null
);

create table stock(
  id int primary key auto_increment,
  pharmacy_id int,
  medicine_id int,
  quantity int
);
