import { Request, Response } from "express";
import { IUser } from "../interfaces";
import { userservices } from "../services";
import { status } from "../utills";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import config from "config";
const secretkey = String(config.get("SecretKey"));
import { NewRequest } from "../middlewares/verify.middleware";
const userservice = new userservices();
export class usercontrolleres {
  async createuser(req: Request, res: Response) {
    try {
      let user: IUser = req.body;
      user.image = req.file?.filename;
      user.password = await bcrypt.hash(user.password, 10);
      console.log(user)
      const createdUser = await userservice.createuser(user);
      res.status(status.ok).json(createdUser);
    } catch (error: any) {
      res
        .status(status.bad_request)
        .json({ message: error.message, status: false });
    }
  }
  async loginuser(req: Request, res: Response) {
    try {
      let { email, password } = req.body;
      const createdUser: any = await userservice.loginuser(email);
      if (createdUser === null) {
        return res
          .status(status.not_fouund)
          .json({ message: "User Not Found", status: false });
      } else {
        const ispass = await bcrypt.compare(
          password,
          createdUser.data?.password
        );
        if (ispass) {
          const token = await Jwt.sign(
            {
              userid: createdUser.data._id,
              userrole: createdUser.data.role,
            },
            secretkey
          );

          return res
            .status(status.ok)
            .json({
              message: "Login Successful",
              status: true,
              token: token,
              data: createdUser,
            });
        } else {
          return res
            .status(status.not_fouund)
            .json({ message: "Password Does Not Match", status: false });
        }
      }
      //   res.status(status.ok).json(createdUser);
    } catch (error: any) {
      return res
        .status(status.bad_request)
        .json({ message: error.message, status: false });
    }
  }
  async getalluser(req: Request, res: Response) {
    try {
      const getUser = await userservice.getalluser();
      res.status(status.ok).json(getUser);
    } catch (error: any) {
      res
        .status(status.bad_request)
        .json({ message: error.message, status: false });
    }
  }
  async getuser(req: NewRequest, res: Response) {
    try {
      const { user } = req;
      const getUser = await userservice.getuser(String(user.userid));
      res.status(status.ok).json(getUser);
    } catch (error: any) {
      res
        .status(status.bad_request)
        .json({ message: error.message, status: false });
    }
  }
  async updateuser(req: NewRequest, res: Response) {
    try {
      const { user } = req;
      const userdata: IUser = req.body;
      const getUser = await userservice.updateuser(
        String(user.userid),
        userdata
      );
      res.status(status.ok).json(getUser);
    } catch (error: any) {
      res
        .status(status.bad_request)
        .json({ message: error.message, status: false });
    }
  }
  async deleteuser(req: NewRequest, res: Response) {
    try {
      const { user } = req;
      const getUser = await userservice.deleteuser(String(user.userid));
      res.status(status.ok).json(getUser);
    } catch (error: any) {
      res
        .status(status.bad_request)
        .json({ message: error.message, status: false });
    }
  }
  async deleteuserbyadmin(req: NewRequest, res: Response) {
    try {
      const { userid } = req.params;
      const getUser = await userservice.deleteuser(userid);
      res.status(status.ok).json(getUser);
    } catch (error: any) {
      res
        .status(status.bad_request)
        .json({ message: error.message, status: false });
    }
  }
}
