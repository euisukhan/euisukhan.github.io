import { getCollection } from 'astro:content';

export type Coll = 'essays' | 'research' | 'tools' | 'music';
export type Lang = 'ko' | 'en';

// English entries live in <collection>/en/*.md → id "en/<slug>". Korean entries: id "<slug>".
export const isEn = (id: string) => id.startsWith('en/');
export const slugOf = (id: string) => id.replace(/^en\//, '');
export const hrefFor = (coll: Coll, entry: { id: string }) =>
  isEn(entry.id) ? `/en/${coll}/${slugOf(entry.id)}/` : `/${coll}/${entry.id}/`;
export const listHref = (coll: Coll, lang: Lang) => (lang === 'en' ? `/en/${coll}/` : `/${coll}/`);

const byDate = (a: any, b: any) => b.data.date.valueOf() - a.data.date.valueOf();

export async function entries(coll: Coll, lang: Lang) {
  const all = await getCollection(coll as any, ({ data }: any) => !data.draft);
  return (all as any[]).filter((e) => isEn(e.id) === (lang === 'en')).sort(byDate);
}

// The same slug in the other language, if it exists (used for hreflang alternates).
export async function counterpart(coll: Coll, entry: { id: string }) {
  const other = await entries(coll, isEn(entry.id) ? 'ko' : 'en');
  return other.find((e) => slugOf(e.id) === slugOf(entry.id)) ?? null;
}
