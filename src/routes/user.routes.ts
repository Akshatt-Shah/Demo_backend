import { Router } from "express";
import { authrole, authtoken } from "../middlewares/verify.middleware";
import { upload } from "../middlewares/multer.middleware";
import { usercontrolleres } from "../controlleres";
const usercontroller = new usercontrolleres();
const uroute = Router();

uroute.post("/user/create", upload.single("image"), usercontroller.createuser);

uroute.get(
  "/user/getall",
  authtoken,
  authrole(["admin"]),
  usercontroller.getalluser
);

uroute.get(
  "/user/getuser",
  authtoken,
  authrole(["admin", "user"]),
  usercontroller.getuser
);

uroute.put(
  "/user/updateuser",
  authtoken,
  authrole(["admin", "user"]),
  usercontroller.updateuser
);

uroute.delete(
  "/user/deleteuser",
  authtoken,
  authrole(["admin", "user"]),
  usercontroller.deleteuser
);

uroute.delete(
  "/user/deleteuser/:userid",
  authtoken,
  authrole(["admin"]),
  usercontroller.deleteuserbyadmin
);
uroute.post("/user/loginuser", usercontroller.loginuser);

export { uroute };
