/// <reference types="@cloudflare/workers-types" />
import { EmailMessage } from "cloudflare:email";

interface Env {
	ASSETS: Fetcher;
	EMAIL: SendEmail;
}

function utf8ToBase64(str: string): string {
	const bytes = new TextEncoder().encode(str);
	let binary = '';
	for (const byte of bytes) binary += String.fromCharCode(byte);
	return btoa(binary);
}

function buildRawEmail(from: string, to: string, subject: string, body: string): string {
	return [
		`From: Wirecore kontaktný formulár <${from}>`,
		`To: ${to}`,
		`Subject: =?UTF-8?B?${utf8ToBase64(subject)}?=`,
		`MIME-Version: 1.0`,
		`Content-Type: text/plain; charset=UTF-8`,
		`Content-Transfer-Encoding: base64`,
		``,
		utf8ToBase64(body),
	].join("\r\n");
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

	const emailBody = [
		`Meno: ${name}`,
		`Email: ${email}`,
		`Telefón: ${phone?.trim() || "—"}`,
		``,
		`Správa:`,
		message,
	].join("\n");

	const raw = buildRawEmail(
		"info@wirecore.sk",
		"info@wirecore.sk",
		`Správa od: ${name}`,
		emailBody
	);

	const emailMessage = new EmailMessage("info@wirecore.sk", "info@wirecore.sk", raw);
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
