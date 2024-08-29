const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const Role = require("../middleware/role");

const DivisionController = require("../controllers/division");

router.get("/", DivisionController.getAllDivisions);

router.post(
  "/",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  DivisionController.postDivision
);

router.get("/:divisionId", DivisionController.getDivision);

router.get("/:divisionId/teams", DivisionController.getTeamsInDivision);

router.patch(
  "/:divisionId",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  DivisionController.patchDivision
);

router.delete(
  "/:divisionId",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  DivisionController.deleteDivision
);

module.exports = router;