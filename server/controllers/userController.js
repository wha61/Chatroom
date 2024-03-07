const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userService = require("../service/userService")
const errorhandle = require("../utils/errorhandle")
const { privateKey } = require("../keys")

const issueToken = data => {
  return jwt.sign(data, privateKey, {
    expiresIn: 60 * 60 * 24 * 30,
    algorithm: "RS256"
  })
}

module.exports.register = async (req, res, next) => {
  const result = await userService.insert(req.body)
  const token = issueToken({ name: req.body.name })
  res.json({
    code: 0,
    message: "success",
    token
  })
}

module.exports.userCheckByName = async (req, res, next) => {
  const result = await userService.selectUserByName(req.body.name)
  if (result[0]) {
    return errorhandle(-1001, req, res, next)
  }
  next()
}

module.exports.userCheckByEmail = async (req, res, next) => {
  const result = await userService.selectUserByEmail(req.body.email)
  if (result[0]) {
    return errorhandle(-1002, req, res, next)
  }
  next()
}

module.exports.verifyUserByName = async (req, res, next) => {
  const { name, password } = req.body
  const result = await userService.selectUserByName(req.body.name)
  if (result[0]) {
    const userPassword = result[0].password
    const isPasswordValid = await bcrypt.compare(password, userPassword)
    if (!isPasswordValid) {
      return errorhandle(-1004, req, res, next)
    } else {
      const token = issueToken({ name })
      res.json({
        code: 0,
        message: "success",
        token
      })
    }
  } else {
    return errorhandle(-1003, req, res, next)
  }
}

module.exports.setAvatar = async (req, res, next) => {
  const { img } = req.body
  const token = req.headers.authorization.replace("Bearer ", "")
  const { name } = jwt.decode(token)
  const result = await userService.updateAvatarByName(name, img)
  res.json({
    code: 0,
    message: "success",
    data: result
  })
}

module.exports.getAllUsers = async (req, res, next) => {
  const token = req.headers.authorization.replace("Bearer ", "")
  const { name } = jwt.decode(token)
  const users = await userService.getAllUsers(name)
  users.map(value => {
    value.avatarImg = value.avatarImg.toString("utf-8")
  })
  res.json({
    code: 0,
    message: "success",
    data: users
  })
}

module.exports.getUser = async (req, res, next) => {
  const token = req.headers.authorization.replace("Bearer ", "")
  const { name } = jwt.decode(token)
  const users = await userService.getUser(name)
  users.map(value => {
    value.avatarImg = value.avatarImg.toString("utf-8")
  })
  res.json({
    code: 0,
    message: "success",
    data: users
  })
}
