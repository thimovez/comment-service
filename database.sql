create TABLE users(
  id VARCHAR PRIMARY KEY UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL ,
  img VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE tokens(
    id VARCHAR PRIMARY KEY UNIQUE REFERENCES users(id),
    refreshToken VARCHAR(255) UNIQUE NOT NULL DEFERRABLE
    constraint pk_refreshToken primary key (refreshToken) deferrable initially immediate
);

create TABLE comments(
  id SERIAL PRIMARY KEY,
  content VARCHAR(255) NOT NULL,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

create TABLE parent_child_comment(
  parent_comment_id INTEGER
  child_comment_id INTEGER
  FOREIGN KEY (parent_comment_id) REFERENCES comments (id)
);


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE topics (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    topic_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE topic_tags (
    topic_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (topic_id, tag_id),
    FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);



created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  parent_id INTEGER,
  ancestor_id INTEGER,
  depth INTEGER
);

CREATE INDEX comments_ancestor_index ON comments (ancestor_id);

INSERT INTO comments (content, parent_id, ancestor_id, depth)
VALUES ('First comment', NULL, 1, 0),
       ('Reply to first comment', 1, 1, 1),
       ('Second comment', NULL, 3, 0),
       ('Reply to second comment', 3, 3, 1),
       ('Reply to reply', 2, 1, 2);


CREATE EXTENSION ltree;

CREATE TABLE comments (
    id INTEGER PRIMARY KEY NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    parent_path LTREE,
    user_id VARCHAR NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
