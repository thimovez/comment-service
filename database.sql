CREATE TABLE "users" (
  "id" varchar(255) PRIMARY KEY NOT NULL,
  "firstName" varchar(255) NOT NULL,
  "email" varchar(255) UNIQUE NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "tokens" (
  "id" varchar(255) PRIMARY KEY NOT NULL,
  "refreshToken" varchar(255) NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now()),
  "user_id" varchar(255)
);

CREATE TABLE "comments" (
  "id" serial4 PRIMARY KEY NOT NULL,
  "content" varchar NOT NULL,
  "user_id" varchar(255) NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT ('0000-00-00 00:00:00')
);

CREATE TABLE "comments_path" (
  "ancestor" integer NOT NULL,
  "descendant" integer NOT NULL,
  "path_length" integer DEFAULT 0,
  PRIMARY KEY ("ancestor", "descendant")
);

ALTER TABLE "comments" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "tokens" ("user_id");

ALTER TABLE "comments_path" ADD FOREIGN KEY ("ancestor") REFERENCES "comments" ("id");

ALTER TABLE "comments_path" ADD FOREIGN KEY ("descendant") REFERENCES "comments" ("id");