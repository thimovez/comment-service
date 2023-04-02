const commentService = require('../service/comment-service');

class CommentController {
  async create(req, res, next) {
    try {
      const user = req.user;
      const {content} = req.body;
      const newComment = await commentService.create(content, user.id);
      console.log(user);
      res.json(newComment);
    } catch(e) {
        next(e);
    }
  }
}

module.exports = new CommentController();