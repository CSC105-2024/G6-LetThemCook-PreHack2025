import { Hono } from "hono";
import { getUserData, login, profileUpdate, signup, uploadProfileImage ,  } from "../controllers/auth.controller.ts";
const authRouter = new Hono();
authRouter.post('/signup', signup);
authRouter.post('/login',login );
authRouter.patch('/updated-Profile', profileUpdate);
authRouter.get('/getUserData/:userId', getUserData);
authRouter.post('/upload-profile-img',uploadProfileImage);
export default authRouter;