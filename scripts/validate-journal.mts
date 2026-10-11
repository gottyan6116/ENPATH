import { access } from "node:fs/promises";
import path from "node:path";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import { getArticles, getPreviewBody } from "../src/lib/journal";
async function validate() {
  const articles = await getArticles();
  const seen = new Set<string>();
  for (const article of articles) {
    if (seen.has(article.slug))
      throw new Error(`JOURNAL: slug重複: ${article.slug}`);
    seen.add(article.slug);
    await access(path.join(process.cwd(), "public", article.coverImage));
    if (article.body)
      try {
        await serialize(article.body, {
          blockJS: true,
          mdxOptions: { remarkPlugins: [remarkGfm] },
        });
      } catch (error) {
        throw new Error(
          `JOURNAL: ${article.slug}.mdx: 本文のMDX構文を確認してください。 ${error instanceof Error ? error.message : String(error)}`,
        );
      }
  }
  await serialize(await getPreviewBody(), {
    blockJS: true,
    mdxOptions: { remarkPlugins: [remarkGfm] },
  });
  console.log(
    `JOURNAL: ${articles.length}本検証済み（公開${articles.filter((a) => a.status === "published").length}本）`,
  );
}
validate().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
