import authMiddleware from "middlewares/auth-middleware";
import { Router } from "express";

const roadmapRouter = Router();

roadmapRouter.post("/roadmap", authMiddleware);

// get all roadmaps
roadmapRouter.get("/roadmap", authMiddleware);

// get single roadmap
roadmapRouter.get("/roadmap/:id", authMiddleware);

export default roadmapRouter;
