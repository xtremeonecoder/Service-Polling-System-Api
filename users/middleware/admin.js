/**
 * Service Polling System - RESTfull-API
 *
 * @category   Application_Backend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

const config = require("config");

module.exports = function (req, res, next) {
  // bypass authentication
  if (!config.get("requiresAuth")) return next();

  if (!req.user.isAdmin) return res.status(403).send("Access forbidden!");
  next();
};
