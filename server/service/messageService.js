const connection = require("./index")
const bcrypt = require("bcrypt")

class MessageService {
  async insertMessage({ message, sender, receiver }) {
    console.log(message, sender, receiver)
    const statement = "INSERT INTO message (message,sender,receiver) VALUES (?,?,?)"
    const [result] = await connection.execute(statement, [message, sender, receiver])
    return result
  }
  async getAllMessage({ user1, user2 }) {
    const statement =
      "SELECT * FROM message WHERE (sender=? AND receiver=?) OR (sender=? AND receiver=?)"
    const [result] = await connection.execute(statement, [user1, user2, user2, user1])
    return result
  }
}

module.exports = new MessageService()
