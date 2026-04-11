import { expect, test } from "@playwright/test";

test.describe("Landing page", () => {
	test("lore headline is full text and uses Figma typography scale", async ({
		page,
	}) => {
		await page.goto("/#lore");
		const heading = page.locator("#lore-heading");
		await expect(heading).toHaveText("AN ICED PARADISE AWAITS...");
		const fs = await heading.evaluate((el) => {
			const s = getComputedStyle(el);
			return { fontSize: s.fontSize, lineHeight: s.lineHeight, color: s.color };
		});
		expect(fs.fontSize).toBe("64px");
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
		await page.goto("/");
		await page.getByRole("button", { name: "JOIN THE WAITLIST" }).first().click();
		const dialog = page.getByRole("dialog", { name: "JOIN THE WAITLIST" });
		await dialog.getByPlaceholder("Email for updates").fill("snowbound.web@gmail.com");
		await dialog.getByRole("button", { name: "GET UPDATES" }).click();
		const status = dialog.locator("[data-waitlist-status]");
		await expect(status).not.toHaveClass(/hidden/, { timeout: 2_000 });
		await expect(status).toContainText("Thanks", { timeout: 25_000 });
	});

	test("features uses natural scroll without vertical snap forcing", async ({
		page,
	}) => {
		await page.goto("/");

		const metrics = await page.evaluate(() => {
			const features = document.getElementById("features");
			if (!(features instanceof HTMLElement)) {
				throw new Error("Missing #features section");
			}

			return {
				featuresTop: Math.round(features.getBoundingClientRect().top + window.scrollY),
				scrollSnapType: getComputedStyle(document.documentElement).scrollSnapType,
			};
		});

		expect(metrics.scrollSnapType).toBe("none");

		const nearFeaturesStart = Math.max(0, metrics.featuresTop - 30);
		await page.evaluate((targetY) => {
			document.documentElement.style.scrollBehavior = "auto";
			window.scrollTo(0, targetY);
		}, nearFeaturesStart);
		await page.waitForTimeout(450);

		const settledNearStart = await page.evaluate(() => Math.round(window.scrollY));
		expect(Math.abs(settledNearStart - nearFeaturesStart)).toBeLessThanOrEqual(8);

		const ctaButton = page.locator("#features").getByRole("button", {
			name: "JOIN THE WAITLIST",
		});
		await page.evaluate(() => {
			const features = document.getElementById("features");
			if (!(features instanceof HTMLElement)) return;

			document.documentElement.style.scrollBehavior = "auto";
			const rect = features.getBoundingClientRect();
			const start = rect.top + window.scrollY;
			const distance = Math.max(features.offsetHeight - window.innerHeight, 0);
			window.scrollTo(0, Math.round(start + distance * 0.98));
		});
		await page.waitForTimeout(200);
		await expect(ctaButton).toBeVisible();
	});
});
