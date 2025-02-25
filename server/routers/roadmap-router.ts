import authMiddleware from 'middlewares/auth-middleware';
import { Router } from 'express';
import { createRoadmap, deleteRoadmap, getRoadmap, getRoadmaps } from 'controllers/roadmap-controller';
import validateBodyMiddleware from 'middlewares/validate-body-middleware';
import { createRoadmapSchema } from 'schemas/roadmap';

const roadmapRouter = Router();

// create roadmap
roadmapRouter.post(
    '/roadmap',
    authMiddleware,
    validateBodyMiddleware(createRoadmapSchema),
    createRoadmap
);

// get all roadmaps
roadmapRouter.get('/roadmap', authMiddleware, getRoadmaps);

// get single roadmap
roadmapRouter.get('/roadmap/:id', authMiddleware, getRoadmap);

roadmapRouter.delete('/roadmap/:id', authMiddleware, deleteRoadmap);

export default roadmapRouter;
