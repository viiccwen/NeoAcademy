import type { Request, Response } from 'express';
import type { createRoadmapSchema } from 'schemas/roadmap';
import { omitProperties } from 'utils/objects';
import { generateRoadmap, recordRoadmap } from 'utils/roadmap';
import type { z } from 'zod';


export async function createRoadmap(req: Request, res: Response): Promise<void> {
    const { name, description, topic } = req.body as z.infer<typeof createRoadmapSchema>;

    try {
        const roadmap = await generateRoadmap(name, description, topic);

        recordRoadmap(req.user!, roadmap);
        res.status(200).json(roadmap);
    } catch (e: any) {
        console.error(e);
        res.status(500).json({ message: e.message || '發生未知錯誤！' });
    }
}


export async function getRoadmaps(req: Request, res: Response): Promise<void> {
    try {
        res.status(200).json(
            req.user!.roadmaps?.map(roadmap => ({
                ...omitProperties(roadmap, 'sections'),
                totalSections: roadmap.sections.length,
            })) || [],
        );
    } catch (e: any) {
        console.error(e);
        res.status(500).json({ message: e.message || '發生未知錯誤！' });
    }
}


export async function getRoadmap(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const roadmap = req.user!.roadmaps?.find(roadmap => roadmap.id.toString() === id);

        if (roadmap) {
            res.status(200).json(roadmap);
        } else {
            res.sendStatus(404);
        }
    } catch (e: any) {
        console.error(e);
        res.status(500).json({ message: e.message || '發生未知錯誤！' });
    }
}
