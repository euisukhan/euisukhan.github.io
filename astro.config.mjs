// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://euisukhan.com',
  // base: '/repo-name', // only for a *project* Pages site (not <account>.github.io)
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({ i18n: { defaultLocale: 'ko', locales: { ko: 'ko-KR', en: 'en-US' } } }),
  ],
  markdown: { shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } } },
});
