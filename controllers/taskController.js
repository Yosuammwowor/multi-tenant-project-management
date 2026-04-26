import { nanoid } from "nanoid";
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

async function controllerCreateTask(req, res) {
  const { project_id, title } = req.body;
  let { assigned_to } = req.body;

  // missing value
  if (!project_id || !title) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid, missing value 'project_id' or 'title'",
    });
  }

  // incorrect data type
  if (typeof project_id !== "string" || typeof title !== "string") {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid, incorrect data type" });
  }

  const id = await nanoid();

  try {
    const task = await Task.create();
    await task.createTask({
      id: id,
      projectId: project_id,
      userId: assigned_to,
      title: title,
    });

    res
      .status(200)
      .json({ status: "success", message: "Data successfully added!" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      res
        .status(409)
        .json({ status: "fail", code: error.code, message: error.message });
    }

    res.status(500).json({ status: "error", message: error.message });
  }
}

async function controllerChangeOfDuty(req, res) {
  const id = req.params.id;
  const { assigned_to } = req.body;

  // missing value
  if (!assigned_to) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid, missing value 'assigned_to'",
    });
  }

  // incorrect data type
  if (typeof assigned_to !== "string") {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid, incorrect data type" });
  }

  try {
    const task = await Task.create();
    await task.changeOfDuty({ userId: assigned_to, id: id });

    res
      .status(200)
      .json({ status: "success", message: "Data successfully updated!" });
  } catch (error) {
    // no user match
    if ((error.errno = 1452)) {
      res
        .status(409)
        .json({ status: "fail", message: "Invalid, no user match" });
    }
    res.status(500).json({ status: "error", message: error });
  }
}

export { controllerGetUserTasks, controllerCreateTask, controllerChangeOfDuty };
