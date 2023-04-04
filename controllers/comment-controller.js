const commentService = require('../service/comment-service');

class CommentController {
  async createComment(req, res, next) {
    try {
      const user = req.user;
      const {id, content} = req.body;
      if (!id) {
        const newComment = await commentService.createComment(content, user.id);

        res.json(newComment);
      }
      
      const newReply = await commentService.createReply(id, content, user.id );

      res.json(newReply);
    } catch(e) {
        next(e);
    }
  }

  async getAllParentComments(req, res, next) {
    try {
      const parentComments = await commentService.getParentComment();

      res.json(parentComments)
    } catch(e) {
        next(e);
    }
  }
  
}

module.exports = new CommentController();