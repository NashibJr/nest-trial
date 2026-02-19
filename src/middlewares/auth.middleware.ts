import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
class AuthMiddleware implements NestMiddleware {
  use = (req: Request, res: Response, next: NextFunction) => {
    console.log("applying middleware");
    next();
  };
}

export default AuthMiddleware;
