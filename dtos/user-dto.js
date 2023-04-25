'use strict';

module.exports =  class UserDto {
  id;
  email;
  firsName;

  constructor(model) {
    this.id = model.id;
    this.email = model.email;
    this.firsName = model.firsName;
  }
};
