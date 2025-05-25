import { Hono } from "hono";
import { getUserData, login, profileUpdate, signup ,  } from "../controllers/auth.controller.ts";
const authRouter = new Hono();
authRouter.post('/signup', signup);
authRouter.post('/login',login );
authRouter.patch('/updated-Profile', profileUpdate);
authRouter.get('/getUserData/:userId', getUserData);
export default authRouter;