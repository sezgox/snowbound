/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly RESEND_API_KEY?: string;
	readonly RESEND_FROM?: string;
	readonly RESEND_NOTIFY_TO?: string;
	readonly RESEND_REPLY_TO?: string;
	/** Public site origin (no trailing slash); used for waitlist email logo `img src`. */
	readonly PUBLIC_SITE_URL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
