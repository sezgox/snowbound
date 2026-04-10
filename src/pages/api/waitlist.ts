import type { APIRoute } from "astro";
import { Resend } from "resend";
import {
	WAITLIST_EMAIL_LOGO_PATH,
	WAITLIST_INTERNAL_HTML,
	WAITLIST_USER_HTML,
	renderWaitlistHtml,
} from "../../lib/email/waitlist-templates";

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function logWaitlist(
	message: string,
	details?: Record<string, unknown>,
): void {
	if (details) {
		console.log("[waitlist]", message, details);
	} else {
		console.log("[waitlist]", message);
	}
}

/** Resend SDK error shape from `emails.send` */
type ResendSendError = { message?: string; name?: string } | null;

function resendErrorMessage(
	internal: ResendSendError,
	user: ResendSendError,
): string {
	const parts = [internal?.message, user?.message].filter(
		(m): m is string => typeof m === "string" && m.length > 0,
	);
	const unique = [...new Set(parts)];
	return unique.join(" · ") || "Failed to send email";
}

export const POST: APIRoute = async ({ request }) => {
	let body: { email?: unknown; title?: unknown; time?: unknown };
	try {
		body = await request.json();
	} catch {
		logWaitlist("request rejected: invalid JSON body");
		return new Response(JSON.stringify({ ok: false, error: "Invalid JSON" }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}

	const emailRaw = typeof body.email === "string" ? body.email.trim() : "";
	const title =
		typeof body.title === "string" && body.title.trim()
			? body.title.trim()
			: "Snowbound newsletter";
	const time =
		typeof body.time === "string" && body.time.trim()
			? body.time.trim()
			: new Date().toISOString();

	if (!emailRaw || !EMAIL_RE.test(emailRaw)) {
		logWaitlist("request rejected: invalid or empty email", {
			emailProvided: Boolean(emailRaw),
		});
		return new Response(JSON.stringify({ ok: false, error: "Invalid email" }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}

	logWaitlist("POST received", {
		subscriberEmail: emailRaw,
		title,
		time,
	});

	const apiKey = import.meta.env.RESEND_API_KEY;
	const from = import.meta.env.RESEND_FROM;
	const notifyTo = import.meta.env.RESEND_NOTIFY_TO;
	const replyToRaw = import.meta.env.RESEND_REPLY_TO;
	const replyTo =
		typeof replyToRaw === "string" && replyToRaw.trim() ? replyToRaw.trim() : undefined;

	if (!apiKey || !from || !notifyTo) {
		logWaitlist("email service not configured (missing env)", {
			hasResendApiKey: Boolean(apiKey),
			hasResendFrom: Boolean(from),
			hasResendNotifyTo: Boolean(notifyTo),
		});
		return new Response(
			JSON.stringify({ ok: false, error: "Email service not configured" }),
			{ status: 503, headers: { "Content-Type": "application/json" } },
		);
	}

	logWaitlist("sending via Resend", {
		from,
		notifyTo,
		replyTo: replyTo ?? "(none)",
	});

	const resend = new Resend(apiKey);
	const vars = { email: emailRaw, time, title };
	const siteBase =
		typeof import.meta.env.PUBLIC_SITE_URL === "string"
			? import.meta.env.PUBLIC_SITE_URL.trim().replace(/\/$/, "")
			: "";
	const logoUrl = siteBase ? `${siteBase}${WAITLIST_EMAIL_LOGO_PATH}` : undefined;
	const htmlInternal = renderWaitlistHtml(WAITLIST_INTERNAL_HTML, vars, { logoUrl });
	const htmlUser = renderWaitlistHtml(WAITLIST_USER_HTML, vars, { logoUrl });

	const shared = replyTo ? { replyTo } : {};

	try {
		const [internalResult, userResult] = await Promise.all([
			resend.emails.send({
				from,
				to: notifyTo,
				subject: "New waitlist signup",
				html: htmlInternal,
				...shared,
			}),
			resend.emails.send({
				from,
				to: emailRaw,
				subject: "You're on the list",
				html: htmlUser,
				...shared,
			}),
		]);

		if (internalResult.error || userResult.error) {
			const internalErr = internalResult.error ?? null;
			const userErr = userResult.error ?? null;
			logWaitlist("Resend returned errors", {
				internal: internalErr,
				user: userErr,
			});
			const message = resendErrorMessage(internalErr, userErr);
			const payload: Record<string, unknown> = {
				ok: false,
				error: message,
			};
			if (import.meta.env.DEV) {
				payload.resend = { internal: internalErr, user: userErr };
			}
			return new Response(JSON.stringify(payload), {
				status: 500,
				headers: { "Content-Type": "application/json" },
			});
		}

		logWaitlist("done: both emails accepted by Resend", {
			internalEmailId: internalResult.data?.id ?? null,
			userEmailId: userResult.data?.id ?? null,
			subscriberEmail: emailRaw,
		});
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		logWaitlist("exception while sending", { error: msg });
		console.error("[waitlist]", err);
		const payload: Record<string, unknown> = {
			ok: false,
			error: import.meta.env.DEV ? msg : "Failed to send email",
		};
		if (import.meta.env.DEV) {
			payload.exception = msg;
		}
		return new Response(JSON.stringify(payload), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}

	return new Response(JSON.stringify({ ok: true }), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
};
