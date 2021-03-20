/**
 * Service Polling System - RESTfull-API
 *
 * @category   Application_Backend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

const config = require("config"); // configuration
const winston = require("winston"); // Error Logger
const express = require("express"); // RESTfull API
const app = express(); // RESTfull API

// include error logging
require("./core/startup/logging")();

// connect to mongodb database
require("./core/database/connection")();

// include configurations
require("./core/startup/config")();

// include routes
require("./core/routers/main")(app);

// include production middleware packages
require("./core/startup/production")(app);

// define port
const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  winston.info(`Listening to port ${port}`)
);

// initialize service poller
require("./services/utilities/scheduler")();

module.exports = server;
