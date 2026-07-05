# SEO 최적화 Astro 블로그

구글·네이버·다음 동시 노출 + 애드센스를 염두에 둔 정적 블로그.

## 특징

- **Astro SSG (제로 JS)** — 빠른 로딩, 안정적인 Core Web Vitals
- **CLS-safe 광고** — `min-height`로 자리를 미리 확보해 광고 로드 시 본문이 밀리지 않음
- **애드센스 지연 로딩** — `requestIdleCallback`(상한 3s)로 초기 렌더 방해 최소화
- **전문(全文) RSS** — `content:encoded`에 본문 HTML 전체 삽입 (네이버·다음 수집용)
- **자동 sitemap** — `@astrojs/sitemap`이 빌드 시 생성 (구글용)
- **JSON-LD (BlogPosting) + Open Graph** — 리치결과 + 카카오톡/네이버 공유 미리보기
- **이미지 최적화** — Astro `<Image/>`로 WebP + `srcset` 자동 생성

## 시작

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ 에 정적 파일 생성
npm run preview  # 빌드 결과 미리보기
```

> Node 18.17.1+ 또는 20.3.0+ 권장 (Astro 5 요구사항).

## 배포 전 필수 설정

`src/consts.mjs` 를 수정하세요:

| 항목 | 설명 |
|---|---|
| `SITE_URL` | 실제 도메인 (sitemap/RSS/canonical에 사용) |
| `SITE_TITLE` / `SITE_DESCRIPTION` / `AUTHOR` | 사이트 정보 |
| `ADSENSE_CLIENT` | `ca-pub-...` 게시자 ID. **빈 값이면 광고 미표시** |
| `NAVER_SITE_VERIFICATION` / `GOOGLE_SITE_VERIFICATION` | 웹마스터도구 소유확인 값 |

`astro.config.mjs`의 `site`, `public/robots.txt`의 Sitemap URL도 도메인에 맞게 바뀝니다
(`site`는 `consts.mjs`에서 자동으로 읽어옵니다).

## 글 작성

`src/content/blog/` 에 `.md` 또는 `.mdx` 파일 추가:

```markdown
---
title: '제목'
description: '검색결과/공유에 쓰이는 요약'
pubDate: 2026-07-05
tags: ['태그1', '태그2']
# heroImage: './cover.png'   # 같은 폴더의 이미지, 빌드 시 최적화됨
# draft: true                 # true면 발행 제외
---

본문...
```

## 애드센스 광고 넣기

`src/components/AdSense.astro` 컴포넌트 사용 (슬롯 ID는 애드센스에서 발급):

```astro
<AdSense slot="1234567890" minHeight={280} />
```

기본으로 글 하단(`BlogPost.astro`)에 하나 들어가 있습니다. 슬롯 ID를 실제 값으로 교체하세요.

## 검색엔진 등록 체크리스트

- **구글**: [Search Console](https://search.google.com/search-console) → 소유확인 → `sitemap-index.xml` 제출
- **네이버**: [서치어드바이저](https://searchadvisor.naver.com) → 사이트 등록 → 소유확인 → RSS(`/rss.xml`)·사이트맵 제출
- **다음**: [다음 검색등록](https://register.search.daum.net) → 사이트/블로그 등록

> 참고: 네이버 검색은 자사 블로그를 우선 노출하는 경향이 있어, 독립 도메인은 **구글을 메인 채널**로 잡는 편이 현실적입니다.
