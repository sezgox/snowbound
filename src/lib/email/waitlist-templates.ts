import { getMessages, type Locale } from "../../i18n";

/** Path under site root; served as absolute URL via `PUBLIC_SITE_URL` in `/api/waitlist`. */
export const WAITLIST_EMAIL_LOGO_PATH = "/images/figma/nav-logo.png";

export function escapeHtml(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

export function brandHeaderHtml(logoUrl: string | undefined): string {
	if (logoUrl?.trim()) {
		const src = escapeHtml(logoUrl.trim());
		return `<p style="margin:0 0 12px;"><img src="${src}" alt="Snowbound" width="168" height="auto" style="display:block;margin:0 auto;max-width:168px;height:auto;border:0;outline:none;" /></p>`;
	}
	return `<p style="margin:0;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#b8d4e8;">Snowbound</p>`;
}

function renderShell(
	lang: Locale,
	heading: string,
	body: string,
	footer: string,
	brandHeader: string,
): string {
	return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#e8f4f8;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#e8f4f8;padding:24px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:520px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(17,45,87,0.12);border:1px solid #77abbd;">
          <tr>
            <td style="background:linear-gradient(135deg,#112d57 0%,#0285e4 100%);padding:28px 24px;text-align:center;">
              ${brandHeader}
              <h1 style="margin:8px 0 0;font-size:22px;font-weight:normal;color:#ffffff;">${heading}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 24px;color:#112d57;font-size:16px;line-height:1.6;">
              ${body}
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 24px;font-size:12px;color:#5c5c5c;text-align:center;line-height:1.5;">
              ${footer}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function renderInternalWaitlistHtml(
	vars: { email: string; time: string; title: string; locale: Locale },
	options?: { logoUrl?: string },
): string {
	const copy = getMessages("en").email;
	const brandHeader = brandHeaderHtml(options?.logoUrl);
	const localeName = copy.localeNames[vars.locale];
	const body = `
<p style="margin:0 0 16px;">${copy.internal.intro}</p>
<table role="presentation" width="100%" cellpadding="12" cellspacing="0" style="background:#f4fafc;border-radius:12px;border:1px solid #c5dde8;">
  <tr>
    <td style="font-size:14px;color:#5c5c5c;width:108px;vertical-align:top;">${copy.internal.emailLabel}</td>
    <td style="font-size:16px;"><a href="mailto:${encodeURIComponent(vars.email)}" style="color:#0285e4;text-decoration:none;font-weight:600;">${escapeHtml(vars.email)}</a></td>
  </tr>
  <tr>
    <td style="font-size:14px;color:#5c5c5c;padding-top:10px;vertical-align:top;">${copy.internal.submittedLabel}</td>
    <td style="font-size:13px;padding-top:10px;font-family:ui-monospace,monospace;color:#112d57;">${escapeHtml(vars.time)}</td>
  </tr>
  <tr>
    <td style="font-size:14px;color:#5c5c5c;padding-top:10px;vertical-align:top;">${copy.internal.labelLabel}</td>
    <td style="font-size:14px;padding-top:10px;">${escapeHtml(vars.title)}</td>
  </tr>
  <tr>
    <td style="font-size:14px;color:#5c5c5c;padding-top:10px;vertical-align:top;">${copy.internal.localeLabel}</td>
    <td style="font-size:14px;padding-top:10px;">${escapeHtml(localeName)}</td>
  </tr>
</table>`;

	return renderShell(
		"en",
		copy.internal.heading,
		body,
		copy.internal.footer,
		brandHeader,
	);
}

export function renderUserWaitlistHtml(
	locale: Locale,
	vars: { email: string; time: string },
	options?: { logoUrl?: string },
): string {
	const copy = getMessages(locale).email;
	const brandHeader = brandHeaderHtml(options?.logoUrl);
	const body = `
<p style="margin:0 0 16px;">${copy.user.intro}</p>
<p style="margin:0 0 16px;">${copy.user.fileLabel} <strong style="color:#0285e4;">${escapeHtml(vars.email)}</strong></p>
<p style="margin:0 0 8px;color:#5c5c5c;font-size:15px;">${copy.user.note}</p>
<p style="margin:24px 0 0;font-size:14px;color:#112d57;">${copy.user.signature}</p>`;
	const footer = `${copy.user.footer}<br /><span style="font-family:ui-monospace,monospace;">${escapeHtml(vars.time)}</span>`;

	return renderShell(locale, copy.user.heading, body, footer, brandHeader);
}
