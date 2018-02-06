module.exports = {
  client: 'mysql',
  connection: {
    user: process.env.USER_DB || 'root',
    password: process.env.PASSWORD_DB,
    database: 'behaviour'
  }
}
