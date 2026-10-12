// 연락처·SNS·판매 플랫폼·상품 링크를 한 곳(src/data/channels.json)에서 읽어 정리합니다.
// URL이 빈 항목은 사이트 어디에도 나타나지 않습니다. 플랫폼을 추가하려면 JSON(또는 CMS)에 URL만 채우면 됩니다.
import data from '../data/channels.json';

export interface Link {
  name: string;
  url: string;
}

const filled = (url?: string) => typeof url === 'string' && url.trim() !== '';

/** 표시용 번호와 tel: 링크 */
export const phone = data.phone
  ? {
      display: data.phone,
      href: `tel:+82${data.phone.replace(/\D/g, '').replace(/^0/, '')}`,
    }
  : null;

export const socials: Link[] = data.socials.filter((s) => filled(s.url));

/** URL이 있는 판매 플랫폼(스토어 홈) */
export const stores: (Link & { id: string })[] = data.stores.filter((s) => filled(s.url));

const storeName = (id: string) => data.stores.find((s) => s.id === id)?.name ?? id;
const storeHome = (id: string) => data.stores.find((s) => s.id === id)?.url ?? '';

/**
 * 상품별 구매 링크. 상품 페이지 URL이 있으면 그것을, 없으면 해당 플랫폼의 스토어 홈을 씁니다.
 * 둘 다 없으면 그 플랫폼은 빠집니다.
 */
export const products = data.products.map((p) => ({
  id: p.id,
  name: p.name,
  image: p.image,
  buy: p.links
    .map((l) => ({ name: storeName(l.store), url: filled(l.url) ? l.url : storeHome(l.store) }))
    .filter((l) => filled(l.url)),
}));

/** 구조화 데이터(sameAs)에 넣을 외부 프로필 */
export const sameAs = [...socials, ...stores].map((l) => l.url);
