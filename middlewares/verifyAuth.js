import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

const verifyAuth = async (req = Request, res = Response, next) => {
  const { _token: token } = req.cookies;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.scope("notSensitivity").findByPk(id);

    req.user = user || null;

    next();
  } catch (error) {
    console.log(error);
    return res.clearCookie("_token").redirect("/auth/login");
  }
};

export default verifyAuth;
