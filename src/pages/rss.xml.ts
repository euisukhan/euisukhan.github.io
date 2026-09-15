import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { entries, hrefFor, type Coll } from '../lib/content';

export async function GET(context: APIContext) {
  const colls: Coll[] = ['essays', 'research', 'tools', 'music'];
  const items = (await Promise.all(colls.map(async (c) => {
    const both = [...(await entries(c, 'ko')), ...(await entries(c, 'en'))];
    return both.map((e: any) => ({ title: e.data.title, pubDate: e.data.date, description: e.data.summary, link: hrefFor(c, e) }));
  }))).flat().sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());
  return rss({ title: 'Euisuk Han', description: '연구, 음악, 도구의 기록 / research, music, tools', site: context.site!, items });
}
