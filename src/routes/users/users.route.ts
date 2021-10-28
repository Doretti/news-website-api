import { Router, Response, Request } from "express";
import route from "./../route.class";
import User, { userType } from "./../../schemas/user.schema";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
config();

const router = Router();

const get = async (request: Request, response: Response): Promise<Response> => {
  try {
    const users: userType[] = await User.find();

    return response.json({
      data: users,
    });
  } catch (error) {
    return response.status(400).send(error);
  }
};

const getById = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const user: userType = await User.findById(request.params.id);

  return response.json({
    data: user,
  });
};

const post = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const user: userType = await User.create({
    username: request.body.username,
    password: request.body.password,
  });

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

const patch = async (
  request: Request,
  response: Response
): Promise<Response> => {
  await User.findOneAndUpdate(
    {
      _id: request.params.id,
    },
    request.body,
    {
      upsert: true,
    }
  );

  const user: userType = await User.findOne({
    _id: request.params.id,
  });

  return response.json({
    data: user,
  });
};

const remove = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const user: userType = await User.findOneAndRemove({
    _id: request.params.id,
  });

  return response.json({
    data: user,
  });
};

const routeMethods = new route(
  router,
  "/",
  { function: get },
  { function: getById },
  { function: post },
  { function: patch },
  { function: remove }
);

export default routeMethods.router;
