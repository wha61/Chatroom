const connection = require("./index")
const bcrypt = require("bcrypt")

class UserService {
  async insert(user) {
    const { name, email, password } = user
    const hashedPassword = await bcrypt.hash(password, 10)
    const statement = `INSERT INTO user (name, email, password, isSvg) VALUES (?, ?, ?, ?)`
    const [result] = await connection.execute(statement, [name, email, hashedPassword, 0])
    return result
  }
  async selectUserByName(name) {
    const statement = `SELECT * FROM user WHERE NAME=?`
    const [result] = await connection.execute(statement, [name])
    return result
  }
  async selectUserByEmail(email) {
    const statement = `SELECT * FROM user WHERE email=?`
    const [result] = await connection.execute(statement, [email])
    return result
  }
  async updateAvatarByName(name, img) {
    const statement = `UPDATE user SET isSvg = TRUE , avatarImg = ? WHERE name=?`
    const [result] = await connection.execute(statement, [img, name])
    return result
  }
  async getAllUsers(name) {
    const statement = `SELECT id,name,avatarImg FROM user WHERE name != ?`
    const [result] = await connection.execute(statement, [name])
    return result
  }
  async getUser(name){
    const statement = `SELECT id,name,avatarImg FROM user WHERE name = ?`
    const [result] = await connection.execute(statement, [name])
    return result
  }
}

module.exports = new UserService()
