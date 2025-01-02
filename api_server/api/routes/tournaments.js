const express = require('express');
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const Role = require("../models/role");

const TournamentController = require("../controllers/tournament");

// Get all tournaments
router.get("/", TournamentController.getAllTournaments);

router.post("/", authenticate, authorize([Role.Admin, Role.Owner]), TournamentsController.postTournament);
  
router.get("/:tournamentId", TournamentController.getTournament);

router.get("/:tournamentId/divisions", TournamentController.getDivisionsInTournament);

router.get("/:tournamentId/teams", TournamentController.getTeamsInTournament);
  
router.patch(
  "/:tournamentId",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  TournamentController.patchTournament
);
  
  router.delete(
    "/:tournamentId",
    authenticate,
    authorize([Role.Admin, Role.Owner]),
    TournamentController.deleteTournament
  );

module.exports = router;