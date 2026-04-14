import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
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

async function controllerLogin(req, res) {
  const { email, password } = req.body;

  // check missing value
  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid, missing value 'email', or 'password'",
    });
  }

  // check data type
  if (typeof email !== "string" || typeof password !== "string") {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid, incorrect value type" });
  }

  try {
    const user = await User.create();
    const result = await user.getUser(email);

    // check user email
    if (result.length === 0) {
      return res
        .status(404)
        .json({ status: "fail", message: "Invalid, no user email match" });
    }

    // comparing password
    const validPassword = await bcrypt.compare(
      password,
      result[0].password_hash,
    );
    if (!validPassword) {
      return res
        .status(401)
        .json({ status: "fail", message: "Invalid, incorrect password" });
    }

    const token = jwt.sign(result[0], process.env.SECRET, { expiresIn: 15 });

    res.status(200).json({ status: "success", token: token });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

async function controllerRegister(req, res) {
  const { username, email, password } = req.body;

  // check missing value
  if (!username || !email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid, missing value 'username', 'email', or 'password'",
    });
  }

  // check data type
  if (
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid, incorrect data type" });
  }

  const id = await nanoid();
  const password_hash = await bcrypt.hash(password, await bcrypt.genSalt());
  const userData = {
    id: id,
    username: username,
    email: email,
    password_hash: password_hash,
  };

  try {
    const user = await User.create(userData);

    // await user.createUser(userData);

    const token = jwt.sign(userData, process.env.SECRET, { expiresIn: 15 });

    res.status(200).json({
      status: "success",
      token: token,
      message: "Data successfully added!",
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ status: "fail", message: "Invalid, duplicate user id" });
    }

    res.status(500).json({ status: "error", message: error.message });
  }
}

export { controllerGetAllUsers, controllerLogin, controllerRegister };
