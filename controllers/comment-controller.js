const commentService = require('../service/comment-service');

class CommentController {
  async createComment(req, res, next) {
    try {
      const user = req.user;
      const {id, content} = req.body;

      const comment = await commentService.createComment(id, content, user);

      res.json(comment);
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

  async sortParentComments(req, res, next) {
    try {
      const body = req.body;

      const sortedComments = await commentService.sortBy(body);
      
      res.json(sortedComments)
    } catch (e) {
      next(e)
    }
  }
  
}

module.exports = new CommentController();