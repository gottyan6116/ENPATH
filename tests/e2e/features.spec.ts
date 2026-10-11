import { test, expect } from "@playwright/test";

const routes = [
  "/features",
  "/textbooks",
  "/features/steps",
  "/features/learning-plan",
  "/features/support",
  "/features/counseling",
];

test("feature navigation supports hover, keyboard and page transitions", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Desktop disclosure");
  await page.goto("/");
  const toggle = page.locator(".feature-toggle");
  const dropdown = page.locator("#feature-menu");
  await toggle.hover();
  await expect(dropdown).toBeVisible();
  await dropdown.getByRole("link").nth(4).hover();
  await expect(dropdown).toBeVisible();
  await page.locator(".brand").hover();
  await expect(dropdown).toBeHidden();
  await toggle.focus();
  await toggle.press("ArrowDown");
  await expect(dropdown.getByRole("link").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(dropdown).toBeHidden();
  await toggle.press("Enter");
  await dropdown.getByRole("link").nth(2).click();
  await expect(page).toHaveURL(/\/features\/steps$/);
  await expect(dropdown).toBeHidden();
  await expect(page.locator("h1")).toContainText("使える");
});

test("mobile feature submenu navigates and closes", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Mobile disclosure");
  await page.goto("/");
  await page.getByRole("button", { name: "メニューを開く" }).click();
  await page.locator(".mobile-feature-toggle").click();
  await expect(page.locator("#mobile-features a")).toHaveCount(6);
  await page.locator("#mobile-features a").nth(3).click();
  await expect(page).toHaveURL(/\/features\/learning-plan$/);
  await expect(page.locator("#mobile-menu")).toBeHidden();
  await page.getByRole("button", { name: "メニューを開く" }).click();
  await page
    .locator("#mobile-menu")
    .getByRole("link", { name: "コーチ", exact: true })
    .click();
  await expect(page).toHaveURL(/\/#coach$/);
  await expect(page.locator("#coach")).toBeInViewport();
});

for (const route of routes) {
  test(`${route} loads with related pages, booking and no horizontal overflow`, async ({
    page,
  }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main h1")).toHaveCount(1);
    const related = page.locator("main .feature-explorer-links a");
    await expect(related).toHaveCount(2);
    for (const link of await related.all()) {
      expect(routes).toContain(await link.getAttribute("href"));
    }
    const booking = page
      .locator("main")
      .getByRole("link", { name: "無料カウンセリングを予約する", exact: true });
    await expect(booking).toHaveCount(1);
    const href = await booking.getAttribute("href");
    expect(href).toMatch(/^(https:\/\/|\/#consultation$)/);
    if (href?.startsWith("https:"))
      await expect(booking).toHaveAttribute("target", "_blank");
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
    ).toBe(true);
    await related.first().click();
    await expect(page).not.toHaveURL(new RegExp(`${route}$`));
  });
}
