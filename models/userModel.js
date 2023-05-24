class User {
  constructor(userID, username, password, createdAt, updatedAt) {
    this.userID = userID;
    this.username = username;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = User;
