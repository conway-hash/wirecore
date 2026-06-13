<script lang="ts">
	let menuOpen = $state(false);
	let activeFilter = $state('Všetky');
	let activeSection = $state('domov');

	const navItems = [
		{ id: 'domov', label: 'Domov' },
		{ id: 'o-nas', label: 'O nás' },
		{ id: 'sluzby', label: 'Služby' },
		{ id: 'referencie', label: 'Referencie' },
		{ id: 'kontakt', label: 'Kontakt' }
	];

	function updateActiveSection() {
		// last section whose top has scrolled past the sticky navbar
		let current = navItems[0].id;
		for (const { id } of navItems) {
			const el = document.getElementById(id);
			if (el && el.getBoundingClientRect().top <= 160) current = id;
		}
		activeSection = current;
	}

	$effect(() => {
		updateActiveSection();
	});

	const filters = ['Všetky', 'Bleskozvod', 'Hrubá stavba', 'Podlahové kúrenie', 'Rozvádzač'];

	const projects = [
		{ category: 'Rozvádzač', title: 'Priemyselný rozvádzač' },
		{ category: 'Hrubá stavba', title: 'Kabeláž novostavby' },
		{ category: 'Podlahové kúrenie', title: 'Elektrické rohože' },
		{ category: 'Bleskozvod', title: 'Ochrana pred bleskom' },
		{ category: 'Bleskozvod', title: 'Základový zemnič' },
		{ category: 'Rozvádzač', title: 'Bytový rozvádzač' }
	];

	const reviews = [
		{
			text: '„Vynikajúca práca od začiatku do konca. Elektrika v celom dome hotová načas, čisto a bez zbytočných komplikácií. Určite odporúčam každému."',
			author: 'Tomáš, Boleráz'
		},
		{
			text: '„Prišli, pozreli sa, navrhli riešenie a do týždňa bolo všetko hotové. Káble úhľadne uložené, nič neprekáža. Spokojnosť na celej čiare."',
			author: 'Miroslava, Dolná Krupá'
		},
		{
			text: '„Konečne elektrikári, ktorí sa neboja poradiť a vysvetliť čo robia. Fotovoltika ide bezvadne, odporúčam bez výhrad."',
			author: 'Ján, Smolenice'
		}
	];

	const visibleProjects = $derived(
		activeFilter === 'Všetky' ? projects : projects.filter((p) => p.category === activeFilter)
	);
</script>

<svelte:head>
	<title>WireCore | Elektroinstalacie, Kamerové Systémy, Fotovoltaika</title>
	<meta
		name="description"
		content="WireCore – profesionálne elektroinstalacie, montáž kamerových systémov a inštalácia fotovoltaických panelov. Spoľahlivé riešenia pre váš domov a firmu."
	/>
	<meta name="robots" content="noindex, nofollow" />
	<link rel="canonical" href="https://wirecore.sk/" />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://wirecore.sk/" />
	<meta property="og:title" content="WireCore | Elektroinstalacie, Kamerové Systémy, Fotovoltaika" />
	<meta
		property="og:description"
		content="Profesionálne elektroinstalacie, montáž kamerových systémov a inštalácia fotovoltaických panelov. Spoľahlivé riešenia pre váš domov a firmu."
	/>
	<meta property="og:locale" content="sk_SK" />
	<meta property="og:site_name" content="WireCore" />

	<!-- Twitter / X -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="WireCore | Elektroinstalacie, Kamerové Systémy, Fotovoltaika" />
	<meta
		name="twitter:description"
		content="Profesionálne elektroinstalacie, montáž kamerových systémov a inštalácia fotovoltaických panelov."
	/>

	<!-- JSON-LD structured data -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "LocalBusiness",
		"name": "WireCore",
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

{#snippet iconBolt(cls: string = 'icon')}
	<svg class={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
		<path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
	</svg>
{/snippet}

{#snippet iconStar()}
	<svg class="icon icon-star" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
		<path
			d="m12 17.27 6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
		/>
	</svg>
{/snippet}

<svelte:window onscroll={updateActiveSection} />

<!-- Header -->
<header class="site-header">
	<nav class="navbar" aria-label="Hlavná navigácia">
		<div class="navbar-inner">
			<a href="#domov" class="logo" aria-label="WireCore – domovská stránka">
				<img src="/logo-wordmark.svg" alt="WireCore" class="logo-img" />
			</a>

			<ul class="nav-list">
				{#each navItems as item (item.id)}
					<li>
						<a
							href="#{item.id}"
							class="nav-link"
							class:active={activeSection === item.id}
							onclick={() => (activeSection = item.id)}
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>

			<div class="nav-contact">
				<a href="tel:+421900123456" class="nav-contact-link">
					<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
					</svg>
					+421 900 123 456
				</a>
				<a href="mailto:info@wirecore.sk" class="nav-contact-link">
					<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-10 5L2 7" />
					</svg>
					info@wirecore.sk
				</a>
			</div>

			<button
				class="menu-toggle"
				aria-expanded={menuOpen}
				aria-label={menuOpen ? 'Zavrieť menu' : 'Otvoriť menu'}
				onclick={() => (menuOpen = !menuOpen)}
			>
				{#if menuOpen}
					<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
						<path d="M18 6 6 18" /><path d="m6 6 12 12" />
					</svg>
				{:else}
					<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
						<path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" />
					</svg>
				{/if}
			</button>
		</div>

		{#if menuOpen}
			<ul class="mobile-nav">
				{#each navItems as item (item.id)}
					<li>
						<a
							href="#{item.id}"
							onclick={() => {
								activeSection = item.id;
								menuOpen = false;
							}}
						>
							{item.label}
						</a>
					</li>
				{/each}
				<li><a href="tel:+421900123456">+421 900 123 456</a></li>
				<li><a href="mailto:info@wirecore.sk">info@wirecore.sk</a></li>
			</ul>
		{/if}
	</nav>
</header>

<main>
	<!-- Hero -->
	<section class="hero" id="domov" aria-labelledby="hero-heading">
		<div class="hero-bg" aria-hidden="true">
			<video src="/videos/hero.mp4" autoplay muted loop playsinline></video>
			<div class="hero-overlay"></div>
		</div>
		<div class="container">
			<div class="hero-content">
				<h1 id="hero-heading">
					Profesionálne elektroinštalácie s dôrazom na <span class="accent">detail</span>
				</h1>
				<p class="hero-lead">
					Kombinujeme technickú precíznosť s moderným prístupom. Zabezpečujeme kompletné
					elektroinštalačné služby od návrhu až po revíziu pre maximálnu bezpečnosť a efektivitu.
				</p>
				<div class="hero-actions">
					<a href="#sluzby" class="btn btn-primary">
						Naše Služby
						<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M12 5v14" /><path d="m19 12-7 7-7-7" />
						</svg>
					</a>
					<a href="#kontakt" class="btn btn-outline">Konzultácia Zadarmo</a>
				</div>
			</div>
		</div>
	</section>

	<!-- O nás -->
	<section class="about" id="o-nas" aria-labelledby="about-heading">
		<div class="container about-grid">
			<div class="about-visual" aria-hidden="true">
				{@render iconBolt('icon about-bolt')}
			</div>
			<div class="about-text">
				<h2 id="about-heading" class="section-title accent-border">
					Spoľahlivosť a bezpečnosť v každom kábli
				</h2>
				<p>
					Sme tím certifikovaných špecialistov, ktorí pristupujú ku každému projektu s maximálnou
					zodpovednosťou. Naším cieľom nie je len „zapojiť drôty", ale vytvoriť inteligentný,
					bezpečný a dlhodobo udržateľný elektrický ekosystém.
				</p>
				<p>
					Od rodinných domov až po rozsiahle priemyselné haly, naše portfólio odráža našu schopnosť
					adaptovať sa na špecifické potreby a technické výzvy každého prostredia.
				</p>
				<div class="stats">
					<div class="stat">
						<div class="stat-icon">
							<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
							</svg>
						</div>
						<p class="stat-num">10+</p>
						<p class="stat-label">Rokov skúseností</p>
					</div>
					<div class="stat">
						<div class="stat-icon">
							{@render iconBolt()}
						</div>
						<p class="stat-num">500+</p>
						<p class="stat-label">Úspešných projektov</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Služby -->
	<section class="services" id="sluzby" aria-labelledby="services-heading">
		<div class="container">
			<h2 id="services-heading" class="section-title">Komplexné riešenia pre každé napätie</h2>

			<div class="service-grid">
				<article class="service-card">
					<div class="service-icon">
						<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M12 2v10" /><path d="M18.4 6.6a9 9 0 1 1-12.77.04" />
						</svg>
					</div>
					<h3>Silnoprúd</h3>
					<p>
						Komplexné inštalácie elektrických rozvodov pre domácnosti a priemyselné objekty. Od
						návrhu až po revíznu správu.
					</p>
				</article>

				<article class="service-card">
					<div class="service-icon">
						<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M12 20h.01" /><path d="M5 12.86a10 10 0 0 1 14 0" /><path d="M8.5 16.43a5 5 0 0 1 7 0" /><path d="M2 8.82a15 15 0 0 1 20 0" />
						</svg>
					</div>
					<h3>Slaboprúd</h3>
					<p>Dátové siete, kamerové systémy, alarmy a inteligentné elektroinštalácie.</p>
				</article>

				<article class="service-card">
					<div class="service-icon">
						<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M6 16.33A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.97" /><path d="m13 12-3 5h4l-3 5" />
						</svg>
					</div>
					<h3>Bleskozvody a Uzemnenie</h3>
					<p>
						Ochrana majetku pred atmosférickými prepätiami. Návrh, inštalácia a pravidelné revízie.
					</p>
				</article>

				<article class="service-card">
					<div class="service-icon">
						<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
						</svg>
					</div>
					<h3>Fotovoltika</h3>
					<p>Montáž fotovoltických systémov pre energetickú nezávislosť a udržateľnosť.</p>
				</article>
			</div>

			<!-- Trust banner -->
			<div class="trust-banner">
				<div class="trust-info">
					<div class="trust-icon">
						<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1 1 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" />
						</svg>
					</div>
					<div>
						<h3>Garantovaná Bezpečnosť</h3>
						<p>
							Všetky naše inštalácie spĺňajú najprísnejšie normy STN a sú certifikované pre
							maximálnu bezpečnosť.
						</p>
					</div>
				</div>
				<a href="#kontakt" class="btn btn-dark">Zistiť viac</a>
			</div>
		</div>
	</section>

	<!-- Recenzie -->
	<section class="reviews" id="recenzie" aria-labelledby="reviews-heading">
		<div class="container">
			<h2 id="reviews-heading" class="section-title center">Hodnotenia zákazníkov</h2>
			<div class="review-grid">
				{#each reviews as review (review.author)}
					<article class="review-card">
						<div class="stars" aria-label="5 z 5 hviezdičiek">
							{#each Array(5), i (i)}
								{@render iconStar()}
							{/each}
						</div>
						<p class="review-text">{review.text}</p>
						<p class="review-author">{review.author}</p>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- Referencie -->
	<section class="portfolio" id="referencie" aria-labelledby="portfolio-heading">
		<div class="container">
			<h2 id="portfolio-heading" class="section-title center">Referencie</h2>
			<p class="section-sub">Ukážka našej odbornej práce o úspešne zrealizovaných projektoch.</p>

			<div class="filters" role="group" aria-label="Filter projektov">
				{#each filters as filter (filter)}
					<button
						class="chip"
						class:chip-active={activeFilter === filter}
						onclick={() => (activeFilter = filter)}
					>
						{filter}
					</button>
				{/each}
			</div>

			<div class="gallery">
				{#each visibleProjects as project (project.title)}
					<article class="gallery-item">
						<div class="gallery-visual" aria-hidden="true">
							{@render iconBolt('icon gallery-bolt')}
						</div>
						<div class="gallery-caption">
							<span class="gallery-category">{project.category}</span>
							<h3>{project.title}</h3>
						</div>
					</article>
				{/each}
			</div>

			<div class="portfolio-cta">
				<a href="#kontakt" class="btn btn-outline">Mám záujem o podobný projekt</a>
			</div>
		</div>
	</section>

	<!-- Kontakt -->
	<section class="contact" id="kontakt" aria-labelledby="contact-heading">
		<div class="container">
			<div class="contact-panel">
				<div class="contact-form-col">
					<h2 id="contact-heading" class="section-title">Kontaktujte nás</h2>
					<p class="contact-sub">Máte projekt? Napíšte nám a my sa vám ozveme s návrhom riešenia.</p>
					<form>
						<div class="field">
							<label for="name">Meno a priezvisko</label>
							<input id="name" type="text" placeholder="Ján Novák" autocomplete="name" />
						</div>
						<div class="field-row">
							<div class="field">
								<label for="email">E-mail</label>
								<input id="email" type="email" placeholder="jan@example.com" autocomplete="email" />
							</div>
							<div class="field">
								<label for="phone">Telefón</label>
								<input id="phone" type="tel" placeholder="+421 900 000 000" autocomplete="tel" />
							</div>
						</div>
						<div class="field">
							<label for="message">Správa / Popis projektu</label>
							<textarea id="message" rows="4" placeholder="Ako vám môžeme pomôcť?"></textarea>
						</div>
						<button type="submit" class="btn btn-primary btn-block">Odoslať dopyt</button>
					</form>
				</div>

				<div class="contact-info-col">
					<h3>Firemné údaje</h3>
					<ul class="contact-list">
						<li>
							<svg class="icon contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
							</svg>
							<div>
								<p class="contact-strong">WireCore s.r.o.</p>
								<p>Elektrárenská 12<br />831 04 Bratislava<br />Slovenská republika</p>
							</div>
						</li>
						<li>
							<svg class="icon contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
							</svg>
							<p><a href="tel:+421900123456" class="contact-link">+421 900 123 456</a></p>
						</li>
						<li>
							<svg class="icon contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-10 5L2 7" />
							</svg>
							<p><a href="mailto:info@wirecore.sk" class="contact-link">info@wirecore.sk</a></p>
						</li>
					</ul>

					<div class="map-placeholder">
						<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" /><line x1="9" x2="9" y1="3" y2="18" /><line x1="15" x2="15" y1="6" y2="21" />
						</svg>
						<span>Bratislava</span>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>

<!-- Footer -->
<footer class="site-footer">
	<div class="container footer-inner">
		<a href="#domov" class="footer-logo" aria-label="WireCore">
			<img src="/logo.svg" alt="WireCore" class="footer-logo-img" />
		</a>
		<p class="footer-copy">
			&copy; {new Date().getFullYear()} WireCore s.r.o. Všetky práva vyhradené.<br />
			<span class="footer-fine">IČO: 12345678, DIČ: 2021234567</span><br />
			<span class="footer-fine">Created by Tomáš Bokor &mdash; <a href="mailto:tomasbokor.dev@gmail.com" class="footer-credit-link">tomasbokor.dev@gmail.com</a></span>
		</p>
	</div>
</footer>

<style>
	/* ---------- shared ---------- */
	.container {
		max-width: var(--max-w);
		margin-inline: auto;
		padding-inline: clamp(20px, 4vw, 40px);
	}

	.icon {
		width: 1.5rem;
		height: 1.5rem;
		flex-shrink: 0;
	}

	.accent {
		color: var(--clr-accent);
	}

	.section-title {
		font-size: clamp(1.75rem, 3.5vw, 2rem);
		font-weight: 700;
		line-height: 1.25;
		letter-spacing: -0.01em;
		color: var(--clr-text);
		margin-bottom: 1rem;
	}

	.section-title.center {
		text-align: center;
	}

	.section-title.accent-border {
		border-left: 4px solid var(--clr-accent);
		padding-left: 1rem;
	}

	.section-sub {
		text-align: center;
		color: var(--clr-muted);
		max-width: 56ch;
		margin-inline: auto;
		margin-bottom: 3rem;
	}

	/* ---------- buttons ---------- */
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 1rem 2rem;
		border: none;
		border-radius: var(--radius-full);
		font-size: 0.875rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		transition: all 0.2s;
	}

	.btn-primary {
		background: var(--clr-accent);
		color: var(--clr-on-accent);
	}

	.btn-primary:hover {
		background: var(--clr-accent-dim);
		box-shadow: var(--glow);
	}

	.btn-outline {
		border: 2px solid var(--clr-accent);
		color: var(--clr-text);
		background: transparent;
	}

	.btn-outline:hover {
		background: rgba(217, 255, 0, 0.1);
		box-shadow: var(--glow);
	}

	.btn-dark {
		background: var(--clr-on-accent);
		color: var(--clr-accent);
		white-space: nowrap;
	}

	.btn-dark:hover {
		background: var(--clr-bg);
	}

	.btn-block {
		width: 100%;
	}

	/* ---------- header ---------- */
	.site-header {
		position: sticky;
		top: 0.75rem;
		z-index: 50;
		padding-inline: clamp(12px, 2.5vw, 24px);
		margin-top: 1.5rem;
	}

	.navbar {
		max-width: var(--max-w);
		margin-inline: auto;
		background: rgba(19, 19, 19, 0.9);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(217, 255, 0, 0.2);
		border-radius: var(--radius-md);
		box-shadow: 0 20px 40px -15px rgba(217, 255, 0, 0.05);
	}

	.navbar-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 1.125rem 2rem;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--clr-text);
		text-decoration: none;
	}

	.logo-img {
		height: 1.25rem;
		width: auto;
	}



	.nav-list {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		list-style: none;
	}

	.nav-link {
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		color: var(--clr-muted);
		padding-bottom: 0.25rem;
		transition: color 0.15s;
	}

	.nav-link:hover {
		color: var(--clr-text);
	}

	.nav-link.active {
		color: var(--clr-text);
		font-weight: 700;
		border-bottom: 2px solid var(--clr-accent);
	}

	.nav-contact {
		display: flex;
		align-items: center;
		gap: 1.25rem;
	}

	.nav-contact-link {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--clr-muted);
		white-space: nowrap;
		transition: color 0.15s;
	}

	.nav-contact-link:hover {
		color: var(--clr-accent);
	}

	.nav-contact-link .icon {
		width: 1rem;
		height: 1rem;
		color: var(--clr-accent);
	}

	.menu-toggle {
		display: none;
		background: none;
		border: none;
		color: var(--clr-text);
		padding: 0.5rem;
	}

	.mobile-nav {
		display: none;
		list-style: none;
		flex-direction: column;
		padding: 0.5rem 1.5rem 1.25rem;
	}

	.mobile-nav a {
		display: block;
		padding: 0.6rem 0;
		font-weight: 600;
		color: var(--clr-body);
		border-bottom: 1px solid var(--clr-surface-variant);
	}

	/* ---------- hero ---------- */
	.hero {
		position: relative;
		min-height: 85vh;
		display: flex;
		align-items: center;
		padding-block: 6rem 3rem;
		overflow: hidden;
		margin-top: -5.5rem;
	}

	/* the hero is a flex row, so the container must span it explicitly —
	   otherwise margin-inline: auto shrink-wraps and centers the text block */
	.hero .container {
		width: 100%;
	}

	.hero-bg {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.hero-bg video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: right center;
		opacity: 0.35;
	}

	.hero-overlay {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(
				to right,
				rgba(19, 19, 19, 0.85),
				rgba(19, 19, 19, 0.45) 50%,
				transparent
			),
			linear-gradient(to top, var(--clr-bg), transparent 35%);
	}

	.hero-content {
		position: relative;
		max-width: 48rem;
	}

	h1 {
		font-size: clamp(2.25rem, 5vw, 3rem);
		font-weight: 700;
		line-height: 1.17;
		letter-spacing: -0.02em;
		color: var(--clr-text);
		margin-bottom: 1.5rem;
	}

	.hero-lead {
		font-size: 1.125rem;
		line-height: 1.55;
		color: var(--clr-muted);
		max-width: 42rem;
		margin-bottom: 2.5rem;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	/* ---------- about ---------- */
	.about {
		padding-block: var(--section-gap);
	}

	.about-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		align-items: center;
	}

	.about-visual {
		position: relative;
		min-height: 400px;
		height: 100%;
		border-radius: var(--radius-xl);
		border: 1px solid var(--clr-surface-variant);
		background:
			radial-gradient(circle at 50% 50%, rgba(217, 255, 0, 0.08), transparent 60%),
			repeating-linear-gradient(
				45deg,
				transparent 0,
				transparent 39px,
				rgba(217, 255, 0, 0.04) 39px,
				rgba(217, 255, 0, 0.04) 40px
			),
			var(--clr-surface-low);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.about-bolt {
		width: 7rem;
		height: 7rem;
		color: var(--clr-accent);
		filter: drop-shadow(0 0 40px rgba(217, 255, 0, 0.4));
	}

	.about-text p {
		color: var(--clr-muted);
		margin-bottom: 1.5rem;
	}

	.stats {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		margin-top: 0.5rem;
	}

	.stat {
		background: var(--clr-surface);
		border: 1px solid var(--clr-surface-variant);
		border-radius: var(--radius-md);
		padding: 1.5rem;
	}

	.stat-icon {
		width: 3rem;
		height: 3rem;
		background: var(--clr-accent);
		color: var(--clr-on-accent);
		border-radius: var(--radius-sm);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1rem;
	}

	.stat-num {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--clr-text);
		margin-bottom: 0.5rem;
	}

	.stat-label {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--clr-muted);
	}

	/* ---------- services ---------- */
	.services {
		padding-block: var(--section-gap);
		background: rgba(28, 27, 27, 0.3);
	}

	.services .section-title {
		margin-bottom: 3rem;
	}

	.service-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	.service-card {
		background: var(--clr-surface);
		border: 1px solid var(--clr-surface-variant);
		border-radius: var(--radius-md);
		padding: 2rem;
		min-height: 280px;
		display: flex;
		flex-direction: column;
		transition: border-color 0.4s, box-shadow 0.4s;
	}

	.service-card:hover {
		border-color: rgba(217, 255, 0, 0.5);
		box-shadow: 0 0 40px rgba(217, 255, 0, 0.06);
	}

	.service-icon {
		width: 3rem;
		height: 3rem;
		background: var(--clr-accent);
		color: var(--clr-on-accent);
		border-radius: var(--radius-full);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: auto;
	}

	.service-card h3 {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--clr-text);
		margin-top: 4rem;
		margin-bottom: 0.75rem;
	}

	.service-card p {
		color: var(--clr-muted);
	}

	/* trust banner */
	.trust-banner {
		margin-top: 4rem;
		background: var(--clr-accent);
		color: var(--clr-on-accent);
		border-radius: var(--radius-md);
		padding: 2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		box-shadow: 0 10px 30px -10px rgba(217, 255, 0, 0.2);
	}

	.trust-info {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.trust-icon {
		width: 3.5rem;
		height: 3.5rem;
		flex-shrink: 0;
		background: var(--clr-on-accent);
		color: var(--clr-accent);
		border-radius: var(--radius-full);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.trust-banner h3 {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 0.25rem;
	}

	.trust-banner p {
		opacity: 0.8;
	}

	/* ---------- reviews ---------- */
	.reviews {
		padding-block: var(--section-gap);
	}

	.reviews .section-title {
		margin-bottom: 3rem;
	}

	.review-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}

	.review-card {
		background: var(--clr-surface);
		border: 1px solid var(--clr-surface-variant);
		border-radius: var(--radius-md);
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.stars {
		display: flex;
		color: var(--clr-accent);
	}

	.icon-star {
		width: 1.25rem;
		height: 1.25rem;
	}

	.review-text {
		color: var(--clr-muted);
	}

	.review-author {
		margin-top: auto;
		padding-top: 1rem;
		border-top: 1px solid var(--clr-surface-variant);
		font-size: 0.875rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		color: var(--clr-text);
	}

	/* ---------- portfolio ---------- */
	.portfolio {
		padding-block: var(--section-gap);
	}

	.filters {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem;
		margin-bottom: 3rem;
	}

	.chip {
		padding: 0.5rem 1.5rem;
		border: none;
		border-radius: var(--radius-full);
		background: var(--clr-surface);
		color: var(--clr-body);
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		transition: background 0.15s, color 0.15s;
	}

	.chip:hover {
		background: var(--clr-surface-high);
	}

	.chip-active {
		background: var(--clr-accent);
		color: var(--clr-on-accent);
		font-weight: 700;
	}

	.gallery {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}

	.gallery-item {
		position: relative;
		aspect-ratio: 4 / 3;
		border-radius: var(--radius-md);
		overflow: hidden;
		background: var(--clr-surface);
		border: 1px solid var(--clr-surface-variant);
		display: flex;
		flex-direction: column;
		transition: border-color 0.3s;
	}

	.gallery-item:hover {
		border-color: rgba(217, 255, 0, 0.5);
	}

	.gallery-visual {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		background:
			radial-gradient(circle at 50% 40%, rgba(217, 255, 0, 0.06), transparent 65%),
			repeating-linear-gradient(
				-45deg,
				transparent 0,
				transparent 29px,
				rgba(255, 255, 255, 0.02) 29px,
				rgba(255, 255, 255, 0.02) 30px
			);
	}

	.gallery-bolt {
		width: 3rem;
		height: 3rem;
		color: rgba(217, 255, 0, 0.25);
		transition: color 0.3s, filter 0.3s;
	}

	.gallery-item:hover .gallery-bolt {
		color: rgba(217, 255, 0, 0.6);
		filter: drop-shadow(0 0 20px rgba(217, 255, 0, 0.3));
	}

	.gallery-caption {
		padding: 1.25rem 1.5rem;
		background: linear-gradient(to top, rgba(14, 14, 14, 0.9), rgba(14, 14, 14, 0.4));
	}

	.gallery-category {
		display: block;
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--clr-accent);
		margin-bottom: 0.25rem;
	}

	.gallery-caption h3 {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--clr-text);
	}

	.portfolio-cta {
		margin-top: 3rem;
		text-align: center;
	}

	/* ---------- contact ---------- */
	.contact {
		padding-block: var(--section-gap);
	}

	.contact-panel {
		display: grid;
		grid-template-columns: 1fr 1fr;
		background: var(--clr-surface);
		border: 1px solid var(--clr-surface-variant);
		border-radius: var(--radius-md);
		overflow: hidden;
	}

	.contact-form-col {
		padding: clamp(2rem, 4vw, 3rem);
	}

	.contact-sub {
		color: var(--clr-muted);
		margin-bottom: 2rem;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.field-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	.field label {
		display: block;
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		color: var(--clr-muted);
		margin-bottom: 0.5rem;
	}

	.field input,
	.field textarea {
		width: 100%;
		background: var(--clr-bg);
		border: 1px solid var(--clr-surface-variant);
		border-radius: var(--radius);
		padding: 1rem 1.5rem;
		font-size: 1rem;
		color: var(--clr-text);
		transition: border-color 0.15s, box-shadow 0.15s;
		resize: none;
	}

	.field input::placeholder,
	.field textarea::placeholder {
		color: rgba(197, 201, 172, 0.45);
	}

	.field input:focus,
	.field textarea:focus {
		outline: none;
		border-color: var(--clr-accent);
		box-shadow: 0 0 0 1px var(--clr-accent), var(--glow);
	}

	.contact-info-col {
		padding: clamp(2rem, 4vw, 3rem);
		background: rgba(19, 19, 19, 0.5);
		border-left: 1px solid var(--clr-surface-variant);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 2rem;
	}

	.contact-info-col h3 {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--clr-text);
		margin-bottom: 1.5rem;
	}

	.contact-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.contact-list li {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		color: var(--clr-muted);
	}

	.contact-icon {
		color: var(--clr-accent);
	}

	.contact-strong {
		font-size: 0.875rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		color: var(--clr-text);
	}

	.contact-link:hover {
		color: var(--clr-accent);
	}

	.map-placeholder {
		height: 16rem;
		border-radius: var(--radius-md);
		border: 1px solid var(--clr-surface-variant);
		background: var(--clr-bg);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		color: var(--clr-muted);
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 0.05em;
	}

	.map-placeholder .icon {
		width: 2.5rem;
		height: 2.5rem;
	}

	/* ---------- footer ---------- */
	.footer-logo {
		display: flex;
	}

	.footer-logo-img {
		height: 3.5rem;
		width: auto;
	}

	.site-footer {
		background: var(--clr-surface-lowest);
		border-top: 1px solid var(--clr-surface-variant);
		margin-top: var(--section-gap);
	}

	.footer-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 2rem;
		padding-block: 3rem;
	}

	.footer-credit-link {
		color: var(--clr-muted);
		transition: color 0.15s;
	}

	.footer-credit-link:hover {
		color: var(--clr-accent);
	}

	.footer-copy {
		color: var(--clr-muted);
		text-align: right;
		font-size: 1rem;
	}

	.footer-fine {
		font-size: 0.75rem;
		opacity: 0.7;
	}

	/* ---------- responsive ---------- */
	@media (max-width: 900px) {
		.about-grid,
		.service-grid,
		.contact-panel {
			grid-template-columns: 1fr;
		}

		.review-grid,
		.gallery {
			grid-template-columns: 1fr 1fr;
		}

		.about-visual {
			min-height: 280px;
		}

		.contact-info-col {
			border-left: none;
			border-top: 1px solid var(--clr-surface-variant);
		}

		.trust-banner {
			flex-direction: column;
			align-items: flex-start;
		}

		.footer-inner {
			flex-direction: column;
			text-align: center;
		}

		.footer-copy {
			text-align: center;
		}
	}

	@media (max-width: 1100px) {
		.nav-contact-link:last-child {
			display: none;
		}
	}

	@media (max-width: 768px) {
		.nav-list,
		.nav-contact {
			display: none;
		}

		.menu-toggle {
			display: block;
		}

		.mobile-nav {
			display: flex;
		}
	}

	@media (max-width: 560px) {
		.review-grid,
		.gallery,
		.field-row,
		.stats {
			grid-template-columns: 1fr;
		}

		.hero {
			min-height: 70vh;
		}
	}
</style>
