const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

class StudentModel extends BaseModel {
  constructor() {
    super('Student', {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      profilePicture: Joi.string().optional(),
      notes: Joi.string().allow('').optional(),
    });
  }

  search(q = '') {
    return this.items.filter(
      student => `${student.firstName} ${student.lastName} ${student.firstName}`
        .toLowerCase()
        .indexOf(q.trim().toLowerCase()) !== -1,
    );
  }
}

module.exports = new StudentModel();
