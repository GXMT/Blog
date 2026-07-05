// 빌드 결과(dist/sitemap-0.xml)의 모든 URL을 IndexNow로 통보합니다.
// Bing·Yandex·Seznam·네이버가 IndexNow 파트너이므로 한 번 전송으로 여러 엔진에 반영됩니다.
// 사용: node scripts/indexnow.mjs   (npm run deploy 에서 자동 실행)

import { readFile } from 'node:fs/promises';
import { SITE_URL, INDEXNOW_KEY } from '../src/consts.mjs';

const SITEMAP = new URL('../dist/sitemap-0.xml', import.meta.url);

async function main() {
  if (!INDEXNOW_KEY) {
    console.log('[indexnow] INDEXNOW_KEY 없음 — 건너뜀');
    return;
  }

  let xml;
  try {
    xml = await readFile(SITEMAP, 'utf8');
  } catch {
    console.log('[indexnow] dist/sitemap-0.xml 없음 — 먼저 빌드하세요. 건너뜀');
    return;
  }

  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (urlList.length === 0) {
    console.log('[indexnow] 제출할 URL 없음');
    return;
  }

  const host = new URL(SITE_URL).host;
  const body = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList,
  };

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });

  // IndexNow: 200/202 = 정상 접수
  console.log(
    `[indexnow] ${urlList.length}개 URL 전송 → HTTP ${res.status} ${res.statusText}`,
  );
  if (res.status !== 200 && res.status !== 202) {
    console.log('[indexnow] 응답 본문:', await res.text());
  }
}

main().catch((e) => {
  // 배포를 막지 않도록 실패해도 non-fatal 처리
  console.error('[indexnow] 오류(무시하고 계속):', e.message);
});
