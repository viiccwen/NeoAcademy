import type { ObjectId } from 'mongodb';


export interface Roadmap {
    id: ObjectId;
    name: string;
    topic: string;
    description: string;
    progress: number;
    sections: Section[];
    createdAt: Date;
}

export interface Section {
    id: ObjectId;
    title: string;
    description: string;
    subsections: Subsection[];
}

export interface Subsection {
    id: ObjectId;
    title: string;
    description: string;
    checked: boolean;
}
