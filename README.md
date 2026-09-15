# esh-site

Euisuk Han의 공개 사이트. Astro 정적 사이트, GitHub Pages 배포. 댓글 없음, 분석 도구 없음.

## 구조

- `src/content/essays|research|tools|music/*.md` — 콘텐츠. 프론트매터 스키마는 `src/content.config.ts`.
  - 공통: `title, date, lang(ko|en), summary, tags, draft`
  - research: `kind(preprint|protocol|note), link`
  - tools: `repo, status(personal|alpha|public)`
  - music: `youtubeId, instruments`
- `draft: true`면 빌드에서 제외됩니다. 영어 글은 `lang: en` → `/en/`에 모입니다.
- `/rss.xml`, `/sitemap-index.xml` 자동 생성.

## 로컬

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/
```

## 배포 (한 번만)

1. 공개용 GitHub 계정에서 저장소 생성. **사용자 사이트**로 쓰려면 저장소 이름을 `<account>.github.io`로.
2. `astro.config.mjs`의 `site`를 `https://<account>.github.io`로 교체. (프로젝트 사이트라면 `base: '/repo'`도 설정)
3. 푸시 → Settings → Pages → Source를 **GitHub Actions**로.
4. 커스텀 도메인: `public/CNAME`에 도메인 한 줄 + DNS(A/AAAA 또는 CNAME) 설정 → Pages에서 Enforce HTTPS.

## 공개 전 점검

- `src/pages/about.astro`의 연락처 TODO를 공개용 alias 주소로.
- 스크린샷·영상에 로컬 경로/사용자명이 보이지 않는지.
- 이 저장소에는 개인 데이터·비밀이 들어가지 않습니다 (콘텐츠와 사이트 코드만).

## 커밋 전 체크리스트 (공개 저장소)

1. 새 GitHub **계정을 만들지 않는다**(ToS B.3: 1인당 무료 계정 1개). 기존 계정을 공개 인격으로 재루팅: Settings → Account → Change username(예: `euisukhan`) → Emails에 Proton primary 추가·Primary 지정, Gmail은 보조로 유지 → "Keep my email addresses private" + "Block command line pushes" 체크. **rename은 `<username>.github.io` 저장소 생성 전에** (github.io는 리다이렉트 안 됨). 그 다음 `gh auth login`.
2. 이 저장소에서만 공개 아이덴티티 설정 — 전역 git 설정은 건드리지 않음(`--global` 없이):
   ```bash
   git config user.name "Euisuk Han"
   git config user.email "<id>+<username>@users.noreply.github.com"
   ```
   (`.git/hooks/pre-commit`가 gmail 주소로 커밋하면 막습니다. gitleaks도 같이 돕니다.)
3. `astro.config.mjs`의 `site`를 `https://<username>.github.io`로 교체.
4. `src/pages/about.astro`, `src/pages/en/about.astro`의 `TODO` 연락처 alias 교체.
5. `git add -A && git commit -m "site: initial"` → `gh repo create <username>.github.io --public --source=. --remote=origin --push`.
6. GitHub → Settings → Pages → Source = **GitHub Actions**. 첫 배포는 `.github/workflows/deploy.yml`이 처리.

## 구조 메모

- 한국어가 기본(`/`), 영어는 `/en/` 접두. 같은 slug의 글이 `src/content/<coll>/en/`에 있으면 hreflang·언어 전환 링크가 자동으로 연결됩니다.
- 새 글: `src/content/essays/YYYY-MM-slug.md` (영문판은 `src/content/essays/en/YYYY-MM-slug.md`, 같은 파일명).
- `draft: true`면 빌드에서 제외.
- 코드 블록은 라이트/다크 테마 자동 전환(shiki dual theme).
