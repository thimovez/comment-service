'use strict';
const ApiError = require('../exceptions/api.error');
const { Comment, CommentPath } = require('../models');
const User = require('../models/user');
const fileService = require('./file-service');

class CommentService {
  async createComment(content, user, f) {
    const comment = await Comment.create({ content, userId: user.id });
    const path = await CommentPath.create({
      ancestor: comment.id, descendant: comment.id, pathLength: 0
    });
    // This service create file table if user attach file to comment
    const file = await fileService.attachedFile(f, comment.id);

    return {
      user,
      comment,
      path,
      file
    };
  }

  async createReply(id, content, user, f) {
    const parentComment = await CommentPath.findOne({
      where: { descendant: id }
    });
    if (!parentComment) {
      throw ApiError.BadRequest('comment does not exist');
    }

    const commentPath = parentComment.pathLength;
    const comment = await Comment.create({ content, userId: user.id });
    const path = await CommentPath.create({
      ancestor: id, descendant: comment.id, pathLength: commentPath + 1
    });
    const file = await fileService.attachedFile(f, comment.id);

    return {
      user,
      comment,
      path,
      file
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
        pathLyength: '0'
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
