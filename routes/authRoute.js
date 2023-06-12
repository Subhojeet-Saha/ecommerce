import express from "express";
import {loginController, registerController, signInController} from "../controllers/authControllers.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const router=express.Router()

//routing
//register || method post

router.post('/register',registerController)

// Login POST

router.post('/login',loginController)

// token route

router.get("/test", requireSignIn,isAdmin,signInController)

export default router;