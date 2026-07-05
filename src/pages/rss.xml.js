import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts.mjs';

const parser = new MarkdownIt();

// 네이버·다음은 RSS 본문 전체(content:encoded)가 들어있을 때 수집이 잘 됩니다.
// 마크다운을 HTML로 렌더링해 그대로 피드에 삽입합니다.
export async function GET(context) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    // xmlns 추가로 일부 리더 호환성 향상
    xmlns: { content: 'http://purl.org/rss/1.0/modules/content/' },
    items: posts.map((post) => {
      const html = sanitizeHtml(parser.render(post.body ?? ''), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2']),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          img: ['src', 'alt', 'title', 'width', 'height'],
        },
      });
      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/blog/${post.id}/`,
        categories: post.data.tags,
        // @astrojs/rss가 content:encoded로 출력
        content: html,
      };
    }),
  });
}
