-- Adminer 4.6.3 PostgreSQL dump

\connect "Mobowiki";

DROP TABLE IF EXISTS "comment";
DROP SEQUENCE IF EXISTS comment1_comment_id_seq;
CREATE SEQUENCE comment1_comment_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."comment" (
    "user_id" integer NOT NULL,
    "phone_id" integer NOT NULL,
    "created" timestamp DEFAULT now() NOT NULL,
    "comment" character varying NOT NULL,
    "comment_id" integer DEFAULT nextval('comment1_comment_id_seq') NOT NULL,
    CONSTRAINT "comment_phone_id_fkey" FOREIGN KEY (phone_id) REFERENCES phone(pid) NOT DEFERRABLE,
    CONSTRAINT "comment_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "user"(id) NOT DEFERRABLE
) WITH (oids = false);

INSERT INTO "comment" ("user_id", "phone_id", "created", "comment", "comment_id") VALUES
(4,	11,	'2018-07-08 21:07:43.511728',	'asdasda',	2),
(4,	4,	'2018-07-08 21:18:08.811483',	'Godsa',	3),
(4,	26,	'2018-07-08 21:26:53.384385',	'Pixel XL is great!',	4),
(4,	37,	'2018-07-08 21:27:14.601511',	'Oneplus best in class!',	5),
(4,	29,	'2018-07-08 21:27:29.04001',	'LG!',	6),
(4,	22,	'2018-07-08 21:27:43.48017',	'HTC',	7),
(4,	37,	'2018-07-08 21:39:56.303986',	'fasd',	8),
(4,	37,	'2018-07-08 21:48:36.232003',	'third comment!',	9),
(4,	37,	'2018-07-08 21:48:45.63598',	' fourth one!
',	10),
(4,	37,	'2018-07-08 21:48:57.072704',	' fifth one!',	11);

DROP VIEW IF EXISTS "complete_view";
CREATE TABLE "complete_view" ("id" integer, "username" character varying, "comment" character varying, "phone_id" integer, "created" timestamp);


DROP TABLE IF EXISTS "phone";
DROP SEQUENCE IF EXISTS phone_pid_seq;
CREATE SEQUENCE phone_pid_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."phone" (
    "pid" integer DEFAULT nextval('phone_pid_seq') NOT NULL,
    "phone_name" character varying NOT NULL,
    "brand" character varying NOT NULL,
    CONSTRAINT "phone_pid" PRIMARY KEY ("pid")
) WITH (oids = false);

INSERT INTO "phone" ("pid", "phone_name", "brand") VALUES
(36,	'5',	'OnePlus'),
(1,	'Galaxy S8',	'Samsung'),
(2,	'Galaxy S8 Plus',	'Samsung'),
(3,	'Galaxy S7 Edge',	'Samsung'),
(4,	'Galaxy S7',	'Samsung'),
(5,	'Galaxy A7 2017',	'Samsung'),
(6,	'Galaxy A9 Pro',	'Samsung'),
(7,	'Galaxy S6 Edge+',	'Samsung'),
(8,	'Galaxy Note 5',	'Samsung'),
(9,	'Iphone 7 Plus',	'Apple'),
(10,	'Iphone 7',	'Apple'),
(11,	'Iphone 6s Plus',	'Apple'),
(12,	'Ipad Pro 12.9',	'Apple'),
(13,	'Iphone 6s',	'Apple'),
(14,	'Ipad Mini 4',	'Apple'),
(15,	'Iphone SE',	'Apple'),
(16,	'Iphone 6 Plus',	'Apple'),
(17,	'U11',	'HTC'),
(18,	'10',	'HTC'),
(19,	'U Ultra',	'HTC'),
(20,	'Desire 10 Pro',	'HTC'),
(21,	'U Play',	'HTC'),
(22,	'10 Lifestyle',	'HTC'),
(23,	'Desire 728 Ultra',	'HTC'),
(24,	'One X10',	'HTC'),
(25,	'Pixel',	'Google'),
(26,	'Pixel XL',	'Google'),
(27,	'Pixel C',	'Google'),
(28,	'G6',	'LG'),
(29,	'V20',	'LG'),
(30,	'G5',	'LG'),
(31,	'V10',	'LG'),
(32,	'X Venture',	'LG'),
(33,	'Stylus 2',	'LG'),
(34,	'Nexus 5X',	'LG'),
(35,	'G4',	'LG'),
(37,	'3T',	'OnePlus'),
(38,	'3',	'OnePlus'),
(39,	'2',	'OnePlus'),
(40,	'X',	'OnePlus'),
(41,	'One',	'OnePlus');

DROP TABLE IF EXISTS "user";
DROP SEQUENCE IF EXISTS user_id_seq;
CREATE SEQUENCE user_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."user" (
    "id" integer DEFAULT nextval('user_id_seq') NOT NULL,
    "username" character varying NOT NULL,
    "password" character varying NOT NULL,
    CONSTRAINT "user_id" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "user" ("id", "username", "password") VALUES
(4,	'venky',	'2b62ff37392387551c20c959f6c8f148');

DROP TABLE IF EXISTS "user_info";
CREATE TABLE "public"."user_info" (
    "user_id" integer NOT NULL,
    "wishlist_id" integer NOT NULL,
    CONSTRAINT "user_info_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "user"(id) NOT DEFERRABLE,
    CONSTRAINT "user_info_wishlist_id_fkey" FOREIGN KEY (wishlist_id) REFERENCES phone(pid) NOT DEFERRABLE
) WITH (oids = false);

INSERT INTO "user_info" ("user_id", "wishlist_id") VALUES
(4,	18);

DROP VIEW IF EXISTS "view_try";
CREATE TABLE "view_try" ("pid" integer, "phone_name" character varying, "brand" character varying, "user_id" integer, "wishlist_id" integer);


DROP TABLE IF EXISTS "complete_view";
CREATE TABLE "public"."complete_view" (
    "id" integer,
    "username" character varying,
    "comment" character varying,
    "phone_id" integer,
    "created" timestamp
) WITH (oids = false);

DROP TABLE IF EXISTS "view_try";
CREATE TABLE "public"."view_try" (
    "pid" integer,
    "phone_name" character varying,
    "brand" character varying,
    "user_id" integer,
    "wishlist_id" integer
) WITH (oids = false);

-- 2018-07-08 21:55:14.609511+05:30
