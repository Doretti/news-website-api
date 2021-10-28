import { Response, Request, Router } from "express";
import jwt from "jsonwebtoken";

type functionRoute = (
  request: Request,
  response: Response
) => Promise<Response>;

type inputRoute = {
  function?: functionRoute | undefined | null | 0;
};

export default class route {
  constructor(
    router: Router,
    path: String,
    get?: inputRoute,
    getById?: inputRoute,
    post?: inputRoute,
    patch?: inputRoute,
    remove?: inputRoute
  ) {
    remove?.function ? (this._delete = remove.function) : null;
    get?.function ? (this._get = get.function) : null;
    getById?.function ? (this._getById = getById.function) : null;
    patch?.function ? (this._patch = patch.function) : null;
    post?.function ? (this._post = post.function) : null;
    router.get(`${path}`, this._get);
    router.get(`${path}:id`, this._getById);
    router.post(`${path}`, this._post);
    router.delete(`${path}:id`, this._delete);
    router.patch(`${path}:id`, this._patch);
    this.router = router;
  }

  private _get = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    return response.status(501).send({
      error: "Not identified get method",
      status: 501,
    });
  };

  private _getById = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    return response.status(501).send({
      error: "Not identified get by id method",
      status: 501,
    });
  };

  private _patch = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    return response.status(501).send({
      error: "Not identified patch method",
      status: 501,
    });
  };

  private _post = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    return response.status(501).send({
      error: "Not identified post method",
      status: 501,
    });
  };

  private _delete = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    return response.status(501).send({
      error: "Not identified delete method",
      status: 501,
    });
  };

  static checkAuth = async (
    request: Request,
    response: Response,
    jwtSecret: string | undefined
  ): Promise<any> => {
    try {
      const { headers } = request;

      if (!headers.authorization) {
        return false;
      }

      if (!jwtSecret) {
        return false;
      }

      const token = headers.authorization.split(" ")[1];
      const jwtCheck = jwt.verify(token, jwtSecret);

      if (jwtCheck) return true;
      return false;
    } catch (error) {
      return error;
    }
  };

  router = Router();
}
