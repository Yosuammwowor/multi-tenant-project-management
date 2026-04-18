import { pool } from "../config/database.js";

class Project {
  constructor(connection) {
    this.conn = connection;
  }

  static async create() {
    const connection = await pool.getConnection();
    return new Project(connection);
  }

  async getProjects(id) {
    try {
      const [result] = await this.conn.execute(
        "SELECT p.id AS Code, p.name AS Project FROM projects p JOIN tenants t ON p.tenant_id = t.id JOIN users u ON u.tenant_id = t.id WHERE u.id = ?",
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

export { Project };
