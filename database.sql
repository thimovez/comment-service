create TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL ,
  img VARCHAR(255)
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