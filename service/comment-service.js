'use strict';
const ApiError = require('../exceptions/api.error');
const { Comment, CommentPath, User } = require('../models');
// const User = require('../models/user');
// const fileService = require('./file-service');
const { sequelize } = require('../models/index');

class CommentService {
  async createComment(content, user) {
    const comment = await Comment.create({
      content,
      userId: user.id
    });
    const path = await CommentPath.create({
      ancestor: comment.id,
      descendant: comment.id,
      pathLength: 0,
      isParent: true
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

  async getParentComments() {
    const parentComment = await sequelize.query(
      `SELECT 
      c.id,
      c."content",
      c."createdAt",
      cp."pathLength"
      FROM "comments" AS c
      INNER JOIN "commentsPath" AS cp 
      ON c.id = cp.descendant
      WHERE cp."isParent" = true;`,
      {
        type: sequelize.QueryTypes.SELECT
      }
    );

    return parentComment;
  }

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

  async sortParentComments(sortBy, order, page) {
    const sortedComments =  await CommentPath.findAll({
      where: {
        isParent: true
      },
      offset: page * 2,
      limit: 2,
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
              order: [sortBy, order]
            },
          ]
        }
      ],

    });

    return sortedComments;
  }

  async updateCommentContent(id, content) {
    const comment = await sequelize.query(
      `UPDATE "comments" AS c
      SET "content" = ?, "updatedAt" = now() 
      WHERE c.id = ?
      RETURNING c."content", c."updatedAt";`,
      {
        replacements: [content, id],
        type: sequelize.QueryTypes.UPDATE
      }
    );
    return comment[0][0];
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
