// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // 3주차에 euisukhan.com 커스텀 도메인으로 교체
  site: 'https://euisukhan.github.io',
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
