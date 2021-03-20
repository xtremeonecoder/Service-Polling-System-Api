/**
 * Service Polling System - RESTfull-API
 *
 * @category   Application_Backend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

const Joi = require("@hapi/joi");
// for working with mongodb objectid
Joi.objectId = require("joi-objectid")(Joi);

function validateUser(data) {
  const schema = {
    name: Joi.string().min(3).max(50).required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(5).required().label("Password"),
    confpass: Joi.string().min(5).required().label("Confirm Password"),
  };

  return Joi.validate(data, schema);
}

module.exports = {
  validateUser,
};
