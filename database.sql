create TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCAHAR(255) NOT NULL,
  email VARCAHAR(255) UNIQUE NOT NULL ,
  img VARCAHAR(255)
);

create TABLE comments(
  id SERIAL PRIMARY KEY,
  content VARCAHAR(255) NOT NULL,
  user_id INTEGER
  FOREIGN KEY (user_id) REFERENCES user(id);
);

create TABLE parent_child_comment(
  parent_comment_id INTEGER
  child_comment_id INTEGER
  FOREIGN KEY (parent_comment_id) REFERENCES comments(id);
);