import { pool } from "../config/database.js";

class User {
  constructor(connection) {
    this.conn = connection;
  }

  static async create() {
    const connection = await pool.getConnection();
    return new User(connection);
  }

  async getUsers() {
    try {
      const [result] = await this.conn.query("SELECT * FROM users");
      return result;
    } catch (error) {
      throw error;
    } finally {
      this.conn.release();
    }
  }
}

export { User };
