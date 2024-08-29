const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const Role = require("../models/role");

const TeamController = require("../controllers/team");

router.get("/", TeamController.getAllTeams);

router.post(
  "/",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  TeamController.postTeam
);

router.get("/:teamId", TeamController.getTeam);

router.get("/:teamId/players", TeamController.getPlayersInTeam);

router.patch(
  "/:teamId",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  TeamController.patchTeam
);

router.delete(
  "/:teamId",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  TeamController.deleteTeam
);

module.exports = router;