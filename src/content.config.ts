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
  }),
});

export const collections = { blog };
