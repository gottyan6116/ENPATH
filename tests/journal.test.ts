import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getArticles,
  visibleArticles,
  isJournalPreview,
  parseArticle,
} from "../src/lib/journal";
const fixture = (overrides = "", body = "") =>
  `---\ntitle: "確認用"\ndescription: "メタデータ検証用"\nslug: "fixture"\ncategory: "learning"\npublishedAt: null\nupdatedAt: null\nauthor: null\ncoverImage: "/media/planning.webp"\nfeatured: false\nstatus: "draft"\n${overrides}---\n${body}`;
test("下書きは公開一覧に含まれず、プレビューでのみ全件見える", async () => {
  const articles = await getArticles();
  assert.ok(articles.length >= 9);
  const drafts = articles.filter((article) => article.status === "draft");
  assert.ok(drafts.length > 0);
  const publicList = visibleArticles(articles);
  assert.ok(publicList.every((article) => article.status === "published"));
  assert.ok(
    drafts.every((draft) => !publicList.some((a) => a.slug === draft.slug)),
  );
  assert.equal(visibleArticles(articles, true).length, articles.length);
});
test("未公開のカード用記事は下書きで、日付・執筆者を持たない", async () => {
  const draft = (await getArticles()).find(
    (article) => article.slug === "why-enpath-story",
  );
  assert.ok(draft);
  assert.ok(
    draft.status === "draft" &&
      draft.publishedAt === null &&
      draft.author === null &&
      draft.imageAlt,
  );
});
test("第1記事は公開済みで、公開日・画像説明・SEO題名を持つ", async () => {
  const article = (await getArticles()).find(
    (item) => item.slug === "japanese-english-education",
  );
  assert.ok(article);
  assert.equal(article.status, "published");
  assert.match(article.publishedAt ?? "", /^\d{4}-\d{2}-\d{2}$/);
  assert.ok(article.imageAlt);
  assert.ok(article.seoTitle);
  assert.ok(article.body.includes("<Ref n="));
  assert.ok(visibleArticles(await getArticles()).some((item) => item.slug === article.slug));
});
test("日付・画像の別名（date / image）を受け付ける", () => {
  const article = parseArticle(
    fixture("")
      .replace("publishedAt: null", 'date: "2026-10-12"')
      .replace("coverImage:", "image:")
      .replace('status: "draft"', 'status: "draft"'),
    "fixture.mdx",
  );
  assert.equal(article.publishedAt, "2026-10-12");
  assert.equal(article.coverImage, "/media/planning.webp");
});
test("プレビュー指定で本番・テスト環境の公開制限を解除できない", () => {
  for (const environment of ["production", "test"] as const)
    assert.equal(isJournalPreview({ preview: "1" }, environment), false);
  assert.equal(isJournalPreview({ preview: "1" }, "development"), true);
  assert.equal(isJournalPreview({ preview: ["1", "1"] }, "development"), false);
  assert.equal(isJournalPreview({}, "development"), false);
});
test("不正なメタデータをファイル名付きで報告する", () => {
  assert.throws(
    () =>
      parseArticle(
        fixture().replace('category: "learning"', 'category: "unknown"'),
        "fixture.mdx",
      ),
    /fixture.mdx.*category/,
  );
  assert.throws(() => parseArticle(fixture(), "different.mdx"), /slug/);
  assert.throws(
    () =>
      parseArticle(
        fixture().replace("publishedAt: null", 'publishedAt: "2026-02-30"'),
        "fixture.mdx",
      ),
    /publishedAt/,
  );
  assert.throws(
    () =>
      parseArticle(
        fixture().replace('status: "draft"', 'status: "published"'),
        "fixture.mdx",
      ),
    /公開日と承認済み本文/,
  );
  assert.throws(
    () =>
      parseArticle(
        fixture().replace("featured: false", "featured: yes"),
        "fixture.mdx",
      ),
    /featured/,
  );
  assert.throws(
    () =>
      parseArticle(
        fixture().replace(
          'coverImage: "/media/planning.webp"',
          'coverImage: "/media/../secret"',
        ),
        "fixture.mdx",
      ),
    /coverImage/,
  );
});
test("公開記事のみを日付順で並べ、下書きを除外する", () => {
  const draft = parseArticle(fixture(), "fixture.mdx");
  const published = {
    ...draft,
    status: "published" as const,
    publishedAt: "2026-10-01",
    body: "確認用本文",
  };
  const newer = { ...published, slug: "newer", publishedAt: "2026-10-02" };
  assert.deepEqual(
    visibleArticles([draft, published, newer]).map((item) => item.slug),
    ["newer", "fixture"],
  );
});

import { extractToc, headingId } from "../src/lib/journalToc";
import { previewCards } from "../src/content/journalCards";
test("目次はH2・H3だけを順番に抽出し、コードブロック内の見出しを無視する", () => {
  const body = [
    "## はじめに",
    "### 小見出し **強調**",
    "```",
    "## コード内",
    "```",
    "#### 四段階は対象外",
    "## [リンク付き](/features) 見出し",
  ].join("\n");
  assert.deepEqual(
    extractToc(body).map((item) => [item.level, item.text]),
    [
      [2, "はじめに"],
      [3, "小見出し 強調"],
      [2, "リンク付き 見出し"],
    ],
  );
  assert.equal(headingId("引用・補足 注意"), "引用補足-注意");
});

test("第2記事は公開済みで、カードと同じ単一の画像・注釈2件・本文内CTAを持つ", async () => {
  const article = (await getArticles()).find(
    (item) => item.slug === "english-learning-in-ai-era",
  );
  assert.ok(article);
  assert.equal(article.status, "published");
  assert.equal(article.category, "perspectives");
  assert.ok(article.imageAlt && article.seoTitle && article.publishedAt);
  assert.equal(article.body.match(/<Ref n="/g)?.length, 2);
  assert.equal(article.body.match(/<Reference /g)?.length, 2);
  assert.ok(article.body.includes("<Cta "));
  const card = previewCards.find((item) => item.id === article.slug);
  assert.ok(card, "記事に対応するカードがある");
  assert.equal(card.category, article.category);
  assert.equal(card.image, article.coverImage);
});
test("公開記事とカードのslugは重複せず、画像も重複しない", async () => {
  const published = visibleArticles(await getArticles());
  assert.equal(new Set(published.map((a) => a.slug)).size, published.length);
  assert.equal(
    new Set(published.map((a) => a.coverImage)).size,
    published.length,
  );
  assert.equal(new Set(previewCards.map((c) => c.id)).size, previewCards.length);
});
