# Local font plan — Vazirmatn

Phase 0 inspection confirms the existing variable WOFF2 is **Vazirmatn 33.003**, weight axis 100–900/default400. Coverage inspected for Persian letters/Arabic punctuation/ZWNJ, Persian and Latin digits/Latin sample. Its SHA256 matches the official v33.003 file exactly. OFL exists next to it. Evidence: `evidence/font-inspection.json`; source: https://github.com/rastikerdar/vazirmatn.

No font replacement is needed. Change the current next/font/local `display: optional` to v2-required `swap` only in foundation and re-measure; keep preload, weight100900/style normal and `--font-vazirmatn` on html. Next 16.3.8 docs explicitly support local fallback strings and adjustFontFallback Arial/Times New Roman/false. Plan sensible system/Tahoma/Arial fallback plus Tailwind @theme inline inheritance. No Google font import/CDN/external runtime request.

Persian UI numbers: Intl.NumberFormat('fa-IR'); dates: Intl.DateTimeFormat('fa-IR-u-ca-persian',{timeZone:'Asia/Tehran'}). Store UTC. Phone/OTP/email inputs LTR with appropriate inputMode and tabular figures. Persian joining/ZWNJ, no letter spacing; balanced headings and pretty paragraphs with support fallback; body leading near1.9. Test real Persian sample, both themes and widths320/390/768/1280/1440, no FOUT/CLS beyond budgets. Font-only own-origin/load/computed-style check in real app, not generic harness.

OG: verify ImageResponse supported font formats and connected Persian shaping; WOFF2 cannot be assumed supported. If shaping unsupported, use Playwright HTML+the same local font to pre-render safe static OG assets for actual owner-entered titles; no fake author/date/rating. Screenshot generator belongs to manifest and needs build/update invalidation.

Font inspection tools (fontTools + Brotli) were used only in sandbox tooling, not added as application dependencies. The browser/network/OG checks are not run in Phase 0.
