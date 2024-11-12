import express from "express";

import { getUsers } from "../controllers/userController";

const router = express.Router();

router.get("/users", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    await getUsers(req, res, next);
  } catch (error) {
    if (!res.headersSent) {
      next(error);
    }
  }
});

export default router;
