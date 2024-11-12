import express from "express";
import { Request, Response } from "express";

import { getUsers } from "../controllers/userController";

const router = express.Router();

router.get("/users", async (req: Request, res: Response) => {
    await getUsers(req, res);
});


export default router;
