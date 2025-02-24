import { z } from 'zod';


export const createRoadmapSchema = z.object({
  name: z
    .string()
    .min(2, { message: "路徑名稱至少需要 2 個字元" })
    .max(50, { message: "路徑名稱不能超過 50 個字元" }),
  topic: z.string({
    required_error: "請選擇主題分類",
  }),
  description: z
    .string()
    .min(10, { message: "描述至少需要 10 個字元" })
    .max(500, { message: "描述不能超過 500 個字元" }),
});

export type CreateRoadmapType = z.infer<typeof createRoadmapSchema>;

export type Roadmaps = {
  id: string;
  name: string;
  topic: string;
  description: string;
  progress: number;
  totalSections: number;
  createdAt: Date;
};
export interface Roadmap {
  id: string;
  name: string;
  description: string;
  sections: Section[];
}
export interface Section {
  id: string;
  title: string;
  description: string;
  subsections: Subsection[];
}
export interface Subsection {
  id: string;
  title: string;
  description: string;
}
