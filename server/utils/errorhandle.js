const app = require("../index")

const errorhandle = (error, req, res, next) => {
  let message
  switch (error) {
    case -1001:
      message = "用户名重复"
      break
    case -1002:
      message = "邮箱已使用"
      break
    default:
      break
  }
  res.json({
    code: error,
    message
  })
}

module.exports = errorhandle
