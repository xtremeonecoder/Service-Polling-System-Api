/**
 * Service Polling System - RESTfull-API
 *
 * @category   Application_Backend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

const config = require("config");
const winston = require("winston");
require("winston-mongodb");

module.exports = function () {
  // include error handler and logger
  winston.add(
    new winston.transports.File({
      filename: "logfile.log",
      handleExceptions: true,
    })
  );

  // include error handler and logger (MongoDB)
  const db = config.get("database");
  winston.add(
    new winston.transports.MongoDB({
      db: db,
      level: "error",
    })
  );

  // winston.handleExceptions( // deprecated
  winston.exceptions.handle(
    // for logging error on console
    new winston.transports.Console({
      colorize: true,
      prettyPrint: true,
      handleExceptions: true,
    }),
    // for logging error on file
    new winston.transports.File({
      filename: "uncaughtExceptions.log",
      handleExceptions: true,
    })
  );

  // catching unhandled rejections
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
};
