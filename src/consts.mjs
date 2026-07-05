// ─────────────────────────────────────────────────────────────
// 사이트 전역 설정. 배포 전에 이 파일부터 채우세요.
// ─────────────────────────────────────────────────────────────

/** 실제 배포 도메인 (끝에 슬래시 X). sitemap/RSS/canonical/OG에 사용 */
export const SITE_URL = 'https://xpfarms.com';

export const SITE_TITLE = '내 블로그';
export const SITE_DESCRIPTION = '개발·일상·리뷰를 기록하는 블로그입니다.';
export const AUTHOR = '홍길동';
export const LOCALE = 'ko_KR';

/**
 * 애드센스 게시자 ID. 예: 'ca-pub-1234567890123456'
 * 빈 문자열('')이면 광고 스크립트/슬롯이 아예 렌더되지 않습니다(개발 중 권장).
 */
export const ADSENSE_CLIENT = 'ca-pub-6342283097254437';

/**
 * IndexNow 키. public/<KEY>.txt 파일명과 반드시 일치해야 합니다.
 * Bing·Yandex·Seznam·네이버에 새 URL을 즉시 통보하는 데 사용.
 */
export const INDEXNOW_KEY = '6461e5d476d9bb7caf9745843b58fb72';

/** 검색엔진 사이트 소유 확인용 메타 태그 값 (선택). 없으면 '' */
export const NAVER_SITE_VERIFICATION = '';
export const GOOGLE_SITE_VERIFICATION = '';
