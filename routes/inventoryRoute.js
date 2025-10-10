// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const invValidate = require("../utilities/inventory-validation")

// Route to build management view (PROTECTED)
router.get("/", 
  utilities.checkAccountType,
  utilities.handleErrors(invController.buildManagement)
)

// Route to show add classification form (PROTECTED)
router.get("/add-classification", 
  utilities.checkAccountType,
  utilities.handleErrors(invController.buildAddClassification)
)

// Route to process add classification form (PROTECTED)
router.post(
  "/add-classification",
  utilities.checkAccountType,
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

// Route to show add inventory form (PROTECTED)
router.get("/add-inventory", 
  utilities.checkAccountType,
  utilities.handleErrors(invController.buildAddInventory)
)

// Route to process add inventory form (PROTECTED)
router.post(
  "/add-inventory",
  utilities.checkAccountType,
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)

// Route to build inventory by classification view (PUBLIC - NO PROTECTION)
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))

// Route to build vehicle detail view (PUBLIC - NO PROTECTION)
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryId))

// Route to trigger intentional error
router.get("/error", utilities.handleErrors(invController.buildError))

module.exports = router