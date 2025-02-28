import { users } from 'database';
import type { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
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

export async function deleteRoadmap(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;

        const result = await users.updateOne(
            { _id: req.user!._id },
            { $pull: { roadmaps: { id: new ObjectId(id) } } }
        );

        if (!result.modifiedCount) {
            res.status(404).json({ message: '沒有此 Roadmap！' });
            return;
        }

        res.sendStatus(204);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message || '發生未知錯誤！' });
    }
}

export async function checkSection(req: Request, res: Response): Promise<void> {
    try {
        const { roadmapId, sectionId, subsectionId, checked } = req.body;
        
        if (!subsectionId) {
            await users.updateMany(
                { _id: req.user!._id, 'roadmaps.id': roadmapId, 'roadmaps.sections.id': sectionId },
                { $set: { 'roadmaps.$[].sections.$[section].subsections.$[].checked': checked } },
                { arrayFilters: [{ 'section.id': roadmapId }] },
            );
        } else {
            await users.updateOne(
                { _id: req.user!._id, 'roadmaps.id': roadmapId, 'roadmaps.sections.id': sectionId, 'roadmaps.sections.subsections.id': subsectionId },
                { $set: { 'roadmaps.sections.subsections.checked': checked } },
            );
        }

        res.sendStatus(204);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message || '發生未知錯誤！' });
    }
}
