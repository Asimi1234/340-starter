const express = require("express")
const router = new express.Router()
const favoritesController = require("../controllers/favoritesController")
const utilities = require("../utilities")

// Route to build favorites view (requires login)
router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(favoritesController.buildFavorites)
)

// Route to add favorite (requires login)
router.post(
  "/add",
  utilities.checkLogin,
  utilities.handleErrors(favoritesController.addFavorite)
)

// Route to remove favorite (requires login)
router.post(
  "/remove",
  utilities.checkLogin,
  utilities.handleErrors(favoritesController.removeFavorite)
)

module.exports = router