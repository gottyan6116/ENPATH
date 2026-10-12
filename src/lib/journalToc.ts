// Pure helpers (no node APIs) shared by the MDX renderer, the table of contents and the validator.
export type TocItem = { id: string; text: string; level: 2 | 3 };

/** Stable, URL-safe-enough id for a heading. Keeps Japanese characters. */
export function headingId(text: string): string {
  const id = text
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}_-]/gu, "");
  return id || "section";
}

/** Strip the inline markdown that can appear inside a heading line. */
function plain(text: string): string {
  return text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[`*_~]/g, "")
    .trim();
}

/** H2/H3 outline of an MDX body (fenced code blocks are skipped). */
export function extractToc(body: string): TocItem[] {
  const items: TocItem[] = [];
  let fence: string | null = null;
  for (const line of body.split(/\r?\n/)) {
    const marker = /^\s*(`{3,}|~{3,})/.exec(line)?.[1];
    if (marker) {
      if (!fence) fence = marker[0];
      else if (marker[0] === fence) fence = null;
      continue;
    }
    if (fence) continue;
    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;
    const text = plain(match[2]);
    if (text) items.push({ id: headingId(text), text, level: match[1].length as 2 | 3 });
  }
  return items;
}

/** Flatten React children into the text a reader sees. */
export function textOf(node: unknown): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (typeof node === "object" && "props" in node)
    return textOf((node as { props?: { children?: unknown } }).props?.children);
  return "";
}
