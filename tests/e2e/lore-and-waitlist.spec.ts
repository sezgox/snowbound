import { expect, test } from "@playwright/test";

test.describe("Landing page", () => {
	test("lore headline is full text and uses Figma typography scale", async ({
		page,
	}) => {
		await page.goto("/#lore");
		const heading = page.locator("#lore-heading");
		await expect(heading).toHaveText("AN ICED PARADISE AWAITS");
		const fs = await heading.evaluate((el) => {
			const s = getComputedStyle(el);
			return { fontSize: s.fontSize, lineHeight: s.lineHeight, color: s.color };
		});
		expect(fs.fontSize).toBe("40px");
		expect(fs.lineHeight).toBe("48px");
		expect(fs.color).toBe("rgb(17, 45, 87)");
	});

	test("hero waitlist submits via API and shows success", async ({
		page,
	}) => {
		await page.route("**/api/waitlist", async (route) => {
			await route.fulfill({
				status: 200,
				contentType: "application/json",
				body: JSON.stringify({ ok: true }),
			});
		});
		await page.goto("/#waitlist");
		const hero = page.getByRole("region", { name: "Hero" });
		await hero
			.getByPlaceholder("Email for updates")
			.fill("snowbound.web@gmail.com");
		await hero.getByRole("button", { name: "GET UPDATES" }).click();
		const status = hero.locator("[data-waitlist-status]");
		await expect(status).not.toHaveClass(/hidden/, { timeout: 2_000 });
		await expect(status).toContainText("Thanks", { timeout: 25_000 });
	});
});
