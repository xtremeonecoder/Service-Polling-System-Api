/**
 * Service Polling System - RESTfull-API
 *
 * @category   Application_Backend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

// include express
const express = require("express");
const cors = require("cors");

// import necessary routers
const auth = require("./../../auth/routers/auth"); // express router
const users = require("./../../users/routers/users"); // express router
const services = require("./../../services/routers/services"); // express router
const settings = require("./../../settings/routers/settings"); // express router

// import middlewares
const errorMiddleWare = require("./../middleware/error"); // custom middleware

module.exports = function (app) {
  // enables cors (enables sending request from cross-browsers)
  app.use(cors());

  // adding json as a middle ware to express
  app.use(express.json());

  // middleware for processing urlencoded values
  app.use(express.urlencoded({ extended: true }));

  // use routers (place routers below all the used middlewares)
  app.use("/api/auth", auth);
  app.use("/api/users", users);
  app.use("/api/services", services);
  app.use("/api/settings", settings);

  // error handler middleware
  app.use(errorMiddleWare);
};
