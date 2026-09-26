# Personal research portal

Public landing page and dashboard library for `https://phuazz.github.io/`.

## Sources

- `index.html`: landing page and featured tools.
- `dashboards.html`: library, search, task/theme filters and personal research philosophy.
- `catalogue.js`: shared catalogue, categories and task assignments. Both homepage dashboard totals and its theme total derive from this file. Add tools here, not in a second list.
- `scripts/check_catalogue.js`: local pre-publication check for catalogue records, public destinations and count bindings.
- `favicon.svg`, `og-image.png`: existing identity and sharing assets.

No build is required. GitHub Pages publishes the root of `main`. Run `npx --no-install serve . -l 4171` from this directory for a local preview. Relative script paths allow direct local-file use as well as HTTP serving.

## Catalogue maintenance

Add a record with category (`c`), title (`t`), URL (`u`), tags, description (`d`) and task (`task`: `monitor`, `research` or `plan`). Task labels describe purpose, not freshness, live execution or current production status. Do not infer freshness from a successful page load, a recent Git commit or a task label. Keep summaries concise and omit fixed universe counts that would require a second maintenance process.

Search and filters persist in the URL using `q`, `theme` and `task`. Unknown task or theme values fall back to all. The catalogue contains public links only; private integration layers and family records should not be added simply because a local project exists.

## Validation

Before each release, run `node scripts/check_catalogue.js`, `node --check catalogue.js` and `python C:/dev/scripts/check_page.py index.html dashboards.html`. The catalogue check rejects unknown categories or tasks, duplicate titles or URLs, incomplete records, non-portal destinations and missing catalogue-backed totals. Run `node scripts/check_catalogue.js --selftest` after changing the guard. Then measure actual browser viewports at 390, 844, 768 and 1280 px, including each task/theme filter and the mobile menu. Search, no-results recovery, reload persistence and keyboard navigation should work. No investment calculations or strategy data are held in this repository.

The catalogue includes the Breadth-Thrust ETF research engine, its detailed Multi-Strategy Portfolio paper monitor, and the separate plain-language Portfolio Overview. These are distinct public views of related research.

Local release handovers are saved under `handoffs/`, which is excluded from publication.
