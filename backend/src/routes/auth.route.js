import express from "express";
import { signup,login,logout,updateprofile} from "../controller/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post('/login', login);

router.post('/logout', logout);

router.put('/update-profile', protectRoute, updateprofile);

router.get('/check',protectRoute, (req,res) => res.status(200).json(req.user))

export default router;