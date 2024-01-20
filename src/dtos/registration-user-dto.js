
module.exports =  class RegistrationUserDTO {
    id;
    name;
    email;
    password;
  
    constructor(model) {
      this.id = model.id;
      this.name = model.name;
      this.email = model.email;
      this.password = model.password;
    }
  };
  