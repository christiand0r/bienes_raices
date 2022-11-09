import jwt from "jsonwebtoken";

export const generateID = () =>
  Math.random().toString(32).substring(2) + Date.now().toString(32);

export const generateJWT = (data) => {
  const tokenOptions = {
    expiresIn: "1d",
  };

  return jwt.sign({ ...data }, process.env.JWT_SECRET_KEY, tokenOptions);
};
