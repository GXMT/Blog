// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/consts.mjs';

// https://astro.build/config
export default defineConfig({
  // 배포 도메인. 반드시 실제 도메인으로 바꾸세요. sitemap/RSS/canonical에 사용됩니다.
  site: SITE_URL,
  integrations: [
    mdx(),
    // 빌드 시 sitemap-index.xml + sitemap-0.xml 자동 생성 (구글용)
    sitemap({
      i18n: undefined,
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
  // 이미지 최적화: sharp로 WebP 변환 + srcset 자동 생성
  image: {
    // 외부 이미지도 최적화하려면 도메인을 추가하세요.
    domains: [],
  },
  build: {
    // <head>가 아니라 각 컴포넌트 근처에 스타일을 인라인 → 렌더 블로킹 최소화
    inlineStylesheets: 'auto',
  },
});
