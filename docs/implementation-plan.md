# ENPATH Implementation Plan

**Goal:** 提供された仕様に基づく実際に動作する日本語サイトを作る。
**Architecture:** 静的コンテンツはServer Components、操作部分のみClient Components。未確定情報と素材はsrc/content/site.tsに分離。
**Tech Stack:** Next.js / React / TypeScript / Tailwind CSS / Lucide。
**Spec:** docs/design.md, docs/master-brief.md。
**Execution:** このセッションで直接実装。ユーザーの着手指示に従う。

## Constraints / Review focus
- 架空の予約完了、プロフィール、価格を作らない。
- 未設定/不正なURLから外部遷移しない。単体テストで確認。
- 動画未設定または失敗時には静止画表示、再生ボタン無し。
- モバイルで横溢れ無し、メニューのEscapeとフォーカス復帰を確認。
- reduced-motionでは自動動画再生/装飾アニメーションを無効化。
- 目的選択で学習計画全体が切り替わり、サンプル表示が残る。

## Tasks
- [x] 設定と意味のあるURL検証テストを先に作成し、失敗を確認。
- [x] 基盤・SEO: src/app/layout.tsx, src/lib/config.ts, src/app/robots.ts, src/app/sitemap.ts。
- [x] 素材・データ: src/content/site.ts, src/components/Photo.tsx。提供素材をCSSクロップで暫定使用。
- [x] ヒーロー・ナビ: Header.tsx, Hero.tsx, BookingLink.tsx。静止画/動画の実際の状態に対応。
- [x] セクション: StorySections.tsx, Roadmap.tsx, Approach.tsx, TrustSections.tsx, Footer.tsx。
- [x] UI検証: チャプター/目的選択/FAQ/予約未設定/メニュー/キーボード/モバイル/コンソール。
- [x] npm test、npm run typecheck、npm run buildで確認。
- [x] ブラウザで提供参考画像と照合し、公開手順・未提供素材をREADMEに整理。

