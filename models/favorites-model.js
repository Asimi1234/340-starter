const pool = require("../database/")

/* ***************************
 *  Add vehicle to favorites
 * ************************** */
async function addFavorite(account_id, inv_id) {
  try {
    const sql = "INSERT INTO favorites (account_id, inv_id) VALUES ($1, $2) RETURNING *"
    return await pool.query(sql, [account_id, inv_id])
  } catch (error) {
    console.error("addFavorite error:", error)
    return error.message
  }
}

/* ***************************
 *  Remove vehicle from favorites
 * ************************** */
async function removeFavorite(account_id, inv_id) {
  try {
    const sql = "DELETE FROM favorites WHERE account_id = $1 AND inv_id = $2 RETURNING *"
    return await pool.query(sql, [account_id, inv_id])
  } catch (error) {
    console.error("removeFavorite error:", error)
    return error.message
  }
}

/* ***************************
 *  Get all favorites for a user
 * ************************** */
async function getFavoritesByAccountId(account_id) {
  try {
    const sql = `SELECT f.favorite_id, f.date_added, i.* 
                 FROM favorites f
                 INNER JOIN inventory i ON f.inv_id = i.inv_id
                 WHERE f.account_id = $1
                 ORDER BY f.date_added DESC`
    const result = await pool.query(sql, [account_id])
    return result.rows
  } catch (error) {
    console.error("getFavoritesByAccountId error:", error)
    return []
  }
}

/* ***************************
 *  Check if vehicle is in user's favorites
 * ************************** */
async function checkFavorite(account_id, inv_id) {
  try {
    const sql = "SELECT * FROM favorites WHERE account_id = $1 AND inv_id = $2"
    const result = await pool.query(sql, [account_id, inv_id])
    return result.rowCount > 0
  } catch (error) {
    console.error("checkFavorite error:", error)
    return false
  }
}

/* ***************************
 *  Get favorite count for a user
 * ************************** */
async function getFavoriteCount(account_id) {
  try {
    const sql = "SELECT COUNT(*) as count FROM favorites WHERE account_id = $1"
    const result = await pool.query(sql, [account_id])
    return result.rows[0].count
  } catch (error) {
    console.error("getFavoriteCount error:", error)
    return 0
  }
}

module.exports = {
  addFavorite,
  removeFavorite,
  getFavoritesByAccountId,
  checkFavorite,
  getFavoriteCount
}