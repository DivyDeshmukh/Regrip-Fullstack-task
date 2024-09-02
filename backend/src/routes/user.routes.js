import { Router } from "express";
import { fetchUserData, login, logout, register } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(register);
router.route("/login").post(login);

// protected routes
router.route("/logout").get(verifyJWT, logout);
router.route("/userdata").get(verifyJWT, fetchUserData);

export default router;
