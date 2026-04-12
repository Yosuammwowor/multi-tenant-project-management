import { User } from "../models/User.js";

async function controllerGetAllUsers(req, res) {
  try {
    const user = await User.create();
    const result = await user.getUsers();

    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res
      .status(400)
      .json({ status: "error", code: error.name, message: error.message });
  }
}

export { controllerGetAllUsers };
