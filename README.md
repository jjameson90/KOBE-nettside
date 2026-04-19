# KOBE — Karl Ove Bjørnstad Eiendom

Moderne redesign av [kobe.no](https://kobe.no) — et helstatisk nettsted uten byggesteg. Alt innhold fra den opprinnelige siden er bevart, men presentert i en oppdatert editorial / arkitektonisk visuell identitet med animasjoner.

## Designgrep

- **Typografi:** Fraunces (serif, variable) til overskrifter, Inter til brødtekst, JetBrains Mono til labels.
- **Palett:** Varm off-white bakgrunn, dyp carbon-svart tekst, bronse-accent.
- **Layout:** Editorial grid, stor whitespace, store H1-er, marquee, featured prosjektkort med arkitektonisk rutenett.
- **Animasjoner:** Scroll-reveal via IntersectionObserver, GSAP + ScrollTrigger, Lenis for smooth scroll, custom magnetic cursor, projekt-tilt på hover, menu overlay.
- **Teknikk:** Ren HTML + CSS + vanilla JS. Avhengigheter lastes kun fra CDN (Lenis, GSAP, Google Fonts).

## Sider

| Side | Fil |
| --- | --- |
| Hjem | `index.html` |
| Entreprenør | `entreprenor.html` |
| Eiendom | `eiendom.html` |
| Service | `service.html` |
| Prosjekter | `prosjekter.html` |
| Ansatte | `ansatte.html` |
| Nyheter | `nyheter.html` |
| Kontakt | `kontakt.html` |

## Kjøre lokalt

Åpne `index.html` i en nettleser — ingen buildsteg kreves. For å teste på en lokal server:

```bash
python3 -m http.server 8000
# eller
npx serve .
```

## Deploy

Siden er statisk og kan deployes rett til:

- GitHub Pages
- Vercel (drag &amp; drop mappen)
- Netlify (drag &amp; drop mappen)
- Enhver vanlig webhotell

## Struktur

```
/
├─ index.html              # Hjem
├─ entreprenor.html        # Entreprenør
├─ eiendom.html            # Eiendom
├─ service.html            # KOBE Service
├─ prosjekter.html         # Prosjekter
├─ ansatte.html            # Team
├─ nyheter.html            # Nyhetsarkiv
├─ kontakt.html            # Kontakt
└─ assets/
   ├─ css/styles.css       # Design system + komponenter
   └─ js/main.js           # Animasjoner &amp; interaksjoner
```

## Bevarte informasjonselementer

- Selskapsstruktur (Karl-Ove Bjørnstad Eiendom AS · Karl-Ove Bjørnstad AS · KOBE Service AS)
- Historikk: Karl-Ove startet som murer på 60-tallet, eiendoms­selskapet grunnlagt 1975, generasjonsskifte 2016 (Mikal Bjørnstad).
- Motto: _Kvalitet og beliggenhet_
- Tjenester: Totalentreprise, boligutvikling, kombinasjonsbygg, utleie (bolig &amp; næring), bygningsfornyelse, murerarbeid, brannsikring, arborist m.m.
- Portefølje: 300+ leiligheter sentralt i Trondheim (Møllenberg / Buran).
- Prosjekter: Via Rosendal, Nedre Møllenberg 99/101, Saksvik Øvre.
- Team: Mikal · Line · Kathrin Bjørnstad, Kim Sandberg, Tor Inge Våge, Kim Hansen, Trond Erntsen.
- Kontakt: post@kobe.no · 739 91 960 · Fjordgata 80, Trondheim · Bratsbergvegen 23 (Service).
