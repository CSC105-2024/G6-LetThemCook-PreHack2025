import { Hono } from "hono";
import { login, profileUpdate, signup ,  } from "../controllers/auth.controller.ts";
const authRouter = new Hono();
authRouter.post('/signup', signup);
authRouter.post('/login',login );
authRouter.post('/updated-Profile/:id', profileUpdate);
export default authRouter;