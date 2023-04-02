const commentService = require('../service/comment-service');

class CommentController {
  async createComment(req, res, next) {
    try {
      const user = req.user;
      const {content} = req.body;
      const newComment = await commentService.createComment(content, user.id);
      
      res.json(newComment);
    } catch(e) {
        next(e);
    }
  }

  async createReply(req, res, next) {
    try {
      const user = req.user;
      const {content} = req.body;
      const id = req.params.id;

      const newReply = await commentService.createReply(id, content, user.id );

      res.json(newReply)
    } catch(e) {
        next(e);
    }
  }
}

module.exports = new CommentController();