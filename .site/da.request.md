# Design brief in natural language

Description from the user:

> Galerie d'art sobre : fond ivoire chaud (#FAF9F8), texte presque noir, un seul accent or (#805F19, #C9A961 sur fond sombre), titres en Playfair Display, corps en Plus Jakarta Sans, angles droits, cartes blanches fines bordures, boutons noirs en capitales espacées.

Turn it into a design profile and write it to `.site/da.json`.
Reply with JSON only, no comment. It is validated by `scripts/da/schema.mjs`: unknown fields and non-hex colors are refused.

Keys: `source` (set it to the text type, it is overwritten anyway), `mood`, `colors` (name to "#rrggbb"), `fonts` (`display`, `body`, `extra` as a list of family names), `easings` (CSS cubic-bezier strings), `components` (class name to CSS declarations), `warnings` (list of strings, empty is fine).

Fonts must be families available through next/font. Pick real hex values, not color names.

Valid example:

```json
{
  "source": {
    "type": "text",
    "ref": "Galerie d'art sobre : fond ivoire chaud (#FAF9F8), texte presque noir, un seul accent or (#805F19, #C9A961 sur fond sombre), titres en Playfair Display, corps en Plus Jakarta Sans, angles droits, cartes blanches fines bordures, boutons noirs en capitales espacées."
  },
  "mood": "one short sentence describing the overall feeling",
  "colors": {
    "ink": "#161412",
    "paper": "#f5f2ec",
    "accent": "#9a3b2e"
  },
  "fonts": {
    "display": "Playfair Display",
    "body": "Inter",
    "extra": []
  },
  "easings": [
    "cubic-bezier(0.16, 1, 0.3, 1)"
  ],
  "components": {
    "card": "border: 1px solid rgba(0,0,0,0.08)"
  },
  "warnings": []
}
```
