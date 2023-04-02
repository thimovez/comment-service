const Comment = require('../models/comment-model');

class CommentService {
  async create(content, userId) {
    const comment = await Comment.create({content: content, parentId: userId });
    return comment;
  }
}

module.exports = new CommentService();