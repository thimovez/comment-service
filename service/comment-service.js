const Comment = require('../models/comment-model');

class CommentService {
  async createComment(content, userId) {
    const comment = await Comment.create({content: content, parentId: userId, displayOrder: 1, indentLevel: 0});

    return comment;
  }
}

module.exports = new CommentService();