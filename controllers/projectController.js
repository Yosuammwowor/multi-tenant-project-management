import { nanoid } from "nanoid";
import { Project } from "../models/Project.js";

async function controllerGetUserProjects(req, res) {
  try {
    const project = await Project.create();
    const result = await project.getProjects(req.user.userId);

    // check project match
    if (result.length === 0) {
      return res
        .status(404)
        .json({ status: "fail", message: "Invalid, no project received" });
    }

    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

async function controllerCreateProject(req, res) {
  const { name } = req.body;

  // missing value
  if (!name) {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid, missing value 'name'" });
  }

  // incorrect data type
  if (typeof name !== "string") {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid, incorrect data type" });
  }

  const id = await nanoid();
  const tenantId = req.user.tenantId;

  try {
    const project = await Project.create();
    await project.createProject({ id: id, tenantId: tenantId, name: name });

    res
      .status(200)
      .json({ status: "success", message: "Data successfully added!" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ status: "fail", code: error.name, message: error.message });
    }

    res.status(500).json({ status: "error", message: error.message });
  }
}

export { controllerGetUserProjects, controllerCreateProject };
