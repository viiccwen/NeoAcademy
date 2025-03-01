import { model } from 'app';
import { formatRoadmapHumanMessage, roadmapSystemMessage } from 'utils/message';
import type { Roadmap, Section } from 'types/Roadmap';
import { ObjectId } from 'mongodb';
import type { User } from 'types/User';
import { users } from 'database';


export async function generateRoadmap(
    name: string,
    description: string,
    topic: string
): Promise<Roadmap> {
    const aiMessage = await model.invoke([
        roadmapSystemMessage,
        formatRoadmapHumanMessage(name, description, topic)
    ]);

    const sections: Section[] = JSON.parse(
        aiMessage.content.toString()
    );

    sections.forEach(section => {
        section.id = new ObjectId();
        section.subsections.forEach(subsection => {
            subsection.id = new ObjectId();
        });
    });

    return {
        id: new ObjectId(),
        name,
        topic,
        description,
        progress: 1,
        sections,
        createdAt: new Date(),
    };
}

export async function recordRoadmap({ authId }: User, roadmap: Roadmap): Promise<void> {
    await users.updateOne({ authId }, { $push: { roadmaps: roadmap } });
}
