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

function validateService(data) {
  const schema = {
    url: Joi.string()
      .required()
      .regex(/^((ftp|http|https):\/\/)(www\.)?([\w-]+)\.([A-z]{2,})/)
      .label("Service URL"),
    name: Joi.string().min(2).max(50).required().label("Service Name"),
    userId: Joi.string().required().label("UserId"),
  };

  return Joi.validate(data, schema);
}

module.exports = {
  validateService,
};
