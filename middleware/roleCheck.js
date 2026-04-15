async function roleCheck(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res
        .status(401)
        .json({ status: "fail", message: "Invalid, permission denied" });
    }

    next();
  };
}

export { roleCheck };
