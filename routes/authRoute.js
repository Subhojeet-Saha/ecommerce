import express from 'express';
import { registercontroller, logincontroller, testcontroller, forgotpasswordcontroller } from "../controllers/authcontroller.js";
import { isadmin, requiresignin } from '../middlewares/authmiddleware.js';

// router object
const router = express.Router();

// routing

// register || method post
router.post("/register", registercontroller);

// login || mrthod post
router.post("/login", logincontroller);

// forgot password || method post
router.post("/forgotpassword", forgotpasswordcontroller)

// test route
router.get("/test", requiresignin, isadmin, testcontroller);

// protected user route auth
router.get("/user-auth", requiresignin, (req, res) => {
    res.status(200).send({ ok: true });
});

// protected admin route auth
router.get("/admin-auth", requiresignin, isadmin, (req, res) => {
    res.status(200).send({ ok: true });
});

export default router;