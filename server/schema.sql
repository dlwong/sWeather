CREATE DATABASE dogs;

USE dogs;

CREATE TABLE dogs (
  id int NOT NULL AUTO_INCREMENT,
  url varchar(200)  NOT NULL,
  PRIMARY KEY (ID)
);

INSERT INTO `dogs`(url) VALUES ('https://weatherdogs.s3-us-west-1.amazonaws.com/cool_dog.jpeg');
INSERT INTO `dogs`(url) VALUES ('https://weatherdogs.s3-us-west-1.amazonaws.com/hoodie_dog.png');
INSERT INTO `dogs`(url) VALUES ('https://weatherdogs.s3-us-west-1.amazonaws.com/puffer_dog.jpeg');
INSERT INTO `dogs`(url) VALUES ('https://weatherdogs.s3-us-west-1.amazonaws.com/rain_dog.png');
INSERT INTO `dogs`(url) VALUES ('https://weatherdogs.s3-us-west-1.amazonaws.com/sad_dog.png');
INSERT INTO `dogs`(url) VALUES ('https://weatherdogs.s3-us-west-1.amazonaws.com/windbreaker_dog.png');

