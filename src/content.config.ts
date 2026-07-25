import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

// Astro 5 Content Layer API: 파일시스템 글로브 로더 사용
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // CMS가 public/images 에 업로드하고 '/images/…' 절대경로로 넣습니다.
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),

    // ── Minecraft 팜 데이터 (선택) ──
    farmType: z.string().optional(), // 예: 'XP', 'Iron', 'Sugar Cane'
    mcVersion: z.string().optional(), // 예: '1.21'
    rate: z.string().optional(), // 예: '~400 items/hour'
    difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional(),
    materials: z.array(z.string()).default([]), // 예: '64x Cobblestone'
    credit: z.string().optional(), // 원 설계자 이름
    creditUrl: z.string().optional(), // 원 설계자/영상 링크
    // public/schematics 안의 .schem/.litematic/.nbt 경로. 3D 뷰어가 로드.
    schematic: z.string().optional(),
  }),
});

export const collections = { blog };
