function roleCheck(role) {
  return function (req, res, next) {
    if (!req.user) {
      return res
        .status(401)
        .json({ status: "fail", message: "Invalid, authentication required" });
    }

    if (req.user.role !== role) {
      return res
        .status(401)
        .json({ status: "fail", message: "Invalid, permission denied" });
    }

    next();
  };
}

export { roleCheck };
