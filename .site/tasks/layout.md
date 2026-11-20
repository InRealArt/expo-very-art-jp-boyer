# Task: layout
Project root: /home/gilles/DEV/IN_REAL_ART/expo-very-art-jp-boyer. Read `.site/design.md`, `.site/meta.json`, `src/styles/tokens.css`, `src/app/layout.tsx`, `src/app/globals.css`.
Do:
- In `src/app/layout.tsx`: load the design's fonts (Playfair Display, Plus Jakarta Sans) through next/font/google with `variable: "--font-playfair"` and `variable: "--font-jakarta"` (tokens.css expects these names); remove Geist; put both variables on `<html>`.
- `<html lang>` and `metadata` title/description from `.site/meta.json`; add `data-scroll-behavior="smooth"` on `<html>`.
- Import `src/styles/tokens.css` (in layout.tsx or via globals.css after tailwindcss). Keep the `@import "../styles/base.css"` line in `src/app/globals.css`. Remove the default Geist/dark-mode/Arial leftovers in globals.css; body uses tokens (paper background, ink-text color, body font).
- Do not touch other files.
