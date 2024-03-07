const { getAllMessage, insertMessage } = require("../controllers/messageController")

const router = require("express").Router()

router.post("/getmsg",getAllMessage)
router.post("/insertmsg",insertMessage)

module.exports = router
