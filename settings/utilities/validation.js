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

function validateSetting(data) {
  const schema = {
    key: Joi.string()
      .required()
      .regex(/^[A-Za-z]+[A-Za-z0-9]+$/)
      .label("Setting Key"),
    value: Joi.string().min(1).max(50).required().label("Setting Value"),
  };

  return Joi.validate(data, schema);
}

module.exports = {
  validateSetting,
};
