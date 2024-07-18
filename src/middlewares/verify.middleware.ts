import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import config from "config";
const secretkey = String(config.get("SecretKey"));
export interface NewRequest extends Request {
  user?: any;
}
export function authtoken(req: NewRequest, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];

  if (token == null) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  Jwt.verify(token, secretkey, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
    // console.log(user);
    req.user = user; // Assuming the token contains the user's role
    req.headers["authorization"] = token;
    next();
  });
}

export function authrole(allowedroles: string[]) {
  return (req: NewRequest, res: Response, next: NextFunction) => {
    console.log(req.user);
    console.log(allowedroles)
    if (!req.user || !allowedroles.includes(req.user.userrole)) {
      return res
        .status(403)
        .json({
          message: "Forbidden: You do not have the required permissions",
        });
    }
    next();
  };
}
