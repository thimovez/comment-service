const commentService = require('../service/comment-service');

class CommentController {
  async createComment(req, res, next) {
    try {
      const user = req.user;
      const {id, content} = req.body;
      const file = req.file;

      const comment = await commentService.createComment(id, content, user, file);

      res.json(comment);
    } catch(e) {
        next(e);
    }
  }

  async sortParentComments(req, res, next) {
    try {
      const page = parseInt(req.body.page) - 1 || 0;
      const direction = req.body.direction || 'desc';
      let sort = req.body.sort || 'email';
      
      const sortedComments = await commentService.sortBy(sort, direction, page);
      
      res.json(sortedComments)
    } catch (e) {
      next(e)
    }
  }
  
}

module.exports = new CommentController();