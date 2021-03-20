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
const router = express.Router();

// include middleware functions
const auth = require("./../../auth/middleware/auth");
const admin = require("./../../users/middleware/admin");
const asyncMiddleWare = require("./../../core/middleware/async");
const validateObjectId = require("./../../core/middleware/validate-object-id");

// include models
const services = require("./../models/service");
const { getCurrentUser } = require("./../../auth/models/auth");
const { validateService } = require("./../utilities/validation");

// fetch all services
router.get(
  "/",
  [auth],
  asyncMiddleWare((req, res) => {
    // get current user
    const user = getCurrentUser(req);

    // get user's services
    services
      .getUserServices(user._id)
      .then((result) => {
        if (!result) return res.status(400).send("Something went wrong!");
        return res.send(result);
      })
      .catch((error) => res.status(400).send(error.message));
  })
);

// fetch one service
router.get(
  "/:id",
  [auth, validateObjectId],
  asyncMiddleWare((req, res) => {
    services
      .getService(req.params.id)
      .then((service) => {
        if (!service)
          return res.status(404).send("Requested service not found!");
        return res.send(service);
      })
      .catch((error) => res.status(400).send(error.message));
  })
);

// create new service
router.post(
  "/",
  [auth, admin],
  asyncMiddleWare((req, res) => {
    // validation
    const { error } = validateService(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // preparing data
    let service = {
      url: req.body.url,
      name: req.body.name,
      userId: req.body.userId,
      status: false,
    };

    // creating
    services
      .createService(service)
      .then((service) => {
        if (!service) return res.status(400).send("Something went wrong!");
        return res.send(service);
      })
      .catch((error) => res.status(400).send(error.message));
  })
);

// update service
router.put(
  "/:id",
  [auth, admin, validateObjectId],
  asyncMiddleWare((req, res) => {
    // validation
    const { error } = validateService(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // get the service and check authentication
    services
      .getService(req.params.id)
      .then((service) => {
        if (!service)
          return res.status(404).send("Requested service not found!");

        // get current user and check ownership
        const user = getCurrentUser(req);
        if (!user || (user && user._id !== service.userId))
          return res
            .status(403)
            .send("You are not authorized for this operation!");
      })
      .catch((error) => res.status(400).send(error.message));

    // prepare data
    let service = {
      url: req.body.url,
      name: req.body.name,
      userId: req.body.userId,
    };

    // updating
    services
      .updateService(req.params.id, service)
      .then((service) => {
        if (!service) return res.status(404).send("Something went wrong!");
        return res.send(service);
      })
      .catch((error) => res.status(400).send(error.message));
  })
);

// delete service
router.delete(
  "/:id",
  [auth, admin, validateObjectId],
  asyncMiddleWare((req, res) => {
    // get the service and check authentication
    services
      .getService(req.params.id)
      .then((service) => {
        if (!service)
          return res.status(404).send("Requested service not found!");

        // get current user and check ownership
        const user = getCurrentUser(req);
        if (!user || (user && user._id !== service.userId))
          return res
            .status(403)
            .send("You are not authorized for this operation!");
      })
      .catch((error) => res.status(400).send(error.message));

    // perform delete operation
    services
      .removeService(req.params.id)
      .then((service) => {
        if (!service) return res.status(404).send("Something went wrong!");
        return res.send(service);
      })
      .catch((error) => res.status(400).send(error.message));
  })
);

module.exports = router;
