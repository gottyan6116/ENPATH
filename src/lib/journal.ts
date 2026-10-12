import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import { journalCategories, type JournalCategory } from "../content/journal";

export type JournalArticle = {
  title: string;
  description: string;
  slug: string;
  category: JournalCategory;
  publishedAt: string | null;
  updatedAt: string | null;
  author: string | null;
  coverImage: string;
  /** Alt text of the eye-catch image. Required for published articles. */
  imageAlt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  featured: boolean;
  status: "draft" | "published";
  body: string;
};
export type JournalQuery = Record<string, string | string[] | undefined>;
const directory = path.join(process.cwd(), "src/content/journal");

export function parseArticle(source: string, filename: string): JournalArticle {
  const fail = (message: string): never => {
    throw new Error(`JOURNAL: ${filename}: ${message}`);
  };
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(source);
  if (!frontmatter) return fail("冒頭にYAML frontmatterが必要です。");
  let data: Record<string, unknown>;
  try {
    data = parseYaml(frontmatter[1]);
  } catch {
    return fail("frontmatterの書式を確認してください。");
  }
  if (!data || typeof data !== "object" || Array.isArray(data))
    return fail("frontmatterには項目名と値が必要です。");
  const body = source.slice(frontmatter[0].length).trim();
  // `date` and `image` are accepted as aliases of `publishedAt` and `coverImage`.
  const aliases: Record<string, string> = { publishedAt: "date", coverImage: "image" };
  const raw = (key: string) => data[key] ?? data[aliases[key] ?? ""];
  const string = (key: string) => {
    const value = raw(key);
    if (typeof value !== "string" || !value.trim())
      return fail(`${key}は空でない文字列が必要です。`);
    return value.trim();
  };
  const optionalText = (key: string) => {
    const value = data[key];
    if (value == null || value === "") return null;
    if (typeof value !== "string" || !value.trim())
      return fail(`${key}は文字列、またはnullにしてください。`);
    return value.trim();
  };
  const date = (key: string) => {
    const value = raw(key);
    if (value == null || value === "") return null;
    if (
      typeof value !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
      Number.isNaN(Date.parse(value)) ||
      new Date(value).toISOString().slice(0, 10) !== value
    )
      return fail(`${key}は引用符付きYYYY-MM-DD、またはnullにしてください。`);
    return value;
  };
  const slug = string("slug");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || filename !== `${slug}.mdx`)
    return fail(
      "slugとファイル名を一致させてください（半角英小文字・数字・ハイフン）。",
    );
  if (!journalCategories.some((category) => category.id === data.category))
    return fail("categoryが未定義です。");
  if (data.status !== "draft" && data.status !== "published")
    return fail("statusはdraftまたはpublishedです。");
  if (typeof data.featured !== "boolean")
    return fail("featuredはtrueまたはfalseです。");
  if (
    data.author != null &&
    (typeof data.author !== "string" || !data.author.trim())
  )
    return fail("authorは正式な名前またはnullです。");
  const coverImage = string("coverImage");
  if (
    !/^\/(?:media|images)\/[a-zA-Z0-9/_.-]+$/.test(coverImage) ||
    coverImage.includes("..")
  )
    return fail("coverImageはpublic内の/media/または/images/のパスです。");
  const publishedAt = date("publishedAt");
  const updatedAt = date("updatedAt");
  const imageAlt = optionalText("imageAlt");
  const seoTitle = optionalText("seoTitle");
  const seoDescription = optionalText("seoDescription");
  if (data.status === "published" && (!publishedAt || !body))
    return fail("公開記事には公開日と承認済み本文が必要です。");
  if (data.status === "published" && !imageAlt)
    return fail("公開記事にはアイキャッチ画像の説明（imageAlt）が必要です。");
  if (updatedAt && (!publishedAt || updatedAt < publishedAt))
    return fail("更新日は公開日以降にしてください。");
  return {
    title: string("title"),
    description: string("description"),
    slug,
    category: data.category as JournalCategory,
    publishedAt,
    updatedAt,
    author: typeof data.author === "string" ? data.author.trim() : null,
    coverImage,
    imageAlt,
    seoTitle,
    seoDescription,
    featured: data.featured,
    status: data.status,
    body,
  };
}

export function isJournalPreview(
  query: JournalQuery,
  environment = process.env.NODE_ENV,
): boolean {
  return environment === "development" && query.preview === "1";
}
export function visibleArticles(articles: JournalArticle[], preview = false) {
  return articles
    .filter((article) => preview || article.status === "published")
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}
export async function getArticles() {
  const names = (await readdir(directory)).filter(
    (name) => name.endsWith(".mdx") && !name.startsWith("_"),
  );
  return Promise.all(
    names
      .sort()
      .map(async (name) =>
        parseArticle(await readFile(path.join(directory, name), "utf8"), name),
      ),
  );
}
export async function getVisibleArticles(preview = false) {
  return visibleArticles(await getArticles(), preview);
}
export async function getPreviewBody() {
  return readFile(path.join(directory, "_preview.mdx"), "utf8");
}
export function articleHref(slug: string, preview = false) {
  return `/journal/${slug}${preview ? "?preview=1" : ""}`;
}
