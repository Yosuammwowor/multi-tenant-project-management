import { Task } from "../models/Task.js";

async function controllerGetUserTasks(req, res) {
  try {
    const task = await Task.create();
    const result = await task.getTask(req.user.userId);

    // empty tasks available
    if (result.length === 0) {
      return res
        .status(404)
        .json({ status: "fail", message: "Invalid, no tasks available" });
    }

    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export { controllerGetUserTasks };
