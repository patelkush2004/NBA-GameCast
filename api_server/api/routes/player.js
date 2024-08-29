const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const Role = require("../models/role");

const PlayerController = require("../controllers/player");

router.get("/", PlayerController.getAllPlayers);

router.post(
  "/",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  PlayerController.postPlayer
);

router.get("/:playerId", PlayerController.getPlayer);

router.patch(
  "/:playerId",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  PlayerController.patchPlayer
);

router.delete(
  "/:playerId",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  PlayerController.deletePlayer
);

module.exports = router;