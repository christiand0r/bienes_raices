import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

const verifyToken = async (req, res, next) => {
  const { _token } = req.cookies;

  if (!_token) return res.status(401).redirect("/auth/login");

  try {
    const { id } = jwt.verify(_token, process.env.JWT_SECRET_KEY);

    const user = await User.scope("notSensitivity").findByPk(id);

    if (!user) return res.status(401).redirect("/auth/login");

    req.user = user;

    next();
  } catch (error) {
    return res.clearCookie("_token").redirect("/auth/login");
  }
};

export default verifyToken;
