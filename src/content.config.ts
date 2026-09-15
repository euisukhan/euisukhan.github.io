import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const base = z.object({
  title: z.string(),
  date: z.coerce.date(),
  lang: z.enum(['ko', 'en']).default('ko'),
  summary: z.string().default(''),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

const essays = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/essays' }),
  schema: base,
});

const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: base.extend({
    kind: z.enum(['preprint', 'protocol', 'note']).default('note'),
    link: z.string().url().optional(), // OSF / preprint URL
  }),
});

const tools = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tools' }),
  schema: base.extend({
    repo: z.string().url().optional(),
    status: z.enum(['personal', 'alpha', 'public']).default('personal'),
  }),
});

const music = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/music' }),
  schema: base.extend({
    youtubeId: z.string().optional(),
    instruments: z.array(z.string()).default([]),
  }),
});

export const collections = { essays, research, tools, music };
