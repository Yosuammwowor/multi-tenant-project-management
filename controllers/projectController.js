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

export { controllerGetUserProjects };
