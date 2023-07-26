const { check } = require('express-validator');

module.exports = {
  regUserRules: [
    check('name')
      .exists().withMessage('field must exist')
      .notEmpty().withMessage('name cannot be empty')
      .isString().withMessage('name should be string only')
      .isLength({
        min: 5,
        max: 12
      }).withMessage('Name must be at least 5 characters long and string'),

    check('email')
      .exists().withMessage('field must exist')
      .notEmpty().withMessage('email cannot be empty')
      .isEmail().withMessage('must be in email format')
      .notEmpty().withMessage('field email cannot be empty'),

    check('password')
      .exists().withMessage('field must exist')
      .isLength({
        min: 8,
        max: 20
      }).withMessage('Password must be at least 8 char long and maximum 20')
      .notEmpty().withMessage('Password cannot be empty'),
  ]
};

