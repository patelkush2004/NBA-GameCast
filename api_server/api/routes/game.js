const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const Role = require("../models/role");
const GameController = require("../controllers/game");

router.get("/", GameController.getAllGames);

router.post(
  "/",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  GameController.postGame
);

router.get("/:gameId", GameController.getGame);

router.patch(
  "/:gameId",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  GameController.patchGame
);

router.delete(
  "/:gameId",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  GameController.deleteGame
);

module.exports = router;