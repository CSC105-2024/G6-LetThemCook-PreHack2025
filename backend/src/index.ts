import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { PrismaClient } from "./generated/prisma/index.js";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import cookiesRouter from "./routes/cookies.ts";
import authRouter from "./routes/auth.routes.ts";
import { recipeRouter } from "./routes/recipe.routes.ts";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();

app.use(logger());

app.use(
  "/uploads/*",
  serveStatic({
    root: "/",
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.use(
  "*",
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
export const db = new PrismaClient();

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

app.route("/cookies", cookiesRouter);
app.route("/auth", authRouter);
app.route("/recipe", recipeRouter);
