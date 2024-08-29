const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const Role = require("../models/role");

const LocationController = require("../controllers/location");

router.get("/", LocationController.getAllLocations);

router.post(
  "/",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  LocationController.postLocation
);

router.get("/:locationId", LocationController.getLocation);

router.patch(
  "/:locationId",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  LocationController.patchLocation
);

router.delete(
  "/:locationId",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  LocationController.deleteLocation
);

module.exports = router;