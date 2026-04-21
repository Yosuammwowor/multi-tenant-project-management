import { pool } from "../config/database.js";

class Task {
  constructor(connection) {
    this.conn = connection;
  }

  static async create() {
    const connection = await pool.getConnection();
    return new Task(connection);
  }

  async getTask(id) {
    try {
      const [result] = await this.conn.execute(
        "SELECT t.id AS Code, t.title AS Task FROM tasks t JOIN users u ON u.id = t.assigned_to WHERE u.id = ?",
        [id],
      );

      return result;
    } catch (error) {
      throw error;
    } finally {
      this.conn.release();
    }
  }
}

export { Task };
