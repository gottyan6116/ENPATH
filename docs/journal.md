# ENPATH JOURNAL 運用ガイド

## 現在の状態

6本の企画をすべてdraftで登録。記事本文・公開日・正式著者は未登録です。本番の`/journal`には準備中の案内を表示し、下書きの詳細URLは404になります。取材していない創業体験、実績、学習効果などを補完していません。

開発サーバーでのみ、`http://127.0.0.1:3000/journal?preview=1`で一覧を確認できます。記事詳細にも`?preview=1`が必要です。プレビューはnoindexで、Article構造化データとJOURNAL固有の計測を送信しません。本文が空なら`_preview.mdx`の明示されたレイアウト確認用サンプルを表示します。**本番ビルドではpreview指定による下書きの閲覧はできません。**

## 記事を追加・編集する

1. `src/content/journal/`内のMDXを複製し、ファイル名とslugを一致させます。
2. 冒頭のYAML項目を更新し、`---`の下に本文を記述します。
3. 開発用プレビューで写真・改行・リンク・スマートフォン表示を確認します。
4. 事実・出典・画像の利用権・著者表示・申込導線を確認し、所有者の承認を得ます。
5. 実際の公開日を設定し、statusをpublishedに変更します。検証後、承認を得てpush・デプロイします。

```yaml
---
title: "正式な記事タイトル"
description: "記事の要約"
slug: "article-slug"
category: "learning"
publishedAt: null
updatedAt: null
author: null
coverImage: "/media/planning.webp"
featured: false
status: "draft"
---
```

categoryは`learning`（英語学習のヒント）/`our-story`（ENPATHの想い）/`perspectives`（英語と、これから）。定義・説明は`src/content/journal.ts`に集約。日付は引用符付き`"YYYY-MM-DD"`、未確定ならnull。著者は正式名称が確認できた場合だけ設定。featuredはtrue/falseで指定、一覧上の先頭の該当記事が注目記事になります。全カテゴリで1本を推奨。

画像は`public/media/`または`public/images/`に置き、coverImageにルート相対パスを指定。画像は16:9推奨、Next Imageで配信します。現在は既存の生成写真planning/onlineをイメージとして再利用しています（`docs/assets.md`参照）。実際のコーチや受講者の写真として使用しないでください。正式公開前に各記事に合う写真への差し替えを推奨します。

本文はMarkdown/MDXです。`##`見出し、`###`小見出し、箇条書き、番号付きリスト、`>`引用、Markdown表、リンク、`![具体的なalt](/media/image.webp)`が使えます。本文の見出しはh2から始めます。画像は16:9で登録してください。JavaScript式は無効化しています。信頼されたローカル原稿だけを登録し、読者入力や外部HTMLを取り込まないでください。表は狭い画面で表の領域のみ横スクロールできます。

`npm run validate:journal`で項目・画像存在・MDXの構文を検証します。ビルド前にも自動実行します。公開記事には本文と公開日が必須で、不正な日付・カテゴリ・slugなどはファイル名付きエラーで停止します。更新日を記載する場合は公開日以降にしてください。

## SEO

一覧・記事ごとのtitle/description/canonical/OGP/Twitter設定を実装。カテゴリ別URLは一覧のcanonicalを使い、重複インデックスを避けます。公開記事のみにArticle/BreadcrumbList JSON-LDを生成し、確認できた著者・日付のみ記載します。sitemapには公開記事のみ追加。既存のNEXT_PUBLIC_SITE_URLとSITE_READY_FOR_INDEXINGを継承し、公開準備フラグが未設定ならnoindexを維持します。

## 計測

既存GTM/dataLayerを利用し、新しいGAタグや手動page_viewは追加していません。

| dataLayerイベント | タイミング | パラメータ |
| --- | --- | --- |
| journal_article_view | 公開記事詳細の初回表示 | slug, category, title |
| journal_category_select | カテゴリリンクの選択 | slug=journal, category, title |
| journal_cta_click | JOURNAL末尾の予約リンク | slug, category, title |
| journal_related_article_click | 関連記事リンク | 遷移先のslug, category, title |

GTMで上記カスタムイベントトリガー→既存GA4設定のイベントタグを作り、各パラメータをdataLayer変数から渡します。プレビューはJOURNAL固有イベントを除外します。既存BookingLinkのconsultation_booking_clickは維持しています。これとjournal_cta_clickを両方申込完了として登録しないでください。

page_viewは既存GA4拡張計測の履歴変更、またはGTMのHistory ChangeでSPA遷移を計測します。**片方だけを有効にして重複を避けてください。**コードからアカウント内のタグ設定・GA4への受信状況は検証できないため、公開前にTag AssistantとGA4 DebugViewで確認が必要です。Google Formsは外部サービスのため、CTAクリックとフォーム送信完了の接続・完了計測は未実装です。CTAを申込完了と扱わないでください。

## 本番公開前

- 取材・出典確認・原稿承認、実際の日付と著者
- サムネイルと本文画像の利用権、alt、イメージ表示
- Google Formsリンクと実際の送信受付
- 本番URL・インデックス準備フラグ・GTM設定
- 型検証、記事検証、テスト、ビルド
- 所有者による公開・デプロイ承認。サイトのデプロイ承認と記事本文の公開承認は別に確認します。

ESLintは元のプロジェクトに導入されていないため、型検証・ビルド・自動テスト・表示確認を使用しています。

## 変更ファイル一覧

- `src/app/journal/page.tsx`：一覧・カテゴリ・注目記事・紹介・SEO
- `src/app/journal/[slug]/page.tsx`：記事詳細・MDX・関連記事・構造化データ
- `src/components/journal/Journal.tsx`：共通レイアウト・カード・CTA・ホーム導線
- `src/components/journal/JournalTracking.tsx`：既存dataLayerへの計測
- `src/components/journal/journal.module.css`：一覧・本文・レスポンシブ表示
- `src/content/journal.ts`：カテゴリと媒体の文言
- `src/content/journal/*.mdx`：6本の下書き企画と開発用レイアウトサンプル
- `src/lib/journal.ts`：読み込み・メタデータ検証・公開制御
- `src/lib/analytics.ts`：JOURNALイベント名を追加
- `src/components/Header.tsx`、`Footer.tsx`：JOURNALリンク
- `src/app/page.tsx`：ホームからJOURNALへの紹介導線
- `src/app/globals.css`：ヘッダーの現在地表示とタブレットメニュー
- `src/app/sitemap.ts`：一覧・公開記事のみ登録
- `scripts/validate-journal.mts`：ビルド前の記事検証
- `tests/journal.test.ts`、`tests/e2e/journal.spec.ts`：公開制御・表示・操作・計測の検証
- `package.json`、`package-lock.json`：MDX・Markdown表・YAMLの依存関係と検証コマンド
- `docs/journal.md`：本ガイド

## 今回の検証結果

- TypeScript型検証・記事検証・最終本番ビルド成功。
- 単体テスト7件成功。
- 既存機能を含む画面テスト34件成功、端末条件により4件スキップ。その後、計測確認を追加したJOURNAL専用テスト8件すべて成功。
- 1440・768・390・375pxで一覧・記事本文の横はみ出しなし。カテゴリ、詳細遷移、戻る、モバイルメニュー、Escapeでのフォーカス復帰を確認。
- 本番モードの一覧には下書きがなく、preview指定の有無にかかわらず下書き詳細は404。sitemapに下書きなし。
- dataLayerへのカテゴリ選択は1回送信、開発プレビューからJOURNALイベントを送信しないことを確認。
- 追加依存関係の監査結果は脆弱性0件。
- ローカルのPC・スマホ確認画像を保存。実装確認後、所有者からpush・デプロイの承認を受領。記事6本は引き続き下書きです。
