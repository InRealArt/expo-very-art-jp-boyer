# Design — Jean-Paul Boyer × Very Art Gallery

Mood : galerie sobre et silencieuse. Ivoire chaud, encre presque noire, un seul accent or, serif élégant, angles droits. Les sculptures (acier laqué, lames, volutes) portent la couleur ; l'interface reste en retrait.

Sources : `brief.yaml` (prioritaire), `.site/da.json` (profil texte), `.site/tokens.json` (template). Les valeurs du brief et du profil coïncident (palette, polices, rayon nul, motion subtle) ; aucun arbitrage n'a été nécessaire. Toutes les valeurs de couleur sont écrites uniquement dans `src/styles/tokens.css`.

## Palette

| Token | Valeur | Rôle |
|---|---|---|
| `--color-paper` | `#FAF9F8` | Fond de page (ivoire chaud) |
| `--color-paper-deep` | `#F5F4F0` | Fond alterné de sections, footer |
| `--color-surface` | `#FFFFFF` | Cartes, champs de formulaire |
| `--color-ink` | `#0F0E0D` | Titres, boutons, fond sombre (acquerir) |
| `--color-ink-text` | `#3D3A36` | Texte courant |
| `--color-ink-soft` | `#6F6A63` | Légendes, labels secondaires, métadonnées |
| `--color-line` | `#E4E1DA` | Bordures fines, filets |
| `--color-accent` | `#805F19` | Seul accent : liens, focus, hover, surtitres, sur fond clair |
| `--color-accent-light` | `#C9A961` | Accent sur fond `ink` uniquement |
| `--color-error` | `#A3301B` | Erreurs de formulaire |
| `--color-error-strong` | `#8A2E1C` | Bordure d'erreur au focus |
| `--color-error-tint` | `#FBF2F0` | Fond de message d'erreur |
| `--color-on-ink-soft` | `color-mix(oklab, paper 72 %, ink)` | Texte secondaire sur `ink` |
| `--color-on-ink-line` | `color-mix(oklab, paper 16 %, ink)` | Filets sur `ink` |

Couleurs hors profil : les trois `--color-error*` ne sont pas dans le profil. Elles comblent le rôle « erreur » du formulaire et sont reprises telles quelles de `.site/tokens.json` (template), non inventées. Les deux `--color-on-ink-*` sont des mélanges de couleurs du profil. `#2A2724` (template) n'a pas de rôle et n'est pas repris.

Contrastes (WCAG AA vérifié) : ink-text/paper ≈ 10,8:1 ; ink-soft/paper ≈ 5,1:1 ; accent/paper ≈ 5,6:1 ; accent/paper-deep ≈ 5,4:1 ; accent/surface ≈ 5,9:1 ; accent-light/ink ≈ 8,6:1 ; paper/ink ≈ 18:1 ; error/paper ≈ 6,7:1 ; error/error-tint ≈ 6,3:1 ; paper sur accent (bouton au hover) ≈ 5,6:1. Interdit : `accent-light` sur fond clair (≈ 2,2:1) ; `accent` sur `ink` (≈ 3,3:1).

## Typographie

- Display : **Playfair Display** via `next/font/google`, `variable: "--font-playfair"`, poids 400, 500 et italique 400. Titres, chiffres clés, prix, citations.
- Body : **Plus Jakarta Sans** via `next/font/google`, `variable: "--font-jakarta"`, poids 400, 500, 600. Texte, labels, boutons, nav.
- Les classes `.variable` de next/font sont posées sur `<html>` ; `tokens.css` (`@theme inline`) mappe `--font-display` et `--font-body` dessus (utilitaires `font-display`, `font-body`). Aucun `<link>` vers un hébergeur de polices.
- Échelle (base 16 px, ratio 1,25) : 12 `--text-overline` (surtitre, bouton) / 14 `--text-caption` / 16 texte / 20 `--text-lead` / 25 `--text-h3` / 31→39 `--text-h2` / 39→61 `--text-figure` / 49→76 `--text-display` (h1, `clamp`).
- Titres : Playfair 400, interlignage 1,1, approche -0,01em. Le nom « Jean-Paul / Boyer » du hero sur deux lignes, la seconde en italique.
- Surtitres (« Exposition · Sculpture », « L'exposition », « FAQ »…) : classe `.overline` — Jakarta 600, 12 px, capitales, approche 0,18em, `accent`.
- Texte courant : 16–17 px, interlignage 1,65, mesure 65ch max, `ink-text`.

## Espacement et mise en page

- Rythme : 4 / 8 / 16 / 24 / 40 / 64 / 96 / 144 px. Sections : 96 px vertical mobile, 144 px desktop.
- Conteneur `--container-site` 1200 px, gouttière 24 px mobile / 40 px desktop. Grille 12 colonnes, compositions asymétriques (7/5, 5/7, décalage d'une colonne), jamais trois cartes identiques centrées par défaut.
- Rayon : 0 partout (`--radius-none`). Pas d'ombre, pas de dégradé. Séparations par filets `line` 1 px.
- Structure et textes du template conservés à l'identique ; seule l'apparence change.

## Composants (depuis `components` du profil)

- `.card` (profil `card`) : fond `surface`, bordure 1 px `line`, rayon 0, aucune ombre. `.card-hover` : bordure `ink-soft`, translation -2 px, 300 ms sur l'ease du site.
- `.btn` (profil `btn`) : fond `ink`, texte `paper`, bordure 1 px `ink`, Jakarta 600 12 px capitales, approche 0,18em, padding 16×32, rayon 0. Hover : fond et bordure `accent`. Focus : outline 2 px `accent`, offset 3 px.
- `.btn-ghost` : transparent, bordure et texte `ink` ; hover fond `ink`, texte `paper`.
- `.link` (profil `link`) : `accent`, soulignement décalé 0,2em ; hover épaisseur 2 px.
- `.overline`, `.rule` (filet `line`), `.rule-accent` (filet court 48 px `accent`).
- `.field` : fond `surface`, bordure `line`, rayon 0 ; focus bordure `accent` ; `aria-invalid` bordure `error` (`error-strong` au focus) ; `.field-error` texte `error` sur `error-tint`.
- `.on-ink` : fond `ink`, texte `paper` ; surtitres et liens `accent-light`, filets `on-ink-line`, `.btn` inversé (fond `paper`, hover `accent-light`).

## Sections

- **misc** (lien d'évitement, header, nav, footer) — fond `paper`, header fixe avec filet bas `line`, nav Jakarta 13 px, CTA « Je m'inscris » en `.btn` compact. Footer sur `paper-deep`, texte `ink-soft`, « Mentions légales » en `.link`. Motion : none.
- **hero** — fond `paper`. Grille 7/5 : à gauche surtitre, nom en `--text-display` (« Boyer » en italique), titre d'exposition, chapô, liste Dates / Lieu / Vernissage en trois colonnes séparées de filets, `.btn`. À droite l'image « Triple volute » en pleine hauteur, légende `ink-soft` 14 px. Motion : none (pas de retard sur le LCP).
- **l-exposition** — fond `paper`. Titre colonnes 1–5, texte colonnes 7–12. Chiffres clés (5 / 5 / ≈ 1 000) en Playfair `--text-figure`, séparés par des filets verticaux. Motion : split (titre), reveal (texte et chiffres, délai croissant 0,06 s).
- **mosaique** — fond `paper-deep`. Œuvre phare en grand (image 7 colonnes) avec fiche technique en `.card` (Artiste / Référence / Matière / Hauteur / Prix / Statut séparés de filets, prix en Playfair). Puis « Œuvres présentées » en mosaïque irrégulière (tailles alternées) : image, titre Playfair, ligne technique `ink-soft`, prix. Motion : split (titre « Œuvres présentées »), reveal (cartes, délai 0,06 → 0,3 s).
- **l-artiste** — fond `paper`. Image 5 colonnes, texte 6 colonnes décalé. Chronologie (1942 / Débuts / Atelier / 2026) en liste verticale à filets, repères en Playfair `accent`. Motion : split (titre), reveal (texte, chronologie).
- **regards** — fond `paper-deep`. Première citation (Timothée Roy) en grand, Playfair italique 31 px, pleine largeur ; les deux autres plus petites en `.card`, décalées verticalement. Initiales dans un carré bordé `line`. Motion : reveal.
- **acquerir** — fond `ink`, classe `.on-ink` : texte `paper`, secondaire `on-ink-soft`, surtitre et numéros 01/02/03 en `accent-light`, filets `on-ink-line`. Trois étapes en liste horizontale numérotée, largeurs inégales, sans cartes. Motion : split (titre), reveal (étapes).
- **visite** — fond `paper`. Liste de définitions sur 2 colonnes (Adresse, Dates, Horaires, Vernissage, Accès, Contact) à gauche, carte Google Maps à droite cadrée d'un filet `line`, rayon 0. Motion : reveal (liste) ; la carte sans animation.
- **inscription** — fond `paper-deep`. Intro 5 colonnes, formulaire en `.card` 7 colonnes, champs `.field`, labels Jakarta 600 13 px `ink`, consentement et mentions 14 px `ink-soft`, `.btn` pleine largeur sur mobile. Message de succès en Playfair. Motion : none.
- **faq** — fond `paper`. Titre à gauche (4 colonnes), questions à droite (8 colonnes) en `<details>` séparés de filets `line`, question en Playfair 20 px, signe +/− en `accent`. Motion : none.

## Motion

- Niveau : `subtle` (brief) — 16 px, durée de base, stagger 0,06.
- Ease : `cubic-bezier(0.16, 1, 0.3, 1)` (profil) → GSAP `expo.out` ; une seule courbe pour tout le site, CSS compris (`--ease-gallery`).
- Durée : 0,8 s pour les entrées GSAP, 300 ms (`--duration-hover`) pour les transitions CSS.
- Uniquement `opacity` et transformations, une seule lecture, dans `gsap.matchMedia()` avec `(prefers-reduced-motion: no-preference)` ; sans JS ou en mouvement réduit, le contenu est affiché.

## Avertissements du profil

- Profil issu d'une description texte : seules les valeurs citées sont certaines ; les teintes secondaires (paper-deep, ink-text, ink-soft, line) viennent du brief et concordent avec le template.
