'use strict';
const commentService = require('../service/comment-service');

class CommentController {
  async createComment(req, res, next) {
    try {
      const user = req.user;
      const { content } = req.body;
      // const f = req.file;

      const comment = await commentService.createComment(content, user);

      res.json(comment);
    } catch (e) {
      next(e);
    }
  }

  async createReply(req, res, next) {
    try {
      const id = req.params.id;
      const user = req.user;
      const { content } = req.body;
      // const f = req.file;

      const comment = await commentService.createReply(id, content, user);

      res.json(comment);
    } catch (e) {
      next(e);
    }
  }

  async sortParentComments(req, res, next) {
    try {
      const page = parseInt(req.body.page) - 1 || 0;
      const direction = req.body.direction || 'desc';
      const sort = req.body.sort || 'email';

      const sortedComments = await commentService.sortBy(sort, direction, page);

      res.json(sortedComments);
    } catch (e) {
      next(e);
    }
  }

  async deleteComments(req, res, next) {
    try {
      const id = req.params.id;

      const r = await commentService.deleteComments(id);

      res.json(r);
    } catch (e) {
      next(e);
    }
  }

}

module.exports = new CommentController();
