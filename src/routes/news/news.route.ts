import { Router, Response, Request } from "express";
import route from "./../route.class";
import News, { newsType } from "../../schemas/news.schema";
import { config } from "dotenv";
config();

const router = Router();

const get = async (request: Request, response: Response): Promise<Response> => {
  const news: newsType[] = await News.find();

  return response.json({
    data: news,
  });
};

const getById = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const news: newsType = await News.findById(request.params.id);

  return response.json({
    data: news,
  });
};

const post = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { title, text, authorId } = request.body;

    const jwt = await route.checkAuth(
      request,
      response,
      process.env.JWT_SECRET
    );

    if (typeof jwt == "object") {
      return response.status(401).send({
        error: "You are not authorized",
      });
    }

    if (!jwt) {
      return response.status(401).send({
        error: "You are not authorized",
      });
    }

    if (!title || !text || !authorId) {
      return response.status(400).json({
        error: "title, text and authorId is required",
      });
    }

    const news: newsType = await News.create({
      title,
      text,
      authorId,
    });

    return response.json({
      data: news,
    });
  } catch (error) {
    return response.status(400).json(error);
  }
};

const patch = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const jwt = await route.checkAuth(request, response, process.env.JWT_SECRET);

  if (typeof jwt == "object") {
    return response.status(401).send({
      error: "You are not authorized",
    });
  }

  if (!jwt) {
    return response.status(401).send({
      error: "You are not authorized",
    });
  }

  await News.findOneAndUpdate(
    {
      _id: request.params.id,
    },
    request.body,
    {
      upsert: true,
    }
  );

  const news: newsType = await News.findOne({
    _id: request.params.id,
  });

  return response.json({
    data: news,
  });
};

const remove = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const jwt = await route.checkAuth(request, response, process.env.JWT_SECRET);

  if (typeof jwt == "object") {
    return response.status(401).send({
      error: "You are not authorized",
    });
  }

  if (!jwt) {
    return response.status(401).send({
      error: "You are not authorized",
    });
  }

  const news: newsType = await News.findOneAndRemove({
    _id: request.params.id,
  });

  return response.json({
    data: news,
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
