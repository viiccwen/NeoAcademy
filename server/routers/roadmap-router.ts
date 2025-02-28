import authMiddleware from 'middlewares/auth-middleware';
import { Router } from 'express';
import { checkSection, createRoadmap, deleteRoadmap, getRoadmap, getRoadmaps } from 'controllers/roadmap-controller';
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

// delete roadmap
roadmapRouter.delete('/roadmap/:id', authMiddleware, deleteRoadmap);

// check section / subsection
roadmapRouter.put('/roadmap/:roadmap/:sectionId', authMiddleware, checkSection);


export default roadmapRouter;
