/**
 * Service Polling System - RESTfull-API
 *
 * @category   Application_Backend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

// include express framework
const express = require("express");

// export necessary instances
module.exports = {
  express,
  app: express(),
  router: express.Router(),
};
