import express from 'express';
import { registerUser,loginUser,getUser } from '../Controllers/user.controller.js';
import { authMiddleware } from '../Middleware/auth.middleware.js';

const router = express.Router();
router.post("/registerUser",registerUser);
router.post("/loginUser",loginUser);


router.get("/getUser",authMiddleware,getUser);








export default router;