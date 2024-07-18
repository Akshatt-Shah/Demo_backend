import { User } from "../models";
import { IUser } from "../interfaces";
import { msg } from "../utills";

export class userservices {
  async createuser(data: IUser) {
    try {
      const user = await User.create(data);
      return { message: msg.addsuccess("User"), status: true, data: user };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async getuser(id: String) {
    try {
      const user = await User.findOne({ _id: id });
      return { message: msg.getsuccess("User"), status: true, data: user };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async getalluser() {
    try {
      const user = await User.find();
      return { message: msg.getsuccess("User"), status: true, data: user };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async updateuser(id: String, data: any) {
    try {
      const user = await User.findOneAndUpdate({ _id: id }, data);
      return { message: msg.updatesuccess("User"), status: true, data: user };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async deleteuser(id: String) {
    try {
      const user = await User.findOneAndDelete({ _id: id });
      return { message: msg.updatesuccess("User"), status: true, data: user };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async loginuser(email: String) {
    try {
      const user = await User.findOne({ email: email });
      return { message: msg.getsuccess("User"), status: true, data: user };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
}
