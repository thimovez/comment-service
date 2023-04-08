const ApiError = require('../exceptions/api.error');
const {Comment, CommentPath} = require('../models/comment-model');
const User = require('../models/user-model');

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
      const sortedComments = this.sortParentComments(body.username, body.direction);

      return sortedComments;
    }

    if(body.email === 'email' && body.direction !== ''){
      const sortedComments = this.sortParentComments(body.email, body.direction);

      return sortedComments;
    }

    if(body.createdAt === 'createdAt' && body.direction !== '') {
      return 
    }

    const sortedComments = ""

    return sortedComments;
  }

  async sortParentComments(value, direction) {
    const sortedComments = await User.findAll({
      logging:true,
      order: [[value, direction]],
      include: [
        {
          model: Comment,
          include: [
            {
              model: CommentPath,
              where: {
                path_length: '0'
              }
            }]
        },
      ]
    });

    return sortedComments;
  }

}

module.exports = new CommentService();
