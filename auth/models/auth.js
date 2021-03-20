/**
 * Service Polling System - RESTfull-API
 *
 * @category   Application_Backend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

// include jwt-decode package
const config = require("config");
const jwtDecode = require("jwt-decode");

function getCurrentUser(req) {
  // get current user
  const token = req.header(config.get("authHeaderName"));
  return jwtDecode(token);
}

module.exports = {
  getCurrentUser,
};
