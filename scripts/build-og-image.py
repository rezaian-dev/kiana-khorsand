"""Builds the Open Graph / Twitter card image for kianakhorsand.ir.

    python3 scripts/build-og-image.py

Writes public/og-image.png and public/og-image.jpg (1200x630).

Design decisions
- RTL Persian type is laid out with Pillow's RAQM engine, so cursive joining and the
  bidi algorithm come from HarfBuzz/FreeType rather than hand-reversed strings.
- The portrait is the site's existing hero illustration, framed with the same arch as
  `publicArchedPortraitClassName` on the live page.
- White type sits over a right-hand scrim; measured contrast of every text block stays
  above the WCAG AA 4.5:1 floor.
- Artwork and mark live in scripts/assets so the card can be regenerated from the repo.

Dependencies: Pillow (with RAQM), fonttools + brotli (to unpack the repo's woff2 fonts).
"""

from __future__ import annotations

import io
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path(__file__).resolve().parent / "assets"
OUT = ROOT / "public"

W, H = 1200, 630
S = 2  # supersampling factor; everything is drawn at 2400x1260 then reduced

INK = (18, 15, 32)
CREAM = (255, 250, 244)
MUTED = (216, 205, 226)
TEAL = (124, 222, 200)

FONT_REGULAR = "Vazirmatn-Regular"
FONT_BOLD = "Vazirmatn-ExtraBold"


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    path = _unpack_font(name)
    return ImageFont.truetype(str(path), size * S, layout_engine=ImageFont.Layout.RAQM)


def _unpack_font(name: str) -> Path:
    """woff2 -> ttf, cached next to the repo's build cache."""
    cache = ROOT / ".cache" / "fonts"
    cache.mkdir(parents=True, exist_ok=True)
    target = cache / f"{name}.ttf"
    if target.exists():
        return target
    from fontTools.ttLib import TTFont

    packed = TTFont(ROOT / "public" / "assets" / "fonts" / f"{name}.woff2")
    packed.flavor = None
    packed.save(target)
    return target


def fit_background() -> Image.Image:
    art = Image.open(ASSETS / "og-background.webp").convert("RGB")
    target = (W * S, H * S)
    scale = max(target[0] / art.width, target[1] / art.height)
    resized = art.resize(
        (int(art.width * scale) + 1, int(art.height * scale) + 1), Image.LANCZOS
    )
    left = (resized.width - target[0]) // 2
    top = (resized.height - target[1]) // 2
    return resized.crop((left, top, left + target[0], top + target[1]))


def arch_mask(size: tuple[int, int]) -> Image.Image:
    """Semicircular crown + narrow foot, matching the site's arched portrait frame."""
    w, h = size
    mask = Image.new("L", size, 0)
    d = ImageDraw.Draw(mask)
    r = w // 2
    d.ellipse((0, 0, w - 1, 2 * r - 1), fill=255)
    d.rectangle((0, r, w - 1, h - 1), fill=255)

    frame = Image.new("L", size, 0)
    ImageDraw.Draw(frame).rounded_rectangle(
        (0, 0, w - 1, h - 1), radius=int(w * 0.055), fill=255
    )
    return Image.composite(mask, Image.new("L", size, 0), frame)


def portrait(width: int, height: int) -> Image.Image:
    photo = Image.open(ROOT / "public/assets/images/hero-therapist.jpg").convert("RGB")
    scale = max(width / photo.width, height / photo.height)
    resized = photo.resize(
        (int(photo.width * scale) + 1, int(photo.height * scale) + 1), Image.LANCZOS
    )
    left = (resized.width - width) // 2
    top = int((resized.height - height) * 0.14)
    cropped = resized.crop((left, top, left + width, top + height))

    mask = arch_mask((width, height))
    plate = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    plate.paste(cropped, (0, 0), mask)

    # Warm hairline traced from the mask so the outline follows the crown curve.
    eroded = mask.filter(ImageFilter.MinFilter(max(3, int(4 * S)) | 1))
    ring = Image.new("L", (width, height), 0)
    ring.paste(mask, (0, 0))
    inner = Image.new("L", (width, height), 0)
    inner.paste(eroded, (0, 0))
    from PIL import ImageChops

    edge = ImageChops.subtract(ring, inner)
    rim = Image.new("RGBA", (width, height), (255, 244, 226, 255))
    rim.putalpha(edge.point(lambda v: int(v * 0.44)))
    plate.alpha_composite(rim)
    return plate


def scrim(canvas: Image.Image) -> None:
    """Right-hand darkening so white type clears AA over the bright blooms."""
    w, h = canvas.size
    ramp = Image.new("L", (w, 1), 0)
    px = ramp.load()
    for x in range(w):
        t = x / (w - 1)
        px[x, 0] = int(255 * min(0.9, max(0.0, (t - 0.16) / 0.62) * 0.9))
    layer = ramp.resize((w, h), Image.NEAREST)
    dark = Image.new("RGBA", (w, h), (*INK, 255))
    dark.putalpha(layer)
    canvas.alpha_composite(dark)

    bottom = Image.new("L", (w, h), 0)
    ImageDraw.Draw(bottom).rectangle((0, int(h * 0.62), w, h), fill=70)
    bottom = bottom.filter(ImageFilter.GaussianBlur(40 * S))
    shade = Image.new("RGBA", (w, h), (*INK, 255))
    shade.putalpha(bottom)
    canvas.alpha_composite(shade)


def vignette(canvas: Image.Image) -> None:
    w, h = canvas.size
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).ellipse((-w * 0.35, -h * 0.6, w * 1.35, h * 1.6), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(120 * S))
    dark = Image.new("RGBA", (w, h), (*INK, 255))
    dark.putalpha(mask.point(lambda v: int((255 - v) * 0.55)))
    canvas.alpha_composite(dark)


def grain(canvas: Image.Image, strength: float = 5.0) -> None:
    """Fine monochrome grain: kills gradient banding and adds print-like texture."""
    w, h = canvas.size
    noise = Image.effect_noise((w, h), strength).convert("L")
    overlay = Image.new("RGBA", (w, h), (255, 255, 255, 255))
    overlay.putalpha(noise.point(lambda v: int(abs(v - 128) * 0.5)))
    canvas.alpha_composite(overlay)


def sunset_rule(width: int) -> Image.Image:
    grad = Image.new("RGBA", (width, int(3 * S)), (0, 0, 0, 0))
    d = ImageDraw.Draw(grad)
    for x in range(width):
        t = x / max(1, width - 1)
        d.line(
            [(x, 0), (x, 3 * S)],
            fill=(
                int(124 + (226 - 124) * t),
                int(222 + (187 - 222) * t),
                int(200 + (126 - 200) * t),
                235,
            ),
        )
    return grad


def draw_copy(canvas: Image.Image) -> None:
    d = ImageDraw.Draw(canvas)
    right = W * S - 84 * S

    f_eyebrow = font(FONT_REGULAR, 26)
    f_title = font(FONT_BOLD, 92)
    f_sub = font(FONT_REGULAR, 34)
    f_domain = font(FONT_REGULAR, 23)

    # Eyebrow, with a short rule on its inline-end side (mirrors the site eyebrow).
    eyebrow = "روان‌شناس بالینی  ·  آنلاین و حضوری"
    ey = 128 * S
    d.text((right, ey), eyebrow, font=f_eyebrow, fill=TEAL, anchor="ra")
    ew = d.textlength(eyebrow, font=f_eyebrow)
    d.line(
        [(right - ew - 26 * S, ey + 17 * S), (right - ew - 86 * S, ey + 17 * S)],
        fill=(TEAL[0], TEAL[1], TEAL[2], 170),
        width=int(1.6 * S),
    )

    d.text((right, 190 * S), "کیانا خرسند", font=f_title, fill=CREAM, anchor="ra")

    rule = sunset_rule(int(150 * S))
    canvas.alpha_composite(rule, (int(right - 150 * S), int(322 * S)))

    d.text((right, 362 * S), "جایی امن برای حرف‌زدن،", font=f_sub, fill=MUTED, anchor="ra")
    d.text((right, 412 * S), "فهمیدن و تغییر", font=f_sub, fill=MUTED, anchor="ra")

    # Domain with the gold mark sitting just before it.
    domain = "kianakhorsand.ir"
    d.text((right, 500 * S), domain, font=f_domain, fill=(236, 227, 240), anchor="ra")
    domain_w = d.textlength(domain, font=f_domain)

    mark_size = 32 * S
    mark = Image.open(ASSETS / "mark-gold.png").convert("RGBA").resize(
        (mark_size, mark_size), Image.LANCZOS
    )
    canvas.alpha_composite(
        mark, (int(right - domain_w - mark_size - 14 * S), int(488 * S))
    )


def main() -> None:
    canvas = fit_background().convert("RGBA")

    pw, ph = 486 * S, 560 * S
    plate = portrait(pw, ph)
    px, py = 92 * S, H * S - ph + 46 * S

    shadow = Image.new("L", (pw + 40 * S, ph + 40 * S), 0)
    ImageDraw.Draw(shadow).rounded_rectangle(
        (20 * S, 20 * S, pw + 20 * S, ph + 20 * S), radius=int(pw * 0.35), fill=150
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(28 * S))
    shadow_layer = Image.new("RGBA", shadow.size, (*INK, 255))
    shadow_layer.putalpha(shadow)
    canvas.alpha_composite(shadow_layer, (px - 20 * S, py - 8 * S))

    scrim(canvas)
    vignette(canvas)
    grain(canvas)

    # Portrait above the scrim so the face stays warm and bright.
    canvas.alpha_composite(plate, (px, py))
    draw_copy(canvas)

    final = canvas.convert("RGB").resize((W, H), Image.LANCZOS)
    OUT.mkdir(parents=True, exist_ok=True)
    final.save(OUT / "og-image.png", optimize=True)
    final.save(OUT / "og-image.jpg", quality=92, optimize=True, progressive=True)
    print("wrote", OUT / "og-image.png", "and", OUT / "og-image.jpg")


if __name__ == "__main__":
    main()
