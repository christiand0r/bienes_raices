import express from "express";
import {
  activeAccount,
  createNewPassword,
  formLogin,
  formNewPassword,
  formRegister,
  formResetPassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/login", formLogin);
router.get("/register", formRegister);
router.get("/forgot-password", formResetPassword);
router.get("/forgot-password/:token", formNewPassword);
router.get("/confirm/:token", activeAccount);

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/register", registerUser);
router.post("/forgot-password", resetPassword);
router.post("/forgot-password/:token", createNewPassword);

export default router;
