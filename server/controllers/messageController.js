const MessageService = require("../service/messageService")
module.exports.insertMessage = async (req, res, next) => {
  console.log(req.body)
  const { message, sender, receiver } = req.body
  const result = await MessageService.insertMessage({ message, sender, receiver })
  if (result) {
    res.json({
      code: 0,
      message: "success",
      data: {
        message,
        sender,
        receiver
      }
    })
  }
}
module.exports.getAllMessage = async (req, res, next) => {
  const user = req.body
  const result = await MessageService.getAllMessage(user)
  if (result) {
    res.json({
      code: 0,
      message: "success",
      data: result
    })
  }
}
