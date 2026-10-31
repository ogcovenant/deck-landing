import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";

const base = process.env.BASE_URL || "http://localhost:3000";
const out = ".impeccable/review";
await mkdir(out, { recursive: true });
let browser;
try {
  browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROME_PATH
      ? { executablePath: process.env.CHROME_PATH }
      : {}),
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const response = await page.goto(base, { waitUntil: "networkidle" });
  assert.equal(response.status(), 200);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() =>
    [...document.images].every((image) => image.complete && image.naturalWidth),
  );
  assert.equal(await page.locator("h1").count(), 1);

  // Capture the unmodified initial state at all requested device classes.
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(() => window.scrollTo(0, 0));
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      `Horizontal overflow at ${width}px`,
    );
    const name =
      width === 1440
        ? "desktop"
        : width === 390
          ? "mobile"
          : `viewport-${width}`;
    await page.screenshot({ path: `${out}/${name}.png`, fullPage: true });
    if (width === 1440) await page.screenshot({ path: `${out}/hero.png` });
  }

  const menu = page.locator(".menu-trigger");
  await menu.click();
  assert.equal(await menu.getAttribute("aria-expanded"), "true");
  await page.keyboard.press("Escape");
  assert.equal(await menu.getAttribute("aria-expanded"), "false");
  assert(await menu.evaluate((node) => document.activeElement === node));
  await menu.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Business", exact: true })
    .click();
  assert.equal(await menu.getAttribute("aria-expanded"), "false");

  await page.setViewportSize({ width: 1440, height: 1000 });
  const app = page.getByRole("group", {
    name: "Interactive Deck mobile app preview",
    exact: true,
  });
  await app.getByRole("button", { name: "Personal", exact: true }).click();
  await app.getByRole("button", { name: "USD", exact: true }).click();
  assert.match(await app.textContent(), /\$420\.00/);
  await app.getByRole("button", { name: "Details", exact: true }).click();
  assert.match(await app.getByRole("region", { name: "Card details", exact: true }).textContent(), /6208/);
  await app.getByRole("button", { name: "Close app panel" }).click();
  assert(await app.getByRole("button", { name: "Details", exact: true }).evaluate(node => document.activeElement === node), "App sheet restores focus to its trigger");
  await app.getByRole("button", { name: "Freeze personal card" }).click();
  assert.equal(await app.getByRole("button", { name: "Unfreeze personal card" }).getAttribute("aria-pressed"), "true");
  await app.getByRole("button", { name: "NGN", exact: true }).click();
  assert.equal(await app.getByRole("button", { name: "Freeze personal card" }).getAttribute("aria-pressed"), "false");
  await app.getByRole("button", { name: "USD", exact: true }).click();
  assert.equal(await app.getByRole("button", { name: "Unfreeze personal card" }).getAttribute("aria-pressed"), "true");
  await app.getByRole("button", { name: "Unfreeze personal card" }).click();
  await app.getByRole("button", { name: "Activity", exact: true }).click();
  assert.equal(await app.locator(".app-transaction").count(), 3);
  await app.getByRole("button", { name: "Cards", exact: true }).click();
  await app.getByRole("button", { name: "Settings", exact: true }).click();
  assert.match(await app.getByRole("region", { name: "App settings", exact: true }).textContent(), /Separate ownership/);
  await page.keyboard.press("Escape");
  assert.equal(await app.locator(".app-sheet").count(), 0);
  assert(await app.getByRole("button", { name: "Settings", exact: true }).evaluate(node => document.activeElement === node), "Escape restores app navigation focus");
  await app.getByRole("button", { name: "Work", exact: true }).click();
  assert.match(await app.textContent(), /Managed by your organization/);
  assert.match(await app.textContent(), /Business expenses/);
  assert(await app.getByRole("button", { name: "Work card status is managed by your organization" }).isDisabled());

  const business = page.getByRole("group", {
    name: "Interactive business card management preview",
  });
  await business.getByRole("button", { name: "Frozen", exact: true }).click();
  assert.equal(await business.locator("tbody tr").count(), 1);
  await business
    .getByRole("button", { name: "All cards", exact: true })
    .click();
  const search = business.getByRole("searchbox", { name: "Search team cards" });
  await search.fill("Ada");
  assert.equal(await business.locator("tbody tr").count(), 1);
  await search.fill("unmatched person");
  assert.match(await business.locator(".empty-table").textContent(), /No cards match/);
  await search.fill("");
  await business.getByRole("button", { name: "View Ada Okafor's card" }).click();
  assert.match(await business.getByRole("complementary", { name: "Selected team card" }).textContent(), /Design card/);
  const workspaceNav = business.getByRole("navigation", { name: "Business preview navigation" });
  await workspaceNav.getByRole("button", { name: "Activity", exact: true }).click();
  assert.equal(await business.locator(".console-activity > div").count(), 3);
  await workspaceNav.getByRole("button", { name: "Team", exact: true }).click();
  assert.equal(await business.locator(".console-team > div").count(), 3);
  await business.getByRole("button", { name: "View card", exact: true }).first().click();
  await business
    .getByRole("button", { name: "Manage Tomi Adeyemi's card" })
    .click();
  const management = business.getByRole("dialog", {
    name: "Manage Tomi Adeyemi's card",
  });
  assert(
    await management.evaluate((node) => node.contains(document.activeElement)),
    "Focus enters the dialog",
  );
  await management
    .getByRole("button", { name: "Freeze card", exact: true })
    .click();
  assert.match(await management.textContent(), /Frozen/);
  await management
    .getByRole("button", { name: "Unfreeze card", exact: true })
    .click();
  await management
    .getByRole("button", { name: "Terminate card", exact: true })
    .click();
  assert.match(await management.textContent(), /Terminated/);
  await management
    .getByRole("button", { name: "Reset card", exact: true })
    .click();
  await management
    .getByRole("button", { name: "Close card management" })
    .click();
  assert(
    await business
      .getByRole("button", { name: "Manage Tomi Adeyemi's card" })
      .evaluate((node) => document.activeElement === node),
    "Focus returns to the initiating card",
  );

  const controls = page.locator(".controls-section");
  await controls
    .getByRole("button", { name: "Freeze card", exact: true })
    .click();
  assert.match(
    await controls.locator(".freeze-panel").textContent(),
    /A moment on hold/,
  );
  await controls
    .getByRole("button", { name: "Unfreeze card", exact: true })
    .click();
  await controls.getByRole("button", { name: "Limits", exact: true }).click();
  const slider = controls.getByRole("slider", {
    name: "Monthly spending limit",
  });
  await slider.focus();
  await slider.press("Home");
  for (let step = 0; step < 6; step++) await slider.press("ArrowRight");
  await controls
    .getByRole("button", { name: "Save limit", exact: true })
    .click();
  assert(
    await controls
      .getByRole("button", { name: "Limit saved" })
      .isDisabled(),
  );
  await controls.getByRole("button", { name: "Activity", exact: true }).click();
  assert.equal(await controls.locator(".activity-item").count(), 3);

  await page
    .getByRole("tab", { name: "For your business", exact: true })
    .click();
  assert.equal(await page.getByRole("tabpanel").locator(".step").count(), 4);
  await page.keyboard.press("Home");
  assert.equal(await page.getByRole("tabpanel").locator(".step").count(), 3);
  await page
    .getByText("Can I have both personal and business cards?", { exact: true })
    .click();
  assert((await page.locator("details[open]").count()) >= 1);

  // A real unconfigured backend must never imply successful signup.
  await page.getByLabel("Your email address").fill("preview@example.com");
  await page.getByLabel("Business cards", { exact: true }).check();
  await page.locator(".waitlist-submit").click();
  await page.waitForFunction(() =>
    document
      .querySelector(".form-feedback")
      ?.textContent?.includes("hasn’t been saved"),
  );
  assert.match(
    await page.locator(".form-feedback").textContent(),
    /hasn’t been saved/,
  );
  assert.equal(
    await page.locator(".waitlist-submit").textContent(),
    "Get early access",
  );

  // Controlled UI fixtures exercise feedback without pretending to register data.
  await page.route("**/api/waitlist", (route) =>
    route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({ accepted: true }),
    }),
  );
  await page.locator(".waitlist-submit").click();
  await page.getByRole("button", { name: "You’re on the list" }).waitFor();
  assert(
    await page.getByRole("button", { name: "You’re on the list" }).isDisabled(),
  );
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    const compactNav = business.getByRole("group", { name: "Workspace view" });
    await compactNav.getByRole("button", { name: "Activity", exact: true }).click();
    assert.equal(await business.locator(".console-activity > div").count(), 3);
    await compactNav.getByRole("button", { name: "Team", exact: true }).click();
    await business.getByRole("button", { name: "View card", exact: true }).first().click();
    await business.getByRole("dialog", { name: "Manage Tomi Adeyemi's card" }).waitFor();
    await page.keyboard.press("Escape");
    assert(await business.getByRole("button", { name: "All cards", exact: true }).evaluate(node => document.activeElement === node), "Removed team trigger restores focus to card filters");
    const cardholder = business.getByRole("button", { name: "View Ada Okafor's card" });
    await cardholder.click();
    await business.getByRole("dialog", { name: "Manage Ada Okafor's card" }).waitFor();
    await page.keyboard.press("Escape");
    assert(await cardholder.evaluate(node => document.activeElement === node), "Compact row selection opens a dialog and restores focus");
    const hit = await business.getByRole("button", { name: "Manage Ada Okafor's card" }).boundingBox();
    assert(hit.width >= 32 && hit.height >= 36, `Compact card target is too small at ${width}px`);
    assert(await business.locator(".dashboard-table-wrap").evaluate(node => node.scrollWidth <= node.clientWidth), `Table overflow at ${width}px`);
  }
  assert.deepEqual(errors, []);
  await writeFile(
    `${out}/browser-results.json`,
    JSON.stringify(
      {
        passed: true,
        base,
        widths: [1440, 1024, 768, 390, 320],
        runtimeErrors: errors,
      },
      null,
      2,
    ),
  );
  console.log(
    "Browser interaction, keyboard, form and responsive checks passed. Inspect screenshots for visual quality.",
  );
} catch (error) {
  console.error("Browser verification did not pass:", error.message);
  process.exitCode = 1;
} finally {
  await browser?.close();
}
