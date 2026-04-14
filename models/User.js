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

  async getUser(email) {
    try {
      const [result] = await this.conn.execute(
        "SELECT * FROM users WHERE email = ?",
        [email],
      );

      return result;
    } catch (error) {
      throw error;
    } finally {
      this.conn.release();
    }
  }

  async createUser(data) {
    try {
      return await this.conn.execute(
        "INSERT INTO users (id, username, email, password_hash) VALUES (?, ?, ?, ?)",
        [data.id, data.username, data.email, data.password_hash],
      );
    } catch (error) {
      throw error;
    } finally {
      this.conn.release();
    }
  }
}

export { User };
