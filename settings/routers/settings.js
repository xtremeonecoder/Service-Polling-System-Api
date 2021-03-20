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
const settings = require("./../models/setting");
const { validateSetting } = require("./../utilities/validation");

// fetch all settings
router.get(
  "/",
  [auth],
  asyncMiddleWare((req, res) => {
    // get all settings
    settings
      .getSettings()
      .then((result) => {
        if (!result) return res.status(400).send("Something went wrong!");
        return res.send(result);
      })
      .catch((error) => res.status(400).send(error.message));
  })
);

// fetch one setting
router.get(
  "/:id",
  [auth, validateObjectId],
  asyncMiddleWare((req, res) => {
    settings
      .getSetting(req.params.id)
      .then((setting) => {
        if (!setting)
          return res.status(404).send("Requested setting not found!");
        return res.send(setting);
      })
      .catch((error) => res.status(400).send(error.message));
  })
);

// create new setting
router.post(
  "/",
  [auth, admin],
  asyncMiddleWare((req, res) => {
    // validation
    const { error } = validateSetting(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // preparing data
    let setting = {
      key: req.body.key,
      value: req.body.value,
    };

    // creating
    settings
      .createSetting(setting)
      .then((setting) => {
        if (!setting) return res.status(400).send("Something went wrong!");
        return res.send(setting);
      })
      .catch((error) => res.status(400).send(error.message));
  })
);

// update setting
router.put(
  "/:id",
  [auth, admin, validateObjectId],
  asyncMiddleWare((req, res) => {
    // validation
    const { error } = validateSetting(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // prepare data
    let setting = {
      value: req.body.value,
    };

    // updating
    settings
      .updateSetting(req.params.id, setting)
      .then((setting) => {
        if (!setting) return res.status(404).send("Something went wrong!");
        return res.send(setting);
      })
      .catch((error) => res.status(400).send(error.message));
  })
);

// delete setting
router.delete(
  "/:id",
  [auth, admin, validateObjectId],
  asyncMiddleWare((req, res) => {
    // perform delete operation
    settings
      .removeSetting(req.params.id)
      .then((setting) => {
        if (!setting) return res.status(404).send("Something went wrong!");
        return res.send(setting);
      })
      .catch((error) => res.status(400).send(error.message));
  })
);

module.exports = router;
