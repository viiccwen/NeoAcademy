import { z } from 'zod';


export const createRoadmapSchema = z.object({
    name: z
        .string()
        .min(2, { message: '路徑名稱至少需要 2 個字元' })
        .max(50, { message: '路徑名稱不能超過 50 個字元' }),
    topic: z.string({
        required_error: '請選擇主題分類',
    }),
    description: z
        .string()
        .min(10, { message: '描述至少需要 10 個字元' })
        .max(500, { message: '描述不能超過 500 個字元' }),
});


export const checkSectionSchema = z.object({
    sectionId: z.string(),
    subsectionId: z.string().optional(),
    checked: z.boolean(),
});
