<script lang="ts">
	// let activeFilter = $state('Všetky');
	let activeSection = $state('domov');
	let cookieConsent = $state<string | null>(null);
	let privacyOpen = $state(false);

	$effect(() => {
		cookieConsent = localStorage.getItem('cookie-consent');
	});

	function acceptCookies() {
		cookieConsent = 'accepted';
		localStorage.setItem('cookie-consent', 'accepted');
	}

	function declineCookies() {
		cookieConsent = 'declined';
		localStorage.setItem('cookie-consent', 'declined');
	}

	const navItems = [
		{ id: 'domov', label: 'Domov' },
		{ id: 'o-nas', label: 'O nás' },
		{ id: 'sluzby', label: 'Služby' },
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

	// Referencie – hidden until photos are ready
	// const filters = ['Všetky', 'Bleskozvod', 'Hrubá stavba', 'Podlahové kúrenie', 'Rozvádzač'];
	// const projects = [
	// 	{ category: 'Rozvádzač', title: 'Priemyselný rozvádzač' },
	// 	{ category: 'Hrubá stavba', title: 'Kabeláž novostavby' },
	// 	{ category: 'Podlahové kúrenie', title: 'Elektrické rohože' },
	// 	{ category: 'Bleskozvod', title: 'Ochrana pred bleskom' },
	// 	{ category: 'Bleskozvod', title: 'Základový zemnič' },
	// 	{ category: 'Rozvádzač', title: 'Bytový rozvádzač' }
	// ];

	let formName = $state('');
	let formEmail = $state('');
	let formPhone = $state('');
	let formMessage = $state('');
	let formStatus = $state<'idle' | 'loading' | 'success' | 'error'>('idle');

	async function submitContact(e: SubmitEvent) {
		e.preventDefault();
		formStatus = 'loading';
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: formName, email: formEmail, phone: formPhone, message: formMessage })
			});
			formStatus = res.ok ? 'success' : 'error';
		} catch {
			formStatus = 'error';
		}
	}

	const reviews = [
		{
			text: '„Rýchla komunikácia, precízna práca a nič navyše. Elektrické rozvody v novostavbe hotové za pár dní, všetko na prvý pohľad. Odporúčam."',
			author: 'Petra, Trnava'
		},
		{
			text: '„Mladí chlapci, ale vedia čo robia. Ocenili sme ochotu poradiť a vysvetliť každý krok. Bleskozvod na rodinnom dome zvládli bez problémov."',
			author: 'Marek, Hlohovec'
		},
		{
			text: '„S výsledkom sme maximálne spokojní. Všetko dohodnuté, hotové načas a upratané po sebe. Elektrina v dome konečne funguje tak, ako má."',
			author: 'Katarína, Leopoldov'
		}
	];

	// const visibleProjects = $derived(
	// 	activeFilter === 'Všetky' ? projects : projects.filter((p) => p.category === activeFilter)
	// );
</script>

<svelte:head>
	<title>WireCore | Elektroinštalácie, Bleskozvody, Fotovoltika – Trnavský kraj</title>
	<meta
		name="description"
		content="WireCore – profesionálne elektroinštalácie, bleskozvody a fotovoltika v Trnavskom kraji. Bezplatná konzultácia, práca na kľúč. Kontakt: +421 917 951 473."
	/>
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://wirecore.sk/" />

	<!-- Local SEO -->
	<meta name="geo.region" content="SK-TA" />
	<meta name="geo.placename" content="Žlkovce, Trnavský kraj" />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://wirecore.sk/" />
	<meta property="og:title" content="WireCore | Elektroinštalácie, Bleskozvody, Fotovoltika" />
	<meta
		property="og:description"
		content="Profesionálne elektroinštalácie, bleskozvody a fotovoltika v Trnavskom kraji. Bezplatná konzultácia, práca na kľúč."
	/>
	<meta property="og:image" content="https://wirecore.sk/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:locale" content="sk_SK" />
	<meta property="og:site_name" content="WireCore" />

	<!-- Twitter / X -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="WireCore | Elektroinštalácie, Bleskozvody, Fotovoltika" />
	<meta
		name="twitter:description"
		content="Profesionálne elektroinštalácie, bleskozvody a fotovoltika v Trnavskom kraji. Bezplatná konzultácia."
	/>
	<meta name="twitter:image" content="https://wirecore.sk/og-image.png" />

	<!-- JSON-LD structured data -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "ElectricalContractor",
		"name": "WireCore s.r.o.",
		"description": "Profesionálne elektroinštalácie, bleskozvody, slaboprúd a fotovoltika v Trnavskom kraji.",
		"url": "https://wirecore.sk",
		"telephone": "+421917951473",
		"email": "info@wirecore.sk",
		"inLanguage": "sk",
		"address": {
			"@type": "PostalAddress",
			"streetAddress": "Žlkovce 313",
			"postalCode": "920 42",
			"addressLocality": "Žlkovce",
			"addressRegion": "Trnavský kraj",
			"addressCountry": "SK"
		},
		"areaServed": {
			"@type": "AdministrativeArea",
			"name": "Trnavský kraj"
		},
		"serviceType": [
			"Elektroinštalácie",
			"Silnoprúd",
			"Slaboprúd",
			"Bleskozvody",
			"Uzemnenie",
			"Fotovoltika"
		],
		"legalName": "WireCore s.r.o.",
		"taxID": "2122864370",
		"image": "https://wirecore.sk/og-image.png",
		"logo": "https://wirecore.sk/og-image.png"
	}
	<\/script>`}
</svelte:head>

<!-- iconBolt snippet – used by Referencie section, restore when uncommenting
{#snippet iconBolt(cls: string = 'icon')}
	<svg class={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
		<path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
	</svg>
{/snippet}
-->

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
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>

			<div class="nav-contact">
				<a href="tel:+421917951473" class="nav-contact-link">
					<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
					</svg>
					<span class="nav-contact-text">+421 917 951 473</span>
				</a>
				<a href="mailto:info@wirecore.sk" class="nav-contact-link">
					<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-10 5L2 7" />
					</svg>
					<span class="nav-contact-text">info@wirecore.sk</span>
				</a>
			</div>
			<a href="#kontakt" class="nav-kontakt-btn">Kontakt</a>
		</div>
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
					Precízne <span class="accent">elektroinštalácie</span><br>od návrhu po realizáciu
				</h1>
				<p class="hero-lead">
					Realizujeme kompletné elektroinštalačné práce — od prvého návrhu až po finálnu
					realizáciu, s dôrazom na bezpečnosť, precíznosť a dlhú životnosť každého riešenia.
				</p>
				<div class="hero-actions">
					<a href="#sluzby" class="btn btn-primary">
						Naše Služby
						<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M12 5v14" /><path d="m19 12-7 7-7-7" />
						</svg>
					</a>
					<div class="deal-wrap">
						<span class="deal-badge">Bez záväzkov</span>
						<a href="#kontakt" class="btn btn-deal">Konzultácia Zadarmo</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- O nás -->
	<section class="about" id="o-nas" aria-labelledby="about-heading">
		<div class="container about-grid">
			<div class="about-visual">
				<img src="/images/person.webp" alt="Elektrikár WireCore pri práci" class="about-img" loading="lazy" />
			</div>
			<div class="about-text">
				<h2 id="about-heading" class="section-title">
					Mladý tím s profesionálnym prístupom
				</h2>
				<p>
					Sme dynamická partia elektrikárov, ktorí robia svoju prácu s nadšením a záujmom o každý
					detail. Nezaťažujeme sa starými zvykmi a hľadáme vždy to najlepšie a najčistejšie
					riešenie pre každého klienta.
				</p>
				<p>
					Či ide o rodinný dom alebo komerčnú prevádzku, každý projekt berieme osobne a stojíme
					si za kvalitou svojej práce.
				</p>
				<div class="about-tags">
					<div class="about-tag">
						<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
						</svg>
						5+ rokov skúseností
					</div>
					<div class="about-tag">
						<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>
						</svg>
						20+ projektov
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Služby -->
	<section class="services" id="sluzby" aria-labelledby="services-heading">
		<div class="container">
			<h2 id="services-heading" class="section-title center">Komplexné riešenia pre každé napätie</h2>

			<div class="service-grid">
				<article class="service-card">
					<img src="/images/high-voltage.webp" alt="" class="service-card-bg" aria-hidden="true" loading="lazy" />
					<div class="service-icon">
						<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M12 2v10" /><path d="M18.4 6.6a9 9 0 1 1-12.77.04" />
						</svg>
					</div>
					<h3>Silnoprúd</h3>
					<p>
						Elektrické rozvody, rozvádzače a zásuvkové okruhy pre novostavby aj rekonštrukcie.
						Každý kábel na správnom mieste, každý spoj bezpečný.
					</p>
				</article>

				<article class="service-card">
					<img src="/images/low-voltage.webp" alt="" class="service-card-bg" aria-hidden="true" loading="lazy" />
					<div class="service-icon">
						<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M12 20h.01" /><path d="M5 12.86a10 10 0 0 1 14 0" /><path d="M8.5 16.43a5 5 0 0 1 7 0" /><path d="M2 8.82a15 15 0 0 1 20 0" />
						</svg>
					</div>
					<h3>Slaboprúd</h3>
					<p>
						Dátové siete, kamerové systémy, alarmy a prístupové systémy. Prepojíme váš priestor
						inteligentne a bez zbytočného chaosu.
					</p>
				</article>

				<article class="service-card">
					<img src="/images/lightning-rod.webp" alt="" class="service-card-bg" aria-hidden="true" loading="lazy" />
					<div class="service-icon">
						<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M6 16.33A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.97" /><path d="m13 12-3 5h4l-3 5" />
						</svg>
					</div>
					<h3>Bleskozvody a Uzemnenie</h3>
					<p>
						Chránime váš majetok pred bleskom a prepätím. Inštalujeme bleskozvody, uzemňovacie
						systémy a prepäťové ochrany na mieru.
					</p>
				</article>

				<article class="service-card">
					<img src="/images/photovoltaics.webp" alt="" class="service-card-bg" aria-hidden="true" loading="lazy" />
					<div class="service-icon">
						<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
						</svg>
					</div>
					<h3>Fotovoltika</h3>
					<p>
						Inštalujeme fotovoltické systémy, ktoré skutočne fungujú. Znížte účty za elektrinu
						a získajte energetickú nezávislosť.
					</p>
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

	<!-- Referencie – hidden until photos are ready
	<section class="portfolio" id="referencie" aria-labelledby="portfolio-heading">
		<div class="container">
			<h2 id="portfolio-heading" class="section-title center">Referencie</h2>

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
	-->

	<!-- Kontakt -->
	<section class="contact" id="kontakt" aria-labelledby="contact-heading">
		<div class="container">
			<div class="contact-panel">
				<div class="contact-info-col">
					<h3>Firemné údaje</h3>
					<p class="contact-sub">Zatiaľ nemáme pobočku, preto nás kontaktujte cez mail alebo mobil.</p>
					<ul class="contact-list">
						<li>
							<svg class="icon contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
							</svg>
							<div>
								<p class="contact-strong">WireCore s.r.o.</p>
								<p>Žlkovce 313<br />920 42 Trnavský kraj<br />Slovenská republika</p>
								<p style="margin-top: 0.5rem; font-size: 0.8rem;">IČO: 57644721<br />DIČ: 2122864370</p>
							</div>
						</li>
						<li>
							<svg class="icon contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
							</svg>
							<p><a href="tel:+421917951473" class="contact-link">+421 917 951 473</a></p>
						</li>
						<li>
							<svg class="icon contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-10 5L2 7" />
							</svg>
							<p><a href="mailto:info@wirecore.sk" class="contact-link">info@wirecore.sk</a></p>
						</li>
					</ul>

				{#if cookieConsent === 'accepted'}
					<iframe
						class="map-embed"
						src="https://maps.google.com/maps?q=Žlkovce+313,+920+42,+Slovensko&output=embed&z=11"
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
						title="WireCore – poloha"
					></iframe>
				{:else}
					<div class="map-consent">
						<p>Mapa využíva cookies od Google.<br />Prijmite cookies pre zobrazenie.</p>
						<button class="btn btn-primary" onclick={acceptCookies}>Zobraziť mapu</button>
					</div>
				{/if}
				</div>

				<div class="contact-form-col">
					<h2 id="contact-heading" class="section-title">Kontaktujte nás</h2>
					<p class="contact-sub">Máte projekt? Napíšte nám a my sa vám ozveme s návrhom riešenia.</p>
					<form onsubmit={submitContact}>
						<div class="field">
							<label for="name">Meno a priezvisko</label>
							<input id="name" name="name" type="text" bind:value={formName} placeholder="Ján Novák" autocomplete="name" required />
						</div>
						<div class="field-row">
							<div class="field">
								<label for="email">E-mail</label>
								<input id="email" name="email" type="email" bind:value={formEmail} placeholder="jan@example.com" autocomplete="email" required />
							</div>
							<div class="field">
								<label for="phone">Telefón</label>
								<input id="phone" name="phone" type="tel" bind:value={formPhone} placeholder="+421 900 000 000" autocomplete="tel" />
							</div>
						</div>
						<div class="field">
							<label for="message">Správa / Popis projektu</label>
							<textarea id="message" name="message" rows="4" bind:value={formMessage} placeholder="Ako vám môžeme pomôcť?" required></textarea>
						</div>
						{#if formStatus === 'success'}
							<p class="form-feedback form-success">Správa bola odoslaná. Ozveme sa vám čoskoro!</p>
						{:else if formStatus === 'error'}
							<p class="form-feedback form-error">Odoslanie zlyhalo. Skúste to znova alebo nás kontaktujte priamo.</p>
						{/if}
						<button type="submit" class="btn btn-primary btn-block" disabled={formStatus === 'loading' || formStatus === 'success'}>
							{formStatus === 'loading' ? 'Odosielam…' : 'Odoslať'}
						</button>
					</form>
				</div>
			</div>
		</div>
	</section>
</main>

{#if privacyOpen}
	<div class="privacy-backdrop" onclick={() => privacyOpen = false} onkeydown={(e) => e.key === 'Escape' && (privacyOpen = false)} role="presentation">
		<div class="privacy-modal" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Ochrana súkromia" tabindex="-1">
			<div class="privacy-header">
				<h2>Ochrana súkromia</h2>
				<button class="privacy-close" onclick={() => privacyOpen = false} aria-label="Zavrieť">
					<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
						<path d="M18 6 6 18"/><path d="m6 6 12 12"/>
					</svg>
				</button>
			</div>
			<div class="privacy-body">
				<h3>1. Správca údajov</h3>
				<p>WireCore s.r.o., Žlkovce 313, 920 42 Trnavský kraj, Slovenská republika<br/>IČO: 57644721 | info@wirecore.sk</p>

				<h3>2. Aké údaje zbierame</h3>
				<p>Prostredníctvom kontaktného formulára zbierame meno, e-mailovú adresu, telefónne číslo a obsah správy. Tieto údaje slúžia výlučne na zodpovedanie vašej požiadavky.</p>

				<h3>3. Cookies</h3>
				<p>Táto stránka používa cookies výlučne prostredníctvom služby Google Maps (Google Ireland Limited). Cookies tretích strán sa načítajú iba po vašom súhlase. Môžete ich kedykoľvek odmietnuť.</p>

				<h3>4. Uchovávanie údajov</h3>
				<p>Osobné údaje z kontaktného formulára uchovávame maximálne 12 mesiacov alebo do vybavenia vašej požiadavky, podľa toho, čo nastane skôr.</p>

				<h3>5. Vaše práva</h3>
				<p>Máte právo na prístup, opravu alebo vymazanie vašich osobných údajov. Žiadosť nám zašlite na info@wirecore.sk. V prípade sporu sa môžete obrátiť na Úrad na ochranu osobných údajov SR (uoou.sk).</p>
			</div>
		</div>
	</div>
{/if}

{#if cookieConsent === null}
	<div class="cookie-banner" role="dialog" aria-label="Súhlas s cookies">
		<p class="cookie-text">
			Táto stránka zbiera údaje z kontaktného formulára a používa cookies od Google Maps. Viac info v
			<button class="cookie-link" onclick={() => privacyOpen = true}>Ochrane súkromia</button>.
		</p>
		<div class="cookie-actions">
			<button class="btn btn-outline cookie-btn" onclick={declineCookies}>Odmietnuť</button>
			<button class="btn btn-primary cookie-btn" onclick={acceptCookies}>Prijať</button>
		</div>
	</div>
{/if}

<!-- Footer -->
<footer class="site-footer">
	<div class="container footer-inner">
		<a href="#domov" class="footer-logo" aria-label="WireCore">
			<img src="/logo.svg" alt="WireCore" class="footer-logo-img" />
		</a>
		<p class="footer-copy">
			&copy; {new Date().getFullYear()} WireCore s.r.o. Všetky práva vyhradené.<br />
<span class="footer-fine">Design, vývoj & hosting: Tomáš Bokor &mdash; <a href="mailto:tomasbokor.dev@gmail.com" class="footer-credit-link">tomasbokor.dev@gmail.com</a></span><br />
			<button onclick={() => privacyOpen = true} class="footer-fine footer-credit-link footer-privacy-btn">Ochrana súkromia</button>
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

	/* .section-title.accent-border, .section-sub – used by Referencie, restore when uncommenting
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
	*/

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

	.deal-wrap {
		position: relative;
		display: inline-flex;
	}

	.deal-badge {
		position: absolute;
		top: -1.9rem;
		left: 50%;
		transform: translateX(-50%);
		white-space: nowrap;
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--clr-on-accent);
		background: var(--clr-accent);
		padding: 0.2rem 0.65rem;
		border-radius: var(--radius-full);
	}

@keyframes pulse-ring {
		0%   { box-shadow: 0 0 0 0   rgba(217,255,0,0.55), var(--glow); }
		70%  { box-shadow: 0 0 0 10px rgba(217,255,0,0),   var(--glow); }
		100% { box-shadow: 0 0 0 0   rgba(217,255,0,0),    var(--glow); }
	}

	.btn-deal {
		border: 2px solid var(--clr-accent);
		color: var(--clr-text);
		background: rgba(217,255,0,0.08);
		animation: pulse-ring 2s ease-out infinite;
		transition: background-color 0.2s;
	}

	.btn-deal:hover {
		background-color: rgba(217,255,0,0.14);
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


	/* ---------- hero ---------- */
	.hero {
		position: relative;
		height: 100dvh;
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
		margin-bottom: 3.5rem;
	}

	.hero-actions {
		display: flex;
		align-items: center;
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
		overflow: hidden;
		border: 1px solid var(--clr-surface-variant);
	}

	.about-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top center;
		border-radius: var(--radius-xl);
	}

	.about-text p {
		color: var(--clr-muted);
		margin-bottom: 1.5rem;
	}

	.about-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 1rem;
	}

	.about-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		border: 1px solid var(--clr-surface-variant);
		border-radius: var(--radius-full);
		background: var(--clr-surface);
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--clr-muted);
	}

	.about-tag .icon {
		color: var(--clr-accent);
		width: 1.1rem;
		height: 1.1rem;
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
		position: relative;
		overflow: hidden;
		background: var(--clr-surface);
		border: 1px solid var(--clr-surface-variant);
		border-radius: var(--radius-md);
		padding: 2rem;
		min-height: 280px;
		display: flex;
		flex-direction: column;
		transition: border-color 0.4s, box-shadow 0.4s;
	}

	.service-card-bg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0.12;
		transition: opacity 0.4s;
	}

	.service-card:hover .service-card-bg {
		opacity: 0.2;
	}

	.service-card:hover {
		border-color: rgba(217, 255, 0, 0.5);
		box-shadow: 0 0 40px rgba(217, 255, 0, 0.06);
	}

	.service-icon {
		position: relative;
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
		position: relative;
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--clr-text);
		margin-top: 4rem;
		margin-bottom: 0.75rem;
	}

	.service-card p {
		position: relative;
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

	/* ---------- portfolio – hidden until photos are ready ----------
	.portfolio { padding-block: var(--section-gap); }
	.filters { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; margin-bottom: 3rem; }
	.chip { padding: 0.5rem 1.5rem; border: none; border-radius: var(--radius-full); background: var(--clr-surface); color: var(--clr-body); font-size: 0.875rem; font-weight: 600; letter-spacing: 0.05em; transition: background 0.15s, color 0.15s; }
	.chip:hover { background: var(--clr-surface-high); }
	.chip-active { background: var(--clr-accent); color: var(--clr-on-accent); font-weight: 700; }
	.gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
	.gallery-item { position: relative; aspect-ratio: 4 / 3; border-radius: var(--radius-md); overflow: hidden; background: var(--clr-surface); border: 1px solid var(--clr-surface-variant); display: flex; flex-direction: column; transition: border-color 0.3s; }
	.gallery-item:hover { border-color: rgba(217, 255, 0, 0.5); }
	.gallery-visual { flex: 1; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at 50% 40%, rgba(217, 255, 0, 0.06), transparent 65%), repeating-linear-gradient(-45deg, transparent 0, transparent 29px, rgba(255, 255, 255, 0.02) 29px, rgba(255, 255, 255, 0.02) 30px); }
	.gallery-bolt { width: 3rem; height: 3rem; color: rgba(217, 255, 0, 0.25); transition: color 0.3s, filter 0.3s; }
	.gallery-item:hover .gallery-bolt { color: rgba(217, 255, 0, 0.6); filter: drop-shadow(0 0 20px rgba(217, 255, 0, 0.3)); }
	.gallery-caption { padding: 1.25rem 1.5rem; background: linear-gradient(to top, rgba(14, 14, 14, 0.9), rgba(14, 14, 14, 0.4)); }
	.gallery-category { display: block; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--clr-accent); margin-bottom: 0.25rem; }
	.gallery-caption h3 { font-size: 1.25rem; font-weight: 600; color: var(--clr-text); }
	.portfolio-cta { margin-top: 3rem; text-align: center; }
	----------------------------------------------------------------------*/

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
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.contact-form-col .section-title {
		margin-bottom: 0;
	}

	.contact-sub {
		color: var(--clr-muted);
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
		border-right: 1px solid var(--clr-surface-variant);
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.contact-info-col h3 {
		font-size: clamp(1.75rem, 3.5vw, 2rem);
		font-weight: 700;
		line-height: 1.25;
		letter-spacing: -0.01em;
		color: var(--clr-text);
		margin: 0;
	}

	.contact-list {
		list-style: none;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.contact-list li {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		color: var(--clr-muted);
	}

	.contact-list li:first-child {
		grid-row: 1 / 3;
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

	.form-feedback {
		padding: 0.75rem 1rem;
		border-radius: 6px;
		font-size: 0.9rem;
		margin-bottom: 0.5rem;
	}

	.form-success {
		background: #d1fae5;
		color: #065f46;
	}

	.form-error {
		background: #fee2e2;
		color: #991b1b;
	}

	.map-embed {
		display: block;
		width: 100%;
		flex: 1;
		min-height: 10rem;
		border: none;
		border-radius: var(--radius-md);
	}

	@media (max-width: 900px) {
		.map-embed {
			flex: none;
			height: 12rem;
		}
	}

	/* ---------- cookie banner ---------- */
	.cookie-banner {
		position: fixed;
		bottom: 1.5rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 100;
		width: min(calc(100vw - 2rem), 680px);
		background: var(--clr-surface);
		border: 1px solid var(--clr-surface-variant);
		border-radius: var(--radius-md);
		padding: 1.25rem 1.5rem;
		display: flex;
		align-items: center;
		gap: 1.5rem;
		box-shadow: 0 8px 40px rgba(0,0,0,0.5);
	}

	.cookie-text {
		font-size: 0.875rem;
		color: var(--clr-muted);
		flex: 1;
	}

	.cookie-link {
		background: none;
		border: none;
		padding: 0;
		font-size: inherit;
		font-family: inherit;
		color: var(--clr-accent);
		text-decoration: underline;
		cursor: pointer;
	}

	.cookie-actions {
		display: flex;
		gap: 0.75rem;
		flex-shrink: 0;
	}

	.cookie-btn {
		padding: 0.5rem 1.25rem;
		font-size: 0.875rem;
	}

	.map-consent {
		flex: 1;
		min-height: 10rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		background: var(--clr-surface-low);
		border-radius: var(--radius-md);
		text-align: center;
		color: var(--clr-muted);
		font-size: 0.875rem;
		padding: 1.5rem;
	}

	@media (max-width: 560px) {
		.cookie-banner {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}
	}

	/* ---------- privacy modal ---------- */
	.privacy-backdrop {
		position: fixed;
		inset: 0;
		z-index: 200;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	.privacy-modal {
		background: var(--clr-surface);
		border: 1px solid var(--clr-surface-variant);
		border-radius: var(--radius-md);
		width: min(100%, 640px);
		max-height: 80dvh;
		display: flex;
		flex-direction: column;
		box-shadow: 0 16px 64px rgba(0, 0, 0, 0.6);
		outline: none;
	}

	.privacy-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.5rem 1.75rem;
		border-bottom: 1px solid var(--clr-surface-variant);
		flex-shrink: 0;
	}

	.privacy-header h2 {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--clr-text);
	}

	.privacy-close {
		background: none;
		border: none;
		padding: 0.25rem;
		color: var(--clr-muted);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-sm);
		transition: color 0.15s, background 0.15s;
	}

	.privacy-close:hover {
		color: var(--clr-text);
		background: var(--clr-surface-high);
	}

	.privacy-close .icon {
		width: 1.25rem;
		height: 1.25rem;
	}

	.privacy-body {
		overflow-y: auto;
		padding: 1.75rem;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.privacy-body h3 {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--clr-accent);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		margin-bottom: 0.25rem;
	}

	.privacy-body p {
		font-size: 0.9rem;
		color: var(--clr-body);
		line-height: 1.6;
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

	.footer-privacy-btn {
		background: none;
		border: none;
		padding: 0;
		font-size: inherit;
		text-decoration: underline;
		cursor: pointer;
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


		.review-grid {
			grid-template-columns: 1fr 1fr;
		}

		.review-card:last-child {
			display: none;
		}

		.about-visual {
			min-height: 280px;
		}

		.contact-info-col {
			border-right: none;
			border-bottom: 1px solid var(--clr-surface-variant);
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

	.nav-kontakt-btn {
		display: none;
		padding: 0.5rem 1.25rem;
		border-radius: var(--radius-full);
		background: var(--clr-accent);
		color: var(--clr-on-accent);
		font-size: 0.875rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		white-space: nowrap;
		transition: background 0.2s, box-shadow 0.2s;
	}

	.nav-kontakt-btn:hover {
		background: var(--clr-accent-dim);
		box-shadow: var(--glow);
	}

	@media (max-width: 1100px) {
		.nav-contact {
			display: none;
		}

		.nav-kontakt-btn {
			display: inline-block;
		}

		.nav-list a[href="#kontakt"] {
			display: none;
		}
	}

	@media (max-width: 768px) {
		.nav-list,
		.nav-contact {
			display: none;
		}

		.nav-kontakt-btn {
			display: inline-block;
		}
	}

	@media (max-width: 560px) {
		.review-grid,
		.field-row {
			grid-template-columns: 1fr;
		}

		.contact-list {
			grid-template-columns: 1fr;
		}

		.contact-list li:first-child {
			grid-row: auto;
		}

		.hero-actions .btn {
			padding: 0.875rem 1.25rem;
			font-size: 0.8125rem;
		}
	}
</style>
