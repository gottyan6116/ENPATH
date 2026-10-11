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
test("企画6本はすべて下書きで、公開一覧に含まれない", async () => {
  const articles = await getArticles();
  assert.equal(articles.length, 6);
  assert.ok(
    articles.every(
      (article) =>
        article.status === "draft" &&
        article.publishedAt === null &&
        article.author === null &&
        !article.body,
    ),
  );
  assert.equal(visibleArticles(articles).length, 0);
  assert.equal(visibleArticles(articles, true).length, 6);
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
