export async function submitWaitlist(email: string): Promise<void> {
	console.log("[waitlist] submitting", { email });

	const res = await fetch("/api/waitlist", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			email,
			title: "Snowbound newsletter",
			time: new Date().toISOString(),
		}),
	});

	const data = (await res.json().catch(() => null)) as
		| { ok?: boolean; error?: string; resend?: unknown }
		| null;

	if (!res.ok) {
		console.warn("[waitlist] request failed", {
			status: res.status,
			message: data?.error,
			body: data,
		});
		if (res.status === 503) {
			throw new Error("not_configured");
		}
		throw new Error(data?.error ?? "request_failed");
	}

	console.log("[waitlist] success", { status: res.status, body: data });
}
