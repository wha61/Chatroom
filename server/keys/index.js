const fs = require("fs")
const path = require("path")

const privateKey = fs.readFileSync(path.resolve(__dirname, "./private.key"))
const publicKey = fs.readFileSync(path.resolve(__dirname, "./public.key"))

module.exports = { privateKey, publicKey }
