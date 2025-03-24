CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "users" (
	"id" UUID NOT NULL DEFAULT uuid_generate_v4() UNIQUE,
	"hash" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"is_activated" BOOL NOT NULL DEFAULT FALSE,
	"is_admin" BOOL NOT NULL DEFAULT FALSE,
	"is_deleted" BOOL NOT NULL DEFAULT FALSE,
	PRIMARY KEY("id")
);


CREATE TABLE "cars" (
	"id" UUID NOT NULL DEFAULT uuid_generate_v4() UNIQUE,
	"name" TEXT,
	"model" TEXT NOT NULL,
	"year" INTEGER NOT NULL,
	"brand" TEXT NOT NULL,
	"color" TEXT NOT NULL,
	"plate" TEXT NOT NULL,
	"renavam" TEXT,
	"aquired_year" INTEGER NOT NULL,
	"user_id" UUID NOT NULL,
	PRIMARY KEY("id")
);


CREATE TABLE "entries" (
	"id" SERIAL NOT NULL UNIQUE,
	"description" TEXT NOT NULL,
	"amount" DECIMAL NOT NULL,
	"odometer" INTEGER,
	"date" DATE NOT NULL,
	"place" TEXT,
	"tags" TEXT,
	"car_id" UUID NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "user_tokens" (
	"id" SERIAL NOT NULL UNIQUE,
	"email" TEXT NOT NULL,
	"token" TEXT NOT NULL,
	"created_at" DATE NOT NULL DEFAULT NOW(),
	PRIMARY KEY("id")
);

ALTER TABLE "entries"
ADD FOREIGN KEY("car_id") REFERENCES "cars"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "cars"
ADD FOREIGN KEY("user_id") REFERENCES "users"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;