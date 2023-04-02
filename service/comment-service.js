const ApiError = require('../exceptions/api.error');
const Comment = require('../models/comment-model');

class CommentService {
  async createComment(content, userId) {
    const comment = await Comment.create({content: content, parentId: userId, displayOrder: 1, indentLevel: 0});

    return comment;
  }

  async createReply(id, content, userId) {
    const commentData = await Comment.findOne({where: {id}});
    if (!commentData) {
      throw ApiError.BadRequest('comment does not exist');
    }
    
    const order = commentData.displayOrder + 1;
    const depth = commentData.indentLevel + 1;
    const comment = await Comment.create({content: content, parentId: userId, displayOrder: order, indentLevel: depth});

    return comment;
  }
}

module.exports = new CommentService();