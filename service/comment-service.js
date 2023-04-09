const ApiError = require('../exceptions/api.error');
const {Comment, CommentPath} = require('../models/comment-model');
const User = require('../models/user-model');
const { Op } = require('sequelize');
const sequelize = require('../database/db');

class CommentService {
  async createComment(id, content, user) {
    if(typeof id !== 'undefined') {
      const reply = await this.createReply(id, content, user);
      return reply;
    }
    
    const comment = await Comment.create({content: content, parentId: user.id});
    const path = await CommentPath.create({ancestor: comment.id, descendant: comment.id, path_length: 0});

    return {
      userData: user,
      comment: comment,
      path: path
    }
  }
  
  async createReply(id, content, user) {
    const parentComment = await CommentPath.findOne({where: {descendant: id}});
    if (!parentComment) {
      throw ApiError.BadRequest('comment does not exist');
    }

    const commentPath = parentComment.path_length;
    const comment = await Comment.create({content: content, parentId: user.id});
    const path = await CommentPath.create({ancestor: id, 
                                          descendant: comment.id,
                                          path_length: commentPath + 1});

    return {
      userData: user,
      comment: comment,
      path: path
    };
  }

  async sortBy(body) {
    if(body.firstName === 'firsName' && body.direction !== '') {
      const sortedComments = this.sortParentComments(body.username, body.direction, body.page);

      return sortedComments;
    }

    if(body.email === 'email' && body.direction !== ''){
      const sortedComments = this.sortParentComments(body.email, body.direction, body.page);

      return sortedComments;
    }

    if(body.createdAt === 'createdAt' && body.direction !== '') {
      const sortedComments = this.sortParentComments(body.email, body.direction, body.page);

      return sortedComments;
    }

    const sortedComments = this.sortParentComments('email', 'asc');

    return sortedComments;
  }

  async sortParentComments(value, direction, page) {
    const sortedComments =  await CommentPath.findAll({
      where: {
        path_length: '0'
      },
      offset: page * 2,
      limit: 2,
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
              order: [value, direction]
            },
          ]
        }
      ],

    });

    return sortedComments;
  }

}

module.exports = new CommentService();
