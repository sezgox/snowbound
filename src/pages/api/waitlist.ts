import type { APIRoute } from "astro";
import { Resend } from "resend";
import { getMessages, isLocale, type Locale } from "../../i18n";
import {
	WAITLIST_EMAIL_LOGO_PATH,
	renderInternalWaitlistHtml,
	renderUserWaitlistHtml,
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

type ResendSendError = { message?: string; name?: string } | null;

function resendErrorMessage(
	internal: ResendSendError,
	user: ResendSendError,
	locale: Locale,
): string {
	const parts = [internal?.message, user?.message].filter(
		(m): m is string => typeof m === "string" && m.length > 0,
	);
	const unique = [...new Set(parts)];
	return unique.join(" - ") || getMessages(locale).waitlist.api.failedToSend;
}

export const POST: APIRoute = async ({ request }) => {
	let body: { email?: unknown; title?: unknown; time?: unknown; locale?: unknown };
	try {
		body = await request.json();
	} catch {
		logWaitlist("request rejected: invalid JSON body");
		return new Response(
			JSON.stringify({ ok: false, error: getMessages("en").waitlist.api.invalidJson }),
			{
				status: 400,
				headers: { "Content-Type": "application/json" },
			},
		);
	}

	const localeCandidate = typeof body.locale === "string" ? body.locale : "";
	const locale: Locale = isLocale(localeCandidate) ? localeCandidate : "en";
	const waitlistCopy = getMessages(locale).waitlist;
	const emailCopy = getMessages(locale).email;
	const emailRaw = typeof body.email === "string" ? body.email.trim() : "";
	const title =
		typeof body.title === "string" && body.title.trim()
			? body.title.trim()
			: waitlistCopy.newsletterLabel;
	const time =
		typeof body.time === "string" && body.time.trim()
			? body.time.trim()
			: new Date().toISOString();

	if (!emailRaw || !EMAIL_RE.test(emailRaw)) {
		logWaitlist("request rejected: invalid or empty email", {
			emailProvided: Boolean(emailRaw),
			locale,
		});
		return new Response(
			JSON.stringify({ ok: false, error: waitlistCopy.api.invalidEmail }),
			{
				status: 400,
				headers: { "Content-Type": "application/json" },
			},
		);
	}

	logWaitlist("POST received", {
		subscriberEmail: emailRaw,
		title,
		time,
		locale,
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
			JSON.stringify({ ok: false, error: waitlistCopy.api.notConfigured }),
			{ status: 503, headers: { "Content-Type": "application/json" } },
		);
	}

	logWaitlist("sending via Resend", {
		from,
		notifyTo,
		replyTo: replyTo ?? "(none)",
		locale,
	});

	const resend = new Resend(apiKey);
	const siteBase =
		typeof import.meta.env.PUBLIC_SITE_URL === "string"
			? import.meta.env.PUBLIC_SITE_URL.trim().replace(/\/$/, "")
			: "";
	const logoUrl = siteBase ? `${siteBase}${WAITLIST_EMAIL_LOGO_PATH}` : undefined;
	const htmlInternal = renderInternalWaitlistHtml(
		{ email: emailRaw, time, title, locale },
		{ logoUrl },
	);
	const htmlUser = renderUserWaitlistHtml(locale, { email: emailRaw, time }, { logoUrl });
	const shared = replyTo ? { replyTo } : {};

	try {
		const [internalResult, userResult] = await Promise.all([
			resend.emails.send({
				from,
				to: notifyTo,
				subject: getMessages("en").email.internal.subject,
				html: htmlInternal,
				...shared,
			}),
			resend.emails.send({
				from,
				to: emailRaw,
				subject: emailCopy.user.subject,
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
			const message = resendErrorMessage(internalErr, userErr, locale);
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
			locale,
		});
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		logWaitlist("exception while sending", { error: msg, locale });
		console.error("[waitlist]", err);
		const payload: Record<string, unknown> = {
			ok: false,
			error: import.meta.env.DEV ? msg : waitlistCopy.api.failedToSend,
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
