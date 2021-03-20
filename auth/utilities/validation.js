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

function validateLogin(data) {
  const schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(5).required().label("Password"),
  };

  return Joi.validate(data, schema);
}

module.exports = {
  validateLogin,
};
