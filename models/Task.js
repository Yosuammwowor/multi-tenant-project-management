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

  async createTask(data) {
    try {
      return await this.conn.execute(
        "INSERT INTO tasks (id, project_id, assigned_to, title) VALUES (?, ?, ?, ?)",
        [data.id, data.projectId, data.userId, data.title],
      );
    } catch (error) {
      throw error;
    } finally {
      this.conn.release();
    }
  }

  async changeOfDuty(data) {
    try {
      return await this.conn.execute(
        "UPDATE tasks SET assigned_to = ? WHERE id = ?",
        [data.userId, data.id],
      );
    } catch (error) {
      throw error;
    } finally {
      this.conn.release();
    }
  }
}

export { Task };
