import { test, expect } from "@playwright/test";

test("a goal switch updates the plan, schedule and milestones together", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "TOEIC®対策", exact: true }).click();
  const panel = page.getByRole("tabpanel");
  await expect(panel).toContainText("4か月後の受験");
  await expect(panel).toContainText("文法・弱点復習");
  await expect(panel).toContainText("領域別正答率");
  await page
    .getByRole("tab", { name: "TOEIC®対策", exact: true })
    .press("ArrowRight");
  await expect(panel).toContainText("6か月後");
  await expect(panel).toContainText("週3時間");
  await expect(panel).not.toContainText("4か月後の受験");
  await expect(panel).toContainText("学習計画サンプル");
});

test("booking CTA uses the configured provider or the preparation notice", async ({
  page,
}) => {
  await page.goto("/");
  const cta = page
    .locator(".hero-actions")
    .getByRole("link", { name: "無料カウンセリングを予約する" });
  const href = await cta.getAttribute("href");
  if (href?.startsWith("https://")) {
    await expect(cta).toHaveAttribute("target", "_blank");
    await expect(cta).toHaveAttribute("rel", "noopener noreferrer");
    await expect(page.locator(".feature-explorer-links a")).toHaveCount(6);
  } else {
    await cta.click();
    await expect(page).toHaveURL(/#consultation$/);
    await expect(page.getByRole("status")).toContainText("予約受付は準備中");
  }
  await expect(
    page.getByText("予約が完了しました", { exact: true }),
  ).toHaveCount(0);
});

test("chapter selection changes the description without offering nonexistent video", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "02 学習を設計する PLANNING" })
    .click();
  await expect(
    page.getByText("目標までの道筋を、一緒に。", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "動画を再生", exact: true }),
  ).toHaveCount(0);
});

test("FAQ exposes the answer and narrow layouts do not overflow", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .locator("summary")
    .filter({ hasText: "英語を直接教えてもらえるのですか？" })
    .click();
  await expect(page.locator("details[open]")).toContainText(
    "文法や会話を教えるレッスンとは役割が異なります",
  );
  const sizes = await page.evaluate(() => ({
    content: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth,
  }));
  expect(sizes.content).toBeLessThanOrEqual(sizes.viewport);
});

test("mobile navigation closes with Escape and restores its toggle", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Mobile disclosure only");
  await page.goto("/");
  await page.getByRole("button", { name: "メニューを開く" }).click();
  await expect(
    page.getByRole("navigation", { name: "モバイルナビゲーション" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "メニューを閉じる" }).press("Escape");
  await expect(
    page.getByRole("button", { name: "メニューを開く" }),
  ).toBeFocused();
  await expect(
    page.getByRole("navigation", { name: "モバイルナビゲーション" }),
  ).toBeHidden();
});

test("goal links open the matching sample rather than the default plan", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: "TOEIC®・資格対策 目標に向けて取り組みたい" })
    .click();
  await expect(
    page.getByRole("tab", { name: "TOEIC®対策", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("4か月後の受験");
});

test("scroll story draws a path, updates the step, and keeps manual selection usable", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Desktop sticky scroll story");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.waitForFunction(() =>
    document.querySelector(".hero-content > *")?.hasAttribute("style"),
  );
  const approach = page.locator("#approach");
  const target = await approach.evaluate(
    (el) =>
      window.scrollY +
      el.getBoundingClientRect().top +
      el.clientHeight -
      innerHeight -
      5,
  );
  await page.evaluate(
    (y) => window.scrollTo({ top: y, behavior: "instant" }),
    target,
  );
  await expect(approach.locator(".detail-number")).toHaveText("06");
  await expect(
    page.getByRole("navigation", { name: "ページの見どころ" }),
  ).toBeVisible();
  await approach.getByRole("button", { name: "01 目標設定" }).click();
  await expect(approach.locator(".detail-number")).toHaveText("01");
});

test("reduced motion leaves the complete path controls readable without sticky scrolling", async ({
  page,
}) => {
  await page.goto("/");
  const approach = page.locator("#approach");
  await approach.getByRole("button", { name: "06 計画改善" }).click();
  await expect(approach.locator(".detail-number")).toHaveText("06");
  await expect(approach.locator("h3")).toBeVisible();
  expect(
    await approach
      .locator(".container")
      .evaluate((el) => getComputedStyle(el).position),
  ).not.toBe("sticky");
});
