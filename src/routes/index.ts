import { Router } from "express";
import { uroute } from "./user.routes";


const route = Router();

route.use(uroute);


export { route };
