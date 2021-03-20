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

// include bcrypt for hasing password
const bcrypt = require("bcrypt");

// include models
const users = require("./../../users/models/user");
const { validateLogin } = require("./../utilities/validation");

// include middleware functions
const asyncMiddleWare = require("./../../core/middleware/async");

// login endpoint
router.post(
  "/",
  asyncMiddleWare(async (req, res) => {
    // validation
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if user exists?
    const user = await users.getOneUser({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password!");

    // match hash password
    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) return res.status(400).send("Invalid email or password!");

    // create json web token
    const token = user.generateAuthToken();

    // send response with jwt
    return res.send(token);
  })
);

module.exports = router;
