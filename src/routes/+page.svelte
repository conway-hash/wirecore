<svelte:head>
	<title>Wirecore | Elektroinstalacie, Kamerové Systémy, Fotovoltaika</title>
	<meta
		name="description"
		content="Wirecore – profesionálne elektroinstalacie, montáž kamerových systémov a inštalácia fotovoltaických panelov. Spoľahlivé riešenia pre váš domov a firmu."
	/>
	<meta name="robots" content="noindex, nofollow" />
	<link rel="canonical" href="https://wirecore.sk/" />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://wirecore.sk/" />
	<meta property="og:title" content="Wirecore | Elektroinstalacie, Kamerové Systémy, Fotovoltaika" />
	<meta
		property="og:description"
		content="Profesionálne elektroinstalacie, montáž kamerových systémov a inštalácia fotovoltaických panelov. Spoľahlivé riešenia pre váš domov a firmu."
	/>
	<meta property="og:locale" content="sk_SK" />
	<meta property="og:site_name" content="Wirecore" />

	<!-- Twitter / X -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Wirecore | Elektroinstalacie, Kamerové Systémy, Fotovoltaika" />
	<meta
		name="twitter:description"
		content="Profesionálne elektroinstalacie, montáž kamerových systémov a inštalácia fotovoltaických panelov."
	/>

	<!-- JSON-LD structured data -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "LocalBusiness",
		"name": "Wirecore",
		"description": "Profesionálne elektroinstalacie, montáž kamerových systémov a inštalácia fotovoltaických panelov.",
		"url": "https://wirecore.sk",
		"inLanguage": "sk",
		"areaServed": {
			"@type": "Country",
			"name": "Slovensko"
		},
		"serviceType": [
			"Elektroinstalacie",
			"Kamerové systémy",
			"Fotovoltaické panely"
		]
	}
	<\/script>`}
</svelte:head>

<header class="site-header">
	<div class="container header-inner">
		<a href="/" class="logo" aria-label="Wirecore – domovská stránka">
			<span class="logo-mark">W</span>
			<span class="logo-text">Wirecore</span>
		</a>
		<nav aria-label="Hlavná navigácia">
			<ul class="nav-list">
				<li><a href="#sluzby">Služby</a></li>
				<li><a href="#o-nas">O nás</a></li>
				<li><a href="#kontakt" class="btn-nav">Kontakt</a></li>
			</ul>
		</nav>
	</div>
</header>

<main>
	<!-- Hero -->
	<section class="hero" aria-labelledby="hero-heading">
		<div class="container hero-inner">
			<p class="eyebrow">Profesionálne riešenia pre váš domov DEV</p>
			<h1 id="hero-heading">
				Elektroinstalacie,<br />
				kamery &amp; solárne panely
			</h1>
			<p class="hero-lead">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
				laboris nisi ut aliquip ex ea commodo consequat.
			</p>
			<div class="hero-actions">
				<a href="#kontakt" class="btn btn-primary">Nezáväzná konzultácia</a>
				<a href="#sluzby" class="btn btn-ghost">Naše služby</a>
			</div>
		</div>
		<div class="hero-glow" aria-hidden="true"></div>
	</section>

	<!-- Services -->
	<section class="services" id="sluzby" aria-labelledby="services-heading">
		<div class="container">
			<h2 id="services-heading" class="section-title">Čo robíme</h2>
			<p class="section-sub">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua.
			</p>

			<div class="cards">
				<article class="card" aria-labelledby="card-elec">
					<div class="card-icon" aria-hidden="true">⚡</div>
					<h3 id="card-elec">Elektroinstalacie</h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis
						nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
						irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur.
					</p>
				</article>

				<article class="card" aria-labelledby="card-cam">
					<div class="card-icon" aria-hidden="true">📷</div>
					<h3 id="card-cam">Kamerové systémy</h3>
					<p>
						Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
						laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
						architecto beatae vitae dicta sunt explicabo.
					</p>
				</article>

				<article class="card" aria-labelledby="card-solar">
					<div class="card-icon" aria-hidden="true">☀️</div>
					<h3 id="card-solar">Fotovoltaické panely</h3>
					<p>
						Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
						consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
						quisquam est qui dolorem ipsum quia dolor sit amet.
					</p>
				</article>
			</div>
		</div>
	</section>

	<!-- About -->
	<section class="about" id="o-nas" aria-labelledby="about-heading">
		<div class="container about-inner">
			<div class="about-text">
				<h2 id="about-heading" class="section-title left">Prečo Wirecore?</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</p>
				<p>
					Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
					nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
					deserunt mollit anim id est laborum.
				</p>
				<ul class="check-list">
					<li>Lorem ipsum dolor sit amet consectetur</li>
					<li>Sed do eiusmod tempor incididunt</li>
					<li>Ut labore et dolore magna aliqua</li>
					<li>Quis nostrud exercitation ullamco</li>
				</ul>
			</div>
			<div class="about-stats" aria-label="Štatistiky">
				<div class="stat">
					<span class="stat-num">200+</span>
					<span class="stat-label">Dokončených projektov</span>
				</div>
				<div class="stat">
					<span class="stat-num">10+</span>
					<span class="stat-label">Rokov skúseností</span>
				</div>
				<div class="stat">
					<span class="stat-num">100%</span>
					<span class="stat-label">Spokojných zákazníkov</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Contact -->
	<section class="contact" id="kontakt" aria-labelledby="contact-heading">
		<div class="container contact-inner">
			<h2 id="contact-heading" class="section-title">Kontaktujte nás</h2>
			<p class="section-sub">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nezáväzná konzultácia zdarma.
			</p>
			<div class="contact-info">
				<a href="tel:+421900000000" class="contact-item">
					<span aria-hidden="true">📞</span>
					<span>+421 900 000 000</span>
				</a>
				<a href="mailto:info@wirecore.sk" class="contact-item">
					<span aria-hidden="true">✉️</span>
					<span>info@wirecore.sk</span>
				</a>
			</div>
		</div>
	</section>
</main>

<footer class="site-footer">
	<div class="container footer-inner">
		<p class="footer-brand">
			<a href="/" aria-label="Wirecore">Wirecore</a>
		</p>
		<p class="footer-copy">&copy; {new Date().getFullYear()} Wirecore. Všetky práva vyhradené.</p>
	</div>
</footer>

<style>
	/* Layout */
	.container {
		max-width: var(--max-w);
		margin-inline: auto;
		padding-inline: clamp(1rem, 5vw, 2.5rem);
	}

	/* Header */
	.site-header {
		position: sticky;
		top: 0;
		z-index: 100;
		background: rgba(13, 15, 18, 0.85);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--clr-border);
	}

	.header-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		padding-block: 1rem;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--clr-text);
		font-weight: 700;
		font-size: 1.1rem;
		letter-spacing: -0.01em;
	}

	.logo-mark {
		display: grid;
		place-items: center;
		width: 2rem;
		height: 2rem;
		background: var(--clr-accent);
		color: #000;
		border-radius: 6px;
		font-weight: 900;
		font-size: 0.9rem;
	}

	.logo:hover {
		color: var(--clr-text);
	}

	.nav-list {
		display: flex;
		align-items: center;
		gap: 2rem;
		list-style: none;
	}

	.nav-list a {
		color: var(--clr-muted);
		font-size: 0.9rem;
		font-weight: 500;
		transition: color 0.15s;
	}

	.nav-list a:hover {
		color: var(--clr-text);
	}

	.btn-nav {
		padding: 0.4rem 1rem;
		border: 1px solid var(--clr-accent);
		border-radius: var(--radius);
		color: var(--clr-accent) !important;
		font-size: 0.875rem !important;
	}

	.btn-nav:hover {
		background: var(--clr-accent);
		color: #000 !important;
	}

	/* Hero */
	.hero {
		position: relative;
		overflow: hidden;
		padding-block: clamp(4rem, 12vw, 8rem);
		text-align: center;
	}

	.hero-glow {
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse 80% 50% at 50% -10%, rgba(245, 166, 35, 0.12), transparent);
		pointer-events: none;
	}

	.hero-inner {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}

	.eyebrow {
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--clr-accent);
	}

	h1 {
		font-size: clamp(2.2rem, 6vw, 4rem);
		font-weight: 800;
		line-height: 1.15;
		letter-spacing: -0.03em;
		color: var(--clr-text);
	}

	.hero-lead {
		max-width: 56ch;
		color: var(--clr-muted);
		font-size: 1.05rem;
	}

	.hero-actions {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		justify-content: center;
		margin-top: 0.5rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		padding: 0.75rem 1.75rem;
		border-radius: var(--radius);
		font-weight: 600;
		font-size: 0.95rem;
		transition: all 0.15s;
		cursor: pointer;
	}

	.btn-primary {
		background: var(--clr-accent);
		color: #000;
	}

	.btn-primary:hover {
		background: var(--clr-accent-dim);
		color: #000;
	}

	.btn-ghost {
		border: 1px solid var(--clr-border);
		color: var(--clr-text);
	}

	.btn-ghost:hover {
		border-color: var(--clr-accent);
		color: var(--clr-accent);
	}

	/* Section headings */
	.section-title {
		font-size: clamp(1.6rem, 4vw, 2.5rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		text-align: center;
	}

	.section-title.left {
		text-align: left;
	}

	.section-sub {
		text-align: center;
		color: var(--clr-muted);
		max-width: 56ch;
		margin-inline: auto;
		font-size: 1.05rem;
	}

	/* Services */
	.services {
		padding-block: clamp(3rem, 8vw, 6rem);
		background: var(--clr-surface);
		border-block: 1px solid var(--clr-border);
	}

	.services .container {
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
	}

	.card {
		background: var(--clr-bg);
		border: 1px solid var(--clr-border);
		border-radius: calc(var(--radius) * 1.5);
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		transition: border-color 0.15s;
	}

	.card:hover {
		border-color: var(--clr-accent);
	}

	.card-icon {
		font-size: 2rem;
	}

	.card h3 {
		font-size: 1.25rem;
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	.card p {
		color: var(--clr-muted);
		font-size: 0.95rem;
	}

	/* About */
	.about {
		padding-block: clamp(3rem, 8vw, 6rem);
	}

	.about-inner {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: center;
	}

	.about-text {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.about-text p {
		color: var(--clr-muted);
	}

	.check-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.check-list li {
		padding-left: 1.5rem;
		position: relative;
		color: var(--clr-muted);
		font-size: 0.95rem;
	}

	.check-list li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: var(--clr-accent);
		font-weight: 700;
	}

	.about-stats {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	.stat {
		background: var(--clr-surface);
		border: 1px solid var(--clr-border);
		border-radius: calc(var(--radius) * 1.5);
		padding: 1.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.stat:first-child {
		grid-column: 1 / -1;
	}

	.stat-num {
		font-size: 2.5rem;
		font-weight: 800;
		letter-spacing: -0.04em;
		color: var(--clr-accent);
	}

	.stat-label {
		font-size: 0.85rem;
		color: var(--clr-muted);
	}

	/* Contact */
	.contact {
		padding-block: clamp(3rem, 8vw, 6rem);
		background: var(--clr-surface);
		border-block: 1px solid var(--clr-border);
		text-align: center;
	}

	.contact-inner {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-items: center;
	}

	.contact-info {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
	}

	.contact-item {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 1rem 1.5rem;
		background: var(--clr-bg);
		border: 1px solid var(--clr-border);
		border-radius: var(--radius);
		color: var(--clr-text);
		font-weight: 500;
		transition: border-color 0.15s;
	}

	.contact-item:hover {
		border-color: var(--clr-accent);
		color: var(--clr-accent);
	}

	/* Footer */
	.site-footer {
		border-top: 1px solid var(--clr-border);
		padding-block: 2rem;
	}

	.footer-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.footer-brand a {
		font-weight: 700;
		color: var(--clr-text);
		font-size: 1rem;
	}

	.footer-copy {
		color: var(--clr-muted);
		font-size: 0.85rem;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.about-inner {
			grid-template-columns: 1fr;
		}

		.about-stats {
			grid-template-columns: 1fr 1fr;
		}

		.stat:first-child {
			grid-column: auto;
		}

		.nav-list {
			gap: 1rem;
		}
	}

	@media (max-width: 480px) {
		.nav-list {
			display: none;
		}
	}
</style>
