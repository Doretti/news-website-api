import { Router, Response, Request } from "express";
import route from "./../route.class";
import User, { userType } from "./../../schemas/user.schema";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
config();

const router = Router();

const post = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { username, password } = request.body;

  const user = await User.findOne({
    username,
    password,
  });

  if (!user) {
    return response.status(400).send({
      message: "Wrong username or password",
    });
  }

  const jwtUser = process.env.JWT_SECRET
    ? jwt.sign(
        {
          id: user._id,
          username: user.username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 3600000,
        }
      )
    : null;

  return response.json({
    data: user,
    token: jwtUser ?? "none",
  });
};

const routeMethods = new route(router, "/", {}, {}, { function: post }, {}, {});

export default routeMethods.router;
