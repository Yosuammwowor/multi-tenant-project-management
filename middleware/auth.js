import jwt from "jsonwebtoken";

async function auth(req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.includes("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid, no authorization provided, access denied",
    });
  }

  try {
    const result = jwt.verify(token, process.env.SECRET);

    req.user = result;

    next();
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", code: error.name, message: error.message });
  }
}

export { auth };
