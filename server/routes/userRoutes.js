const {
  register,
  userCheckByEmail,
  userCheckByName,
  verifyUserByName,
  setAvatar,
  getAllUsers,
  getUser
} = require("../controllers/userController")

const router = require("express").Router()

router.post("/register", userCheckByName, userCheckByEmail, register)
router.post("/login", verifyUserByName)
router.post("/setAvatar", setAvatar)
router.get("/allUsers", getAllUsers)
router.get("/user", getUser)

module.exports = router
