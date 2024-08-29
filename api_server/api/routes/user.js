const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const Role = require("../models/role");

const UserController = require("../controllers/user");

router.post(
  "/signup",
  authenticate,
  authorize([Role.Owner]),
  UserController.signUp
);

router.post("/login", UserController.login);

router.delete(
  "/:userId",
  authenticate,
  authorize([Role.Owner]),
  UserController.deleteUser
);

module.exports = router;