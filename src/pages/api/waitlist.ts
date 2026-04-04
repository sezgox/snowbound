import type { APIRoute } from "astro";

export const prerender = false;

function json(data: unknown, status = 200) {
	return new Response(JSON.stringify(data), {
		status,
		headers: { "Content-Type": "application/json" },
	});
}

function serverEnv(key: string): string | undefined {
	const v = process.env[key];
	if (v !== undefined && v !== "") return v;
	const meta = import.meta.env as Record<string, string | undefined>;
	return meta[key];
}

export const POST: APIRoute = async ({ request }) => {
	// Use process.env at runtime (Docker / preview). import.meta.env is baked at build time and is empty if .env was not in the image.
	const secret = serverEnv("WAITLIST_N8N_SECRET");
	const appendUrl = serverEnv("N8N_APPEND_WEBHOOK_URL");
	const statusUrl = serverEnv("N8N_EMAIL_STATUS_WEBHOOK_URL");

	if (!secret || !appendUrl || !statusUrl) {
		return json({ error: "Server misconfigured" }, 500);
	}

	let body: { step?: string; email?: string; emailSent?: string };
	try {
		body = await request.json();
	} catch {
		return json({ error: "Invalid JSON" }, 400);
	}

	const step = body.step === "emailStatus" ? "emailStatus" : "append";
	const email = String(body.email ?? "")
		.trim()
		.toLowerCase();

	if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return json({ error: "Invalid email" }, 400);
	}

	const targetUrl = step === "append" ? appendUrl : statusUrl;
	const payload =
		step === "append"
			? { email }
			: { email, emailSent: String(body.emailSent ?? "desconocido") };

	const res = await fetch(targetUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-Waitlist-Secret": secret,
		},
		body: JSON.stringify(payload),
	});

	if (!res.ok) {
		const text = await res.text();
		return json(
			{ error: "Upstream error", detail: text.slice(0, 300) },
			502,
		);
	}

	return json({ ok: true });
};
