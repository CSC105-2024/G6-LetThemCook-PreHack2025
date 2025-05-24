import type { Context } from "hono";
import * as authModel from "../model/user.model.ts";
import { generateToken } from "../utils/token.ts";
import { setCookie } from "hono/cookie";
import jwt from "jsonwebtoken";
type AuthBody = {
  userId: number;
  email: string;
  username: string;
  password: string;
  bio: string;
  pfpURL: string;
};
export const signup = async (c: Context) => {
  try {
    const { email, username, password, bio, pfpURL } =
      await c.req.json<AuthBody>();
    const AlreadyExisting = await authModel.findUser(username, email);
    if (AlreadyExisting) {
      return c.json(
        {
          success: false,
          msg: "This account alreay taken",
        },
        409
      );
    }
    const user = await authModel.createUser(
      email,
      username,
      password,
      bio,
      pfpURL
    );
    const token = generateToken(user);
    return c.json(
      {
        success: true,
        token,
      },
      201
    );
  } catch (e) {
    console.error(e);
    return c.json(
      {
        success: false,
        msg: "Failed to create user",
      },
      500
    );
  }
};

export const login = async (c: Context) => {
  try {
    const { email, password } = await c.req.json();
    const user = await authModel.findUserByEmail(email);
    if (!user) {
      return c.json({ success: false, msg: "Invalid credentials" }, 401);
    }
    const isValid = await authModel.validatePassword(password, user.password);
    if (!isValid) {
      return c.json({ success: false, msg: "Invalid credentials" }, 401);
    }
    const token = generateToken(user);
    await setCookie(c, "userId", String(user.id), {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      path: "/",
    });
    return c.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (e) {
    console.error(e);
    return c.json({ success: false, msg: "Failed to login." }, 500);
  }
};

export const profileUpdate = async (c: Context) => {
  const { username, bio, pfpURL, userId } = await c.req.json<AuthBody>();
  try {
    const updatedUser = await authModel.updateUserProfile(
      userId,
      username,
      bio,
      pfpURL
    );
    return c.json({
      success: true,
      msg: "Updated profile",
      data: updatedUser,
    });
  } catch (e) {
    console.error(e);
    return c.json(
      { success: false, msg: "Failed to update user profile." },
      500
    );
  }
};
