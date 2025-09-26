const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)

  // Handle invalid classification
  if (!data.length) {
    return next({ status: 404, message: "Classification not found" })
  }

  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name

  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build vehicle detail view
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inventory_id = req.params.inventoryId
  const data = await invModel.getInventoryByInventoryId(inventory_id)

  // Handle invalid vehicle
  if (!data.length) {
    return next({ status: 404, message: "Vehicle not found" })
  }

  const vehicle = data[0]
  const detailView = await utilities.buildDetailView(vehicle)
  let nav = await utilities.getNav()
  const vehicleTitle = `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`

  res.render("./inventory/detail", {
    title: vehicleTitle,
    nav,
    detailView,
  })
}

/* ***************************
 *  Intentional Error for Testing
 * ************************** */
invCont.buildError = async function (req, res, next) {
  const error = new Error("This is an intentional 500 error for testing purposes.")
  error.status = 500
  return next(error)
}

module.exports = invCont
