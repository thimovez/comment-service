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
    // const file = await fileService.attachedFile(f, reply.id);
    // getTreeofCommentsByID
    return {
      user,
      path,
      p
    };
  }

  // Достать только родительские комментарии
  // Обновлять контент комментария
  async getTreeOfComments(id) {
    const commentTree = await sequelize.query(
      `SELECT
      c.id,
      c."content",
      cp."pathLength",
      cp.ancestor,
      cp.descendant,
      array_agg(t.ancestor ORDER BY t.ancestor)
      FROM
      "comments" AS c
      JOIN "commentsPath" AS cp
      ON c.id = cp.descendant
      JOIN "commentsPath" AS t
      ON t.descendant = cp.descendant
      WHERE cp.ancestor = ?
      GROUP BY c.id, cp.id;`,
      {
        replacements: [id],
        type: sequelize.QueryTypes.SELECT
      }
    );

    return commentTree;
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
        pathLength: '0'
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
    await sequelize.query(
      `DELETE FROM "comments" 
      WHERE id IN (
          SELECT descendant FROM "comments" c
          JOIN "commentsPath" cp ON c.id = cp.descendant
          WHERE cp.ancestor = ?
      );`,
      { replacements: [id] }
    );

    const res = {
      res: 'comment deleted'
    };

    return res;
  }

}

module.exports = new CommentService();
