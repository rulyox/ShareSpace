CREATE TABLE `user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` TEXT NOT NULL,
  `pw` TEXT NOT NULL,
  `name` TEXT NOT NULL,
  CONSTRAINT `user_pk` PRIMARY KEY (`id`)
);

CREATE TABLE `post` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user` INT(11) NOT NULL,
  `text` TEXT NOT NULL,
  CONSTRAINT `post_pk` PRIMARY KEY (`id`),
  CONSTRAINT `post_user_fk` FOREIGN KEY (`user`) REFERENCES user (`id`) ON DELETE CASCADE
);

CREATE TABLE `post_image` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `post` INT(11) NOT NULL,
  `image` TEXT NOT NULL,
  CONSTRAINT `post_image_pk` PRIMARY KEY (`id`),
  CONSTRAINT `post_image_post_fk` FOREIGN KEY (`post`) REFERENCES post (`id`) ON DELETE CASCADE
);

CREATE TABLE `post_like` (
  `post` INT(11) NOT NULL,
  `user` INT(11) NOT NULL,
  CONSTRAINT `post_like_pk` PRIMARY KEY (`post`, `user`),
  CONSTRAINT `post_like_post_fk` FOREIGN KEY (`post`) REFERENCES post (`id`) ON DELETE CASCADE,
  CONSTRAINT `post_like_user_fk` FOREIGN KEY (`user`) REFERENCES user (`id`) ON DELETE CASCADE
);

CREATE TABLE `post_comment` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `post` INT(11) NOT NULL,
  `user` INT(11) NOT NULL,
  `comment` TEXT NOT NULL,
  CONSTRAINT `post_comment_pk` PRIMARY KEY (`id`),
  CONSTRAINT `post_comment_post_fk` FOREIGN KEY (`post`) REFERENCES post (`id`) ON DELETE CASCADE,
  CONSTRAINT `post_comment_user_fk` FOREIGN KEY (`user`) REFERENCES user (`id`) ON DELETE CASCADE
);
