import { test, expect } from "@playwright/test";
test.setTimeout(90000);
test("公開側のカテゴリ選択を既存dataLayerへ1回送信する", async ({ page }) => {
  await page.goto("/journal");
  await page
    .getByRole("navigation", { name: "記事カテゴリ" })
    .getByRole("link", { name: "英語学習のヒント" })
    .click();
  await expect(page).toHaveURL(/category=learning/);
  const events = await page.evaluate(() =>
    (window.dataLayer ?? []).filter(
      (item) => item.event === "journal_category_select",
    ),
  );
  expect(events).toHaveLength(1);
  expect(events[0]).toMatchObject({
    slug: "journal",
    category: "learning",
    title: "英語学習のヒント",
  });
});
test("公開一覧に下書きを表示せず、直リンクでも閲覧できない", async ({
  page,
}) => {
  await page.goto("/journal");
  await expect(
    page.getByRole("heading", { name: /英語と、\s*学びの話。/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "読みものは、ただいま準備しています。" }),
  ).toBeVisible();
  await expect(page.getByText("下書き・企画案", { exact: true })).toHaveCount(
    0,
  );
  const response = await page.goto("/journal/english-in-the-ai-era");
  expect(response?.status()).toBe(404);
});
test("プレビューのカテゴリ・詳細・戻る操作とnoindex", async ({ page }) => {
  await page.goto("/journal?preview=1");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
  await expect(
    page.getByRole("heading", {
      name: "AIが翻訳してくれる時代に、英語を学ぶ意味はあるのか？",
    }),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "記事カテゴリ" })
    .getByRole("link", { name: "ENPATHの想い" })
    .click();
  await expect(page).toHaveURL(/category=our-story/);
  await expect(
    page.getByRole("heading", { name: "なぜ、ENPATHを立ち上げたのか。" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /シャドーイング/ }),
  ).toHaveCount(0);
  await page
    .getByRole("link", { name: /なぜ、ENPATHを立ち上げたのか/ })
    .click();
  await expect(page).toHaveURL(/journal\/why-enpath\?preview=1/, {
    timeout: 30000,
  });
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "なぜ、ENPATHを立ち上げたのか。",
  );
  await expect(page.getByRole("table")).toBeVisible();
  expect(
    await page.evaluate(() =>
      (window.dataLayer ?? []).filter(
        (item) =>
          typeof item.event === "string" && item.event.startsWith("journal_"),
      ),
    ),
  ).toHaveLength(0);
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(
    0,
  );
  await page.getByRole("link", { name: "← JOURNAL一覧へ" }).click();
  await expect(page).toHaveURL(/journal\?preview=1$/);
});
test("指定した4画面幅で一覧・本文・メニューに横はみ出しがない", async ({
  page,
}) => {
  for (const width of [1440, 768, 390, 375]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of [
      "/journal?preview=1",
      "/journal/english-in-the-ai-era?preview=1",
    ]) {
      await page.goto(route);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
    }
    if (width <= 960) {
      await page.getByRole("button", { name: "メニューを開く" }).click();
      await expect(
        page
          .getByRole("navigation", { name: "モバイルナビゲーション" })
          .getByRole("link", { name: "ENPATH JOURNAL" }),
      ).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(
        page.getByRole("button", { name: "メニューを開く" }),
      ).toBeFocused();
    }
  }
});
