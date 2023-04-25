'use strict';
const ApiError = require('../exceptions/api.error');
const { Comment, CommentPath } = require('../models');
const User = require('../models/user');
const fileService = require('./file-service');

class CommentService {
  async createComment(id, content, user, file) {
    if (typeof file !== 'undefined') {
      const fileData = fileService.getFileFormat(file);
      fileService.verifyFileFormat(fileData);

      return fileData;
    }

    if (typeof id !== 'undefined') {
      const reply = await this.createReply(id, content, user);
      return reply;
    }

    const comment = await Comment.create({ content, user_id: user.id, });
    const path = await CommentPath.create({
      ancestor: comment.id, descendant: comment.id, path_length: 0
    });

    return {
      user,
      comment,
      path
    };
  }

  async createReply(id, content, user) {
    const parentComment = await CommentPath.findOne({
      where: { descendant: id }
    });
    if (!parentComment) {
      throw ApiError.BadRequest('comment does not exist');
    }

    const commentPath = parentComment.path_length;
    const comment = await Comment.create({ content, user_id: user.id });
    const path = await CommentPath.create({
      ancestor: id, descendant: comment.id, path_length: commentPath + 1
    });

    return {
      user,
      comment,
      path
    };
  }

  async sortBy(sort, direction, page) {
    if (sort === 'firsName') {
      const sortedComments = this.sortParentComments(sort, direction, page);

      return sortedComments;
    }

    if (sort === 'createdAt') {
      const sortedComments = this.sortParentComments(sort, direction, page);

      return sortedComments;
    }

    const sortedComments = this.sortParentComments(sort, direction, page);

    return sortedComments;
  }

  async sortParentComments(value, direction, page) {
    const sortedComments =  await CommentPath.findAll({
      where: {
        path_length: '0'
      },
      offset: page * 2,
      limit: 2,
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
              order: [value, direction]
            },
          ]
        }
      ],

    });

    return sortedComments;
  }

}

module.exports = new CommentService();
