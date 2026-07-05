import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

// Astro 5 Content Layer API: 파일시스템 글로브 로더 사용
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      // 마크다운에 상대경로로 넣으면 빌드 시 최적화(WebP/srcset)됩니다.
      heroImage: image().optional(),
      heroAlt: z.string().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
