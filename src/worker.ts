/// <reference types="@cloudflare/workers-types" />
import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";

interface Env {
	ASSETS: Fetcher;
	EMAIL: SendEmail;
}

async function handleContact(request: Request, env: Env): Promise<Response> {
	if (request.method !== "POST") {
		return new Response("Method Not Allowed", { status: 405 });
	}

	let body: { name?: string; email?: string; phone?: string; message?: string };
	try {
		body = await request.json();
	} catch {
		return Response.json({ error: "Neplatný formát" }, { status: 400 });
	}

	const { name, email, phone, message } = body;
	if (!name?.trim() || !email?.trim() || !message?.trim()) {
		return Response.json({ error: "Chýbajú povinné polia" }, { status: 400 });
	}

	const msg = createMimeMessage();
	msg.setSender({ name: "Wirecore kontaktný formulár", addr: "info@wirecore.sk" });
	msg.setRecipient("info@wirecore.sk");
	msg.setSubject(`Správa od: ${name}`);
	msg.addMessage({
		contentType: "text/plain",
		data: [
			`Meno: ${name}`,
			`Email: ${email}`,
			`Telefón: ${phone?.trim() || "—"}`,
			"",
			"Správa:",
			message,
		].join("\n"),
	});

	const emailMessage = new EmailMessage("info@wirecore.sk", "info@wirecore.sk", msg.asRaw());
	await env.EMAIL.send(emailMessage);

	return Response.json({ ok: true });
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const { pathname } = new URL(request.url);

		if (pathname === "/api/contact") {
			return handleContact(request, env);
		}

		return env.ASSETS.fetch(request);
	},
};
