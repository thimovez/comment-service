const db = require('../database/db');
const {QueryTypes} = require('sequelize');
const ApiError = require('../exceptions/api.error');
const {Comment, CommentPath} = require('../models/comment-model');

class CommentService {
  async createComment(id, content, user) {
    if(typeof id !== 'undefined') {
      const reply = await this.createReply(id, content, user);
      return reply;
    }
    
    const comment = await Comment.create({content: content, parentId: user.id});
    const path = await CommentPath.create({ancestor: comment.id, descendant: comment.id, path_length: 0});

    return {
      userData: user,
      comment: comment,
      path: path
    }
  }

  async createReply(id, content, user) {
    const descendant = id;
    const parentComment = await CommentPath.findOne({where: {descendant}});
    if (!parentComment) {
      throw ApiError.BadRequest('comment does not exist');
    }

    const comment_path = parentComment.path_length;
    const comment = await Comment.create({content: content, parentId: user.id});
    const path = await CommentPath.create({ancestor: id, 
                                          descendant: comment.id,
                                          path_length: comment_path + 1});

    return {
      userData: user,
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

  async sortParentCommentsByEmail() {
    const sortedComments = await db.query(`SELECT u.email, u."firsName", c."createdAt", c."parentId", c."content", cp.ancestor, cp.descendant, cp.path_length
    FROM "comments" c  
    INNER JOIN comments_paths cp ON c.id = cp.descendant 
    INNER JOIN users u ON u.id = c."parentId" 
    WHERE cp.path_length = 0
    order by u.email`, {
      type: QueryTypes.SELECT
    })

    return sortedComments
  }

  async sortBy(...item) {
    

    return item;
  }
}

module.exports = new CommentService();
