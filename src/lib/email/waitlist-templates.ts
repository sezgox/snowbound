/** Path under site root; served as absolute URL via `PUBLIC_SITE_URL` in `/api/waitlist`. */
export const WAITLIST_EMAIL_LOGO_PATH = "/images/figma/nav-logo.png";

/** HTML email bodies for waitlist; placeholders {{brandHeader}}, {{email}}, {{time}}, {{title}} filled by `renderWaitlistHtml`. */
export const WAITLIST_INTERNAL_HTML = `<!DOCTYPE html>
<html lang="en">
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
              {{brandHeader}}
              <h1 style="margin:8px 0 0;font-size:22px;font-weight:normal;color:#ffffff;">New waitlist signup</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 24px;color:#112d57;font-size:16px;line-height:1.6;">
              <p style="margin:0 0 16px;">Someone requested updates with this address:</p>
              <table role="presentation" width="100%" cellpadding="12" cellspacing="0" style="background:#f4fafc;border-radius:12px;border:1px solid #c5dde8;">
                <tr>
                  <td style="font-size:14px;color:#5c5c5c;width:108px;vertical-align:top;">Email</td>
                  <td style="font-size:16px;"><a href="mailto:{{email}}" style="color:#0285e4;text-decoration:none;font-weight:600;">{{email}}</a></td>
                </tr>
                <tr>
                  <td style="font-size:14px;color:#5c5c5c;padding-top:10px;vertical-align:top;">Submitted</td>
                  <td style="font-size:13px;padding-top:10px;font-family:ui-monospace,monospace;color:#112d57;">{{time}}</td>
                </tr>
                <tr>
                  <td style="font-size:14px;color:#5c5c5c;padding-top:10px;vertical-align:top;">Label</td>
                  <td style="font-size:14px;padding-top:10px;">{{title}}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 24px;font-size:12px;color:#5c5c5c;text-align:center;line-height:1.5;">
              Sent from the Snowbound site waitlist form.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

export const WAITLIST_USER_HTML = `<!DOCTYPE html>
<html lang="en">
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
              {{brandHeader}}
              <h1 style="margin:8px 0 0;font-size:22px;font-weight:normal;color:#ffffff;">You're on the list</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 24px;color:#112d57;font-size:16px;line-height:1.65;">
              <p style="margin:0 0 16px;">Thanks for signing up for news about <strong>Snowbound</strong>.</p>
              <p style="margin:0 0 16px;">We have this email on file: <strong style="color:#0285e4;">{{email}}</strong></p>
              <p style="margin:0 0 8px;color:#5c5c5c;font-size:15px;">We'll write when there's something worth your time — no spam, just updates from the iced frontier.</p>
              <p style="margin:24px 0 0;font-size:14px;color:#112d57;">— The Snowbound team</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 24px;font-size:11px;color:#9ca3af;text-align:center;line-height:1.5;">
              You received this because you subscribed on our website.<br />
              <span style="font-family:ui-monospace,monospace;">{{time}}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

export function escapeHtml(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

/** Logo + wordmark area: image when `logoUrl` is set, else uppercase “Snowbound” label. */
export function brandHeaderHtml(logoUrl: string | undefined): string {
	if (logoUrl?.trim()) {
		const src = escapeHtml(logoUrl.trim());
		return `<p style="margin:0 0 12px;"><img src="${src}" alt="Snowbound" width="168" height="auto" style="display:block;margin:0 auto;max-width:168px;height:auto;border:0;outline:none;" /></p>`;
	}
	return `<p style="margin:0;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#b8d4e8;">Snowbound</p>`;
}

/** Fills placeholders; mailto href is encoded, visible fields are HTML-escaped. */
export function renderWaitlistHtml(
	template: string,
	vars: { email: string; time: string; title: string },
	options?: { logoUrl?: string },
): string {
	const { email, time, title } = vars;
	const brandHeader = brandHeaderHtml(options?.logoUrl);
	return template
		.replace(/\{\{brandHeader\}\}/g, brandHeader)
		.replace('href="mailto:{{email}}"', `href="mailto:${encodeURIComponent(email)}"`)
		.replace(/\{\{email\}\}/g, escapeHtml(email))
		.replace(/\{\{time\}\}/g, escapeHtml(time))
		.replace(/\{\{title\}\}/g, escapeHtml(title));
}
