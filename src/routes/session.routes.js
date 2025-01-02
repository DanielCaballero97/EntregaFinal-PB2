import { Router } from "express";
import passport from "passport";
import { passportCall } from "../middleware/passport.middleware.js";
import { authorization } from "../middleware/authorization.middleware.js";
import { SessionController } from "../controllers/session.controller.js";

const sessionController = new SessionController();
const router = Router();

router.post("/register", passportCall("register"), sessionController.register);

router.post("/login", passportCall("login"), sessionController.login);

router.get("/logout", sessionController.logout);

router.get("/current", passportCall("jwt"), authorization("user"),sessionController.current);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
    session: false,
  }),
  (req, res) => {
    res.status(200).json({ status: "success", payload: req.user });
  }
);

export default router;
