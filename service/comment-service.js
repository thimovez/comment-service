const db = require('../database/db');
const {QueryTypes} = require('sequelize');
const ApiError = require('../exceptions/api.error');
const {Comment, CommentPath} = require('../models/comment-model');

class CommentService {
  async createComment(content, userId) {
    const comment = await Comment.create({content: content, parentId: userId});
    const path = await CommentPath.create({ancestor: comment.id, descendant: comment.id, path_length: 0});

    return {
      comment: comment,
      path: path
    }
  }

  async createReply(id, content, userId) {
    const descendant = id;
    const parentComment = await CommentPath.findOne({where: {descendant}});
    if (!parentComment) {
      throw ApiError.BadRequest('comment does not exist');
    }

    const comment_path = parentComment.path_length;
    const comment = await Comment.create({content: content, parentId: userId});
    const path = await CommentPath.create({ancestor: id, 
                                          descendant: comment.id,
                                          path_length: comment_path + 1});

    return {
      comment: comment,
      path: path
    };
  }

  async getParentComment() {
    const parentComment = await db.query(`SELECT  c.id, c."content", c."parentId", cp.ancestor, cp.descendant, cp.path_length 
                                              FROM "comments" c  
                                              INNER JOIN "comments_paths" cp ON c.id = cp.descendant 
                                              WHERE cp.path_length = 0`, {
                                                type: QueryTypes.SELECT
                                              });
    
    return parentComment;
  }
}

module.exports = new CommentService();