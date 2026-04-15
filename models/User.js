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

  async getUserByEmail(email) {
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

  async getUserById(id) {
    try {
      const [result] = await this.conn.execute(
        "SELECT * FROM users WHERE id = ?",
        [id],
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
        "INSERT INTO users (id, tenant_id, name, email, password, role) VALUES (?, ?, ?, ?, ?, ?)",
        [
          data.id,
          data.tenantId,
          data.name,
          data.email,
          data.password,
          data.role,
        ],
      );
    } catch (error) {
      throw error;
    } finally {
      this.conn.release();
    }
  }
}

export { User };
