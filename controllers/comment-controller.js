'use strict';
const ApiError = require('../exceptions/api.error');
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

  async getParentComments(req, res) {
    try {
      const parentComments = await commentService.getParentComments();

      res.json(parentComments);
    } catch (e) {
      throw ApiError.BadRequest(e);
    }
  }

  async getTreeOfComments(req, res, next) {
    try {
      const id = req.params.id;

      const commentTree = await commentService.getTreeOfComments(id);

      res.json(commentTree);
    } catch (e) {
      next(e);
    }
  }

  async sortParentComments(req, res) {
    try {
      const page = parseInt(req.params.page) - 1 || 0;
      const order = req.params.direction || 'desc';
      const sortBy = req.params.sort || 'email';

      const orderedComments = await commentService.sortParentComments(sortBy, order, page);

      res.json(orderedComments);
    } catch (e) {
      throw ApiError.BadRequest(e);
    }
  }

  async updateCommentContent(req, res, next) {
    try {
      const id = req.params.id;
      const { content } = req.body;

      const comment = await commentService.updateCommentContent(id, content);

      res.json(comment);
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
