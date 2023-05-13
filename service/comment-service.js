'use strict';
const ApiError = require('../exceptions/api.error');
const { Comment, CommentPath } = require('../models');
const User = require('../models/user');
// const fileService = require('./file-service');
const { sequelize } = require('../models/index');

class CommentService {
  async createComment(content, user) {
    const comment = await Comment.create({
      content, userId: user.id
    });
    const path = await CommentPath.create({
      ancestor: comment.id, descendant: comment.id, pathLength: 0
    });
    // This service create file table if user attach file to comment
    // const file = await fileService.attachedFile(f, comment.id);

    return {
      user,
      comment,
      path
    };
  }

  async createReply(id, content, user) {
    const parentComment = await Comment.findOne({
      where: { id }
    });
    if (!parentComment) {
      throw ApiError.BadRequest('comment does not exist');
    }

    const comment = await Comment.create({ content, userId: user.id });
    const path = await CommentPath.create({
      ancestor: comment.id, descendant: comment.id, pathLength: 0
    });

    const p = await sequelize.query(
      `INSERT INTO "commentsPath" (ancestor, descendant, "pathLength")
      SELECT ancestor, ?, "pathLength"  + 1
      FROM "commentsPath"
      WHERE descendant = ? RETURNING *`, {
        replacements: [comment.id, id]
      }
    );
    // const commentPath = parentComment.pathLength;
    // const comment = await Comment.create({ content, userId: user.id });
    // const path = await CommentPath.create({
    //   ancestor: id, descendant: comment.id, pathLength: commentPath + 1
    // });
    // const displayOrder = parentComment.displayOrder + 1;
    // const indentLevel = parentComment.indentLevel + 1;
    // const reply = await Comment.create({
    //   content, userId: user.id, displayOrder, indentLevel
    // });
    // const file = await fileService.attachedFile(f, reply.id);
    // getTreeofCommentsByID
    return {
      user,
      path,
      p
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

  async deleteComments(id) {
    await Comment.destroy({ where: { id }, individualHooks: true });

    const res = {
      res: 'succes'
    };

    return res;
  }

}

module.exports = new CommentService();
