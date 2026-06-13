# Sending email as `info@wirecore.sk` — setup guide

A complete record of how email is configured for **wirecore.sk**, so future-me can rebuild or troubleshoot it.

## The big picture

- **Domain registrar:** Websupport (only used to hold the `.sk` domain — no email there).
- **DNS + website + email:** all on **Cloudflare** (site runs on Cloudflare Workers).
- **Receiving** `info@wirecore.sk`: Cloudflare **Email Routing** forwards it to a personal Gmail inbox.
- **Sending** as `info@wirecore.sk`: Cloudflare **Email Service → Email Sending** (SMTP), wired into Gmail's "Send mail as".

The whole point of this setup: reply *from* `info@wirecore.sk` and land in the recipient's **inbox, not spam**, for **$5/month** (Workers Paid) and nothing else.

Why it works: mail goes out through Cloudflare, which signs it with a DKIM key aligned to `wirecore.sk` and authenticates SPF — so it passes DMARC. (The old problem was Gmail "send as" through Google: no aligned DKIM → DMARC fail → spam.)

---

## Part 1 — Cloudflare Email Sending

### 1.1 Enable Workers Paid

Email Sending requires the **Workers Paid** plan ($5/mo). It also raises compute limits for all Workers/projects on the account, and includes **3,000 outbound emails/month** (plenty for hand-written replies).

Dashboard → **Compute → Email Service → Email Sending → Purchase Workers Paid**.

### 1.2 Onboard the domain

**Compute → Email Service → Email Sending → Onboard Domain** → select **`wirecore.sk`**.

> ⚠️ Onboard the **apex domain** (`wirecore.sk`), NOT `info.wirecore.sk`.
> The "domain" is everything *after* the `@`. `info` is just the mailbox name and is set later in Gmail.
> Onboarding `info.wirecore.sk` by mistake only lets you send as `something@info.wirecore.sk` and rejects `info@wirecore.sk` with `550 sender denied`.

Cloudflare auto-adds these DNS records (your DNS is on Cloudflare, so it does it for you):

| Record | Purpose |
| --- | --- |
| `cf-bounce.wirecore.sk` — MX ×3 → `route1/2/3.mx.cloudflare.net` | bounce handling |
| `cf-bounce._domainkey.wirecore.sk` — TXT (DKIM) | signs outbound mail, aligned to the domain |
| `cf-bounce.wirecore.sk` — TXT → `v=spf1 include:_spf.mx.cloudflare.net ~all` | authorizes sending |

Propagation is usually 5–15 minutes on Cloudflare DNS.

### 1.3 Create the API token (this is the SMTP password)

**My Profile → API Tokens → Create Token → Custom token.**

- **Scope:** your **Account** (NOT "Specified Domains" — Email Sending is an account-level permission, so it won't appear under a domain scope).
- **Permission:** **Email Sending → Edit**.
- **Expiration:** No expiration is fine for an always-on credential.
- **Client IP filtering:** leave empty (Gmail sends from rotating IPs).

**Copy the token immediately — it's shown only once.** This token is the SMTP password.

### 1.4 DNS cleanup

In Cloudflare DNS, tidy up:

- **Root SPF** (`wirecore.sk` TXT): trim to exactly
  ```
  v=spf1 include:_spf.mx.cloudflare.net ~all
  ```
  (removed the stale `include:_spf.google.com`; make sure the Cloudflare include has its leading underscore `_spf`).
- **Delete leftovers** if present: any `*.info.wirecore.sk` records from a wrong onboarding, and old `mail._domainkey` (Websupport DKIM).
- **Keep:** the three apex `wirecore.sk` MX records (inbound Email Routing), `cf2024-1._domainkey`, `_dmarc.wirecore.sk`, and both Worker records.

---

## Part 2 — Add "Send mail as" in Gmail

Gmail → **Settings → Accounts and Import → "Send mail as" → Add another email address** (or edit `info@wirecore.sk`).

1. Name + email `info@wirecore.sk` → Next.
2. Choose **"Send through SMTP server"** and enter:

| Field | Value |
| --- | --- |
| SMTP Server | `smtp.mx.cloudflare.net` |
| Port | `465` |
| Connection | **SSL** (implicit TLS) |
| Username | `api_token` ← the literal word, NOT your email |
| Password | the Cloudflare API token from step 1.3 |

> ⚠️ Two gotchas that cause failures:
> - Port must be **465 / SSL**. Cloudflare does **not** support STARTTLS on 587.
> - Username is the literal string **`api_token`** — the token goes in the **password** field.
> Wrong username → `535 authentication failed`. Wrong/unonboarded domain → `550 sender denied`.

3. Gmail emails a confirmation code/link to `info@wirecore.sk`. It arrives in Gmail via Email Routing — click the link / enter the code.

---

## Part 3 — Authentication & verification

- **DMARC:** `_dmarc.wirecore.sk` TXT is `v=DMARC1; p=quarantine`. 
- **DMARC Management (optional, free):** Cloudflare **Email → DMARC Management** appends a reporting address (`rua=`) to the existing record without changing the policy. Gives a dashboard of who sends as the domain.
- **Tighten later:** after ~1–2 weeks of DMARC reports confirm legit mail passes, change `p=quarantine` → `p=reject` for the strongest anti-spoofing. (Don't jump straight to reject — failing mail is dropped entirely, not just sent to spam.)
- **Verify:** send a test from `info@wirecore.sk` to [mail-tester.com](https://www.mail-tester.com). Target = **10/10** with SPF / DKIM / DMARC all passing. ✅ (achieved)

The "no HTML version" / "no List-Unsubscribe header" warnings on mail-tester are **mass-mailing** checks — irrelevant for personal replies.

---

## Part 4 — Profile picture / logo next to emails

There's **no single free switch** that shows a picture in every inbox — it's provider by provider. Honest summary:

| Provider | Free option | Notes |
| --- | --- | --- |
| **Yahoo / AOL / Fastmail** | Self-asserted **BIMI** (no cert) | DNS record + hosted SVG; free |
| **Apple Mail** | **Apple Business Connect → Branded Mail** | free, verify business; requires DMARC |
| **Proton Mail** | Website **favicon** | automatic, nothing to do |
| **Zoho + Thunderbird/Airmail/Postbox** | **Gravatar** | free; NOT Gmail/Apple/Outlook |
| **Gmail** | ❌ paid only | needs a **VMC or CMC** certificate (hundreds–$1,000+/yr) |
| **Outlook / Microsoft** | ❌ none | no sender-side method; only if recipient saves you as a contact |

### Free self-asserted BIMI (covers Yahoo / Fastmail / Apple Mail)

Reuses the DMARC work already done. Steps:

1. **Logo → SVG Tiny P/S.** BIMI needs the strict "SVG Tiny Portable/Secure" format, and the logo must be **square (1:1)**. Convert a square SVG with EasyDMARC's free **BIMI SVG Logo Converter** (start from a vector SVG, not a PNG).
2. **Host the SVG over HTTPS**, e.g. `https://wirecore.sk/bimi.svg` (served from the Cloudflare site).
3. **Add the BIMI DNS record** — TXT at `default._bimi.wirecore.sk`:
   ```
   v=BIMI1; l=https://wirecore.sk/bimi.svg;
   ```
   (no `a=` certificate tag for the free self-asserted version).

> Gmail still won't show the logo without the paid VMC/CMC cert. The Google-account-profile-photo trick is hit-or-miss when sending via external SMTP and isn't relied on here.

---

## Quick reference card

```
Receiving:  info@wirecore.sk  →  Cloudflare Email Routing  →  personal Gmail
Sending:    Gmail "Send mail as"  →  Cloudflare SMTP  →  recipient inbox

SMTP host:  smtp.mx.cloudflare.net
SMTP port:  465 (SSL / implicit TLS)
Username:   api_token        (literal)
Password:   <Cloudflare API token, Email Sending: Edit>

Root SPF:   v=spf1 include:_spf.mx.cloudflare.net ~all
DMARC:      v=DMARC1; p=quarantine   (move to p=reject after report review)
Sending DKIM: cf-bounce._domainkey.wirecore.sk (auto)
Cost:       $5/mo Workers Paid · 3,000 emails/month included
```
