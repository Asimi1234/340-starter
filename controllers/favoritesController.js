const favoritesModel = require("../models/favorites-model")
const utilities = require("../utilities")

const favCont = {}

/* ***************************
 *  Build favorites view
 * ************************** */
favCont.buildFavorites = async function (req, res, next) {
  let nav = await utilities.getNav()
  const account_id = res.locals.accountData.account_id
  const favorites = await favoritesModel.getFavoritesByAccountId(account_id)
  
  let favoritesGrid = ""
  if (favorites.length > 0) {
    favoritesGrid = await utilities.buildFavoritesGrid(favorites)
  } else {
    favoritesGrid = '<p class="notice">You have no favorites yet. Browse our inventory to add some!</p>'
  }

  res.render("./favorites/favorites", {
    title: "My Favorites",
    nav,
    favoritesGrid,
    errors: null,
  })
}

/* ***************************
 *  Add vehicle to favorites
 * ************************** */
favCont.addFavorite = async function (req, res, next) {
  const { inv_id } = req.body
  const account_id = res.locals.accountData.account_id

  const result = await favoritesModel.addFavorite(account_id, inv_id)

  if (result) {
    req.flash("notice", "Vehicle added to favorites!")
    res.json({ success: true, message: "Added to favorites" })
  } else {
    res.status(500).json({ success: false, message: "Failed to add favorite" })
  }
}

/* ***************************
 *  Remove vehicle from favorites
 * ************************** */
favCont.removeFavorite = async function (req, res, next) {
  const { inv_id } = req.body
  const account_id = res.locals.accountData.account_id

  const result = await favoritesModel.removeFavorite(account_id, inv_id)

  if (result) {
    req.flash("notice", "Vehicle removed from favorites.")
    res.json({ success: true, message: "Removed from favorites" })
  } else {
    res.status(500).json({ success: false, message: "Failed to remove favorite" })
  }
}

module.exports = favCont