# ENPATH JOURNAL 記事の追加・公開手順

記事は `src/content/journal/<slug>.mdx` を1ファイル追加するだけで、共通テンプレート（サイドバー付き）が適用されます。

## 1. 記事を追加する

1. `src/content/journal/<slug>.mdx` を作成します。`slug` は半角英小文字・数字・ハイフンで、ファイル名と一致させます。
2. 先頭にメタデータ（frontmatter）を書きます。

```yaml
---
title: "記事のタイトル（H1）"
description: "リード文。メタディスクリプションとしても使われます。"
slug: "my-article"
category: "learning"        # learning / our-story / perspectives
date: null                  # 公開時に "YYYY-MM-DD"（publishedAt でも可）
updatedAt: null             # 更新したとき "YYYY-MM-DD"
author: null                # 正式な執筆者名。未確定なら null
image: "/images/journal/articles/xxx.webp"   # coverImage でも可
imageAlt: "アイキャッチ画像の説明"            # 公開時は必須
seoTitle: null              # 検索結果用の題名。null ならtitle
seoDescription: null        # null ならdescription
featured: false
status: "draft"             # draft / published
---
```

3. 画像は `public/images/journal/articles/` に置き、`image` にそのパスを書きます（16:9推奨、横1280px程度のWebP）。
4. 本文は `##`（H2）と `###`（H3）で見出しを付けます。目次は自動生成されます（見出しの重複はビルドエラー）。
5. `npm run validate:journal` で検証できます（ビルド時にも自動実行）。

## 2. 下書きを確認する（開発環境のみ）

`npm run dev` で起動し、`/journal/<slug>?preview=1` を開きます。本番では `draft` の記事は404になり、一覧・サイトマップにも出ません。

## 3. 公開する

`status: "published"` にし、`date`（公開日）・`imageAlt`・本文を設定します。条件が足りないとビルドが止まります。公開すると次が自動で行われます。

- `/journal/<slug>` の生成と、メタデータ・Article/BreadcrumbList の構造化データの出力
- サイトマップへの登録
- 一覧にカードが並ぶ。`src/content/journalCards.ts` に同じ `id`（= slug）のカードがあれば、そのカードがリンクになる

## 4. 本文で使える部品

| 記法 | 用途 |
| --- | --- |
| `<Ref n="3" />` / `<Ref n="1,2" />` | 注釈番号（参考文献へのリンク） |
| `<Note>…</Note>` / `<Note type="caution">…</Note>` | 補足・注意書き |
| `<Bars head1="…" head2="…" rows="ラベル:数値:表示文言, …">注記</Bars>` | 数値に比例した棒グラフ付きの表 |
| `<Faq>` + `<FaqItem q="質問">回答</FaqItem>` | FAQ（閉じていても回答はHTMLに含まれる） |
| `<Cta title="…">本文</Cta>` | 記事末尾のカウンセリングCTA（省略すると標準CTAが出る） |
| `<References>` + `<Reference n title publisher date href />` | 参考文献一覧 |
| `![alt](/images/…webp "キャプション")` | 画像（キャプション付き） |

MDXタグの前後・内側のMarkdownは、空行で区切ってください。
