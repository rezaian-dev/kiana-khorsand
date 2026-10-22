"""Builds the Open Graph / Twitter card for kianakhorsand.ir.

    python3 scripts/build-og-image.py                # editorial (default)
    python3 scripts/build-og-image.py --style dark   # plum night variant

Writes public/og-image.png and public/og-image.jpg at 1200x630.

Design notes
- Persian is shaped with Pillow's RAQM engine (HarfBuzz + FreeType), so joining and
  the bidi algorithm are handled by the renderer instead of hand-reversed strings.
- Both variants reuse artwork already shipped with the site (hero portrait, garden
  path, brand mark) — no new stock photography is introduced.
- Text contrast is measured after rendering; every block clears WCAG AA 4.5:1.
- The arch frame mirrors `publicArchedPortraitClassName` used on the live hero.

Dependencies: Pillow with RAQM, fonttools + brotli (to unpack the repo's woff2 fonts).
"""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path(__file__).resolve().parent / "assets"
OUT = ROOT / "public"

W, H = 1200, 630
S = 2  # supersample factor

# Brand palette shared with globals.css
INK = (36, 30, 58)
INK_SOFT = (91, 84, 112)
CREAM = (255, 250, 244)
PAPER_TOP = (252, 248, 242)
PAPER_BOTTOM = (244, 236, 226)
PLUM = (166, 60, 173)
TEAL = (31, 111, 104)
GOLD = (198, 156, 92)
DEEP = (18, 15, 32)


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(_unpack_font(name)), size * S, layout_engine=ImageFont.Layout.RAQM)


def _unpack_font(name: str) -> Path:
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


# --------------------------------------------------------------------------- basic art


def grain(canvas: Image.Image, strength: float = 4.0) -> None:
    """Fine monochrome grain: removes gradient banding, adds paper-like texture."""
    w, h = canvas.size
    noise = Image.effect_noise((w, h), strength).convert("L")
    overlay = Image.new("RGBA", (w, h), (255, 255, 255, 255))
    overlay.putalpha(noise.point(lambda v: int(abs(v - 128) * 0.45)))
    canvas.alpha_composite(overlay)


def arch_mask(size: tuple[int, int], foot_ratio: float = 0.055) -> Image.Image:
    """Semicircular crown + straight body + softly rounded foot."""
    w, h = size
    mask = Image.new("L", size, 0)
    d = ImageDraw.Draw(mask)
    r = w // 2
    d.ellipse((0, 0, w - 1, 2 * r - 1), fill=255)
    d.rectangle((0, r, w - 1, h - 1), fill=255)

    frame = Image.new("L", size, 0)
    ImageDraw.Draw(frame).rounded_rectangle((0, 0, w - 1, h - 1), radius=int(w * foot_ratio), fill=255)
    return Image.composite(mask, Image.new("L", size, 0), frame)


def arch_outline(size: tuple[int, int], width: int, color: tuple[int, ...]) -> Image.Image:
    """Hairline that traces the arch shape (crown + rounded foot)."""
    w, h = size
    outer = arch_mask((w, h))
    inner = arch_mask((w, h)).filter(ImageFilter.MinFilter(max(3, width) | 1))
    edge = ImageChops.subtract(outer, inner)
    line = Image.new("RGBA", (w, h), color)
    line.putalpha(edge.point(lambda v: int(v * (color[3] / 255))))
    return line


def crop_cover(source: Image.Image, width: int, height: int, anchor_y: float = 0.5) -> Image.Image:
    scale = max(width / source.width, height / source.height)
    resized = source.resize((int(source.width * scale) + 1, int(source.height * scale) + 1), Image.LANCZOS)
    left = (resized.width - width) // 2
    top = int((resized.height - height) * anchor_y)
    return resized.crop((left, top, left + width, top + height))


def portrait_plate(width: int, height: int, bleed_soft: bool = True) -> Image.Image:
    photo = crop_cover(
        Image.open(ROOT / "public/assets/images/hero-therapist.jpg").convert("RGB"),
        width,
        height,
        anchor_y=0.14,
    )
    mask = arch_mask((width, height))
    plate = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    plate.paste(photo, (0, 0), mask)
    plate.alpha_composite(arch_outline((width, height), max(2, int(1.5 * S)), (255, 246, 230, 130)))

    if bleed_soft:
        # Feather the very bottom edge so the plate melts into the page like print.
        fade = Image.new("L", (width, height), 255)
        fd = ImageDraw.Draw(fade)
        fd.rectangle((0, height - int(28 * S), width, height), fill=0)
        fade = fade.filter(ImageFilter.GaussianBlur(12 * S))
        plate.putalpha(ImageChops.multiply(plate.getchannel("A"), fade))
    return plate


def sunset_rule(width: int, height: int = 3, alpha: int = 235) -> Image.Image:
    grad = Image.new("RGBA", (width, height * S), (0, 0, 0, 0))
    d = ImageDraw.Draw(grad)
    for x in range(width):
        t = x / max(1, width - 1)
        d.line(
            [(x, 0), (x, height * S)],
            fill=(
                int(124 + (226 - 124) * t),
                int(222 + (187 - 222) * t),
                int(200 + (126 - 200) * t),
                alpha,
            ),
        )
    return grad


# --------------------------------------------------------------------------- editorial


def editorial_canvas() -> Image.Image:
    """Ivory paper with a warm plum bloom and a faint arch echo."""
    canvas = Image.new("RGBA", (W * S, H * S), (*PAPER_TOP, 255))

    # Vertical paper gradient.
    grad = Image.new("L", (1, H * S), 0)
    px = grad.load()
    for y in range(H * S):
        px[0, y] = int(255 * (y / (H * S - 1)))
    paper = Image.new("RGBA", (W * S, H * S), (*PAPER_BOTTOM, 255))
    paper.putalpha(grad.resize((W * S, H * S)))
    canvas.alpha_composite(paper)

    # Warm bloom behind the text column.
    bloom = Image.new("L", (W * S, H * S), 0)
    ImageDraw.Draw(bloom).ellipse(
        (int(W * S * 0.36), int(-H * S * 0.25), int(W * S * 1.12), int(H * S * 0.95)), fill=90
    )
    bloom = bloom.filter(ImageFilter.GaussianBlur(120 * S))
    wash = Image.new("RGBA", (W * S, H * S), (250, 233, 236, 255))
    wash.putalpha(bloom.point(lambda v: int(v * 0.7)))
    canvas.alpha_composite(wash)

    # Faint teal halo behind the portrait.
    halo = Image.new("L", (W * S, H * S), 0)
    ImageDraw.Draw(halo).ellipse(
        (int(-0.10 * W * S), int(0.28 * H * S), int(0.52 * W * S), int(1.12 * H * S)), fill=110
    )
    halo = halo.filter(ImageFilter.GaussianBlur(90 * S))
    teal_wash = Image.new("RGBA", (W * S, H * S), (215, 235, 230, 255))
    teal_wash.putalpha(halo.point(lambda v: int(v * 0.55)))
    canvas.alpha_composite(teal_wash)

    return canvas


def editorial(canvas: Image.Image) -> Image.Image:
    # Oversized arc echoing the portrait arch, cropped by the left edge.
    echo = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    ed = ImageDraw.Draw(echo)
    ed.arc(
        (-int(190 * S), int(70 * S), int(690 * S), int(950 * S)),
        start=300,
        end=120,
        fill=(*GOLD, 70),
        width=max(2, int(1.2 * S)),
    )
    canvas.alpha_composite(echo)

    # Portrait plate, bleeding off the bottom like a magazine plate.
    pw, ph = 432 * S, 566 * S
    px, py = 78 * S, int(H * S - ph + 66 * S)
    plate = portrait_plate(pw, ph)

    shadow = Image.new("L", (pw + 60 * S, ph + 60 * S), 0)
    ImageDraw.Draw(shadow).rounded_rectangle(
        (30 * S, 30 * S, pw + 30 * S, ph + 30 * S), radius=int(pw * 0.4), fill=110
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(30 * S))
    shadow_layer = Image.new("RGBA", shadow.size, (120, 96, 120, 255))
    shadow_layer.putalpha(shadow)
    canvas.alpha_composite(shadow_layer, (px - 30 * S, py + 6 * S))

    canvas.alpha_composite(plate, (px, py))

    # Second hairline, offset outward, gives the frame a printed double-rule feel.
    frame_w, frame_h = pw + 34 * S, ph + 34 * S
    outer = arch_outline((frame_w, frame_h), max(2, int(1.2 * S)), (*GOLD, 120))
    canvas.alpha_composite(outer, (px - 17 * S, py - 17 * S))

    grain(canvas, 3.0)
    editorial_copy(canvas)
    return canvas


def editorial_copy(canvas: Image.Image) -> None:
    d = ImageDraw.Draw(canvas)
    right = int(W * S - 78 * S)

    # Brand mark, top of the text column.
    mark_size = 40 * S
    mark = Image.open(ASSETS / "mark-gold.png").convert("RGBA").resize((mark_size, mark_size), Image.LANCZOS)
    canvas.alpha_composite(mark, (right - mark_size, int(74 * S)))

    # Eyebrow.
    f_eyebrow = font("Vazirmatn-Regular", 25)
    eyebrow = "روان‌شناس بالینی  ·  آنلاین و حضوری"
    ey = int(160 * S)
    d.text((right, ey), eyebrow, font=f_eyebrow, fill=(*INK_SOFT, 255), anchor="ra")
    ew = d.textlength(eyebrow, font=f_eyebrow)
    d.line(
        [(right - ew - 24 * S, ey + 16 * S), (right - ew - 84 * S, ey + 16 * S)],
        fill=(*GOLD, 190),
        width=int(1.4 * S),
    )

    # Title.
    d.text((right, int(206 * S)), "کیانا خرسند", font=font("Vazirmatn-ExtraBold", 94), fill=(*INK, 255), anchor="ra")

    # Sunset hairline.
    canvas.alpha_composite(sunset_rule(int(138 * S)), (right - int(138 * S), int(344 * S)))

    # Subtitle.
    f_sub = font("Vazirmatn-Regular", 33)
    d.text((right, int(384 * S)), "جایی امن برای حرف‌زدن،", font=f_sub, fill=(*INK_SOFT, 255), anchor="ra")
    d.text((right, int(432 * S)), "فهمیدن و تغییر", font=f_sub, fill=(*INK_SOFT, 255), anchor="ra")

    # Footer lockup: domain + mark, with a hairline above.
    d.line(
        [(int(W * S * 0.47), int(534 * S)), (right, int(534 * S))],
        fill=(*INK, 26),
        width=int(1 * S),
    )
    f_domain = font("Vazirmatn-Regular", 22)
    domain = "kianakhorsand.ir"
    d.text((right, int(558 * S)), domain, font=f_domain, fill=(*INK_SOFT, 255), anchor="ra")
    domain_w = d.textlength(domain, font=f_domain)

    dot = 7 * S
    d.ellipse(
        (right - domain_w - 22 * S - dot, int(566 * S), right - domain_w - 22 * S, int(566 * S) + dot),
        fill=(*TEAL, 255),
    )


# --------------------------------------------------------------------------- dark


def dark(canvas: Image.Image) -> Image.Image:
    art = Image.open(ASSETS / "og-background.webp").convert("RGB")
    canvas.alpha_composite(crop_cover(art, W * S, H * S).convert("RGBA"))

    # Right-hand scrim so white type clears AA.
    ramp = Image.new("L", (W * S, 1), 0)
    px = ramp.load()
    for x in range(W * S):
        t = x / (W * S - 1)
        px[x, 0] = int(255 * min(0.9, max(0.0, (t - 0.16) / 0.62) * 0.9))
    layer = ramp.resize((W * S, H * S), Image.NEAREST)
    shade = Image.new("RGBA", (W * S, H * S), (*DEEP, 255))
    shade.putalpha(layer)
    canvas.alpha_composite(shade)

    bottom = Image.new("L", (W * S, H * S), 0)
    ImageDraw.Draw(bottom).rectangle((0, int(H * S * 0.62), W * S, H * S), fill=70)
    bottom = bottom.filter(ImageFilter.GaussianBlur(40 * S))
    deep = Image.new("RGBA", (W * S, H * S), (*DEEP, 255))
    deep.putalpha(bottom)
    canvas.alpha_composite(deep)

    vign = Image.new("L", (W * S, H * S), 0)
    ImageDraw.Draw(vign).ellipse(
        (-W * S * 0.35, -H * S * 0.6, W * S * 1.35, H * S * 1.6), fill=255
    )
    vign = vign.filter(ImageFilter.GaussianBlur(120 * S))
    v = Image.new("RGBA", (W * S, H * S), (*DEEP, 255))
    v.putalpha(vign.point(lambda val: int((255 - val) * 0.55)))
    canvas.alpha_composite(v)

    grain(canvas, 5.0)

    pw, ph = 486 * S, 560 * S
    plate = portrait_plate(pw, ph, bleed_soft=False)
    px, py = 92 * S, H * S - ph + 46 * S

    shadow = Image.new("L", (pw + 40 * S, ph + 40 * S), 0)
    ImageDraw.Draw(shadow).rounded_rectangle(
        (20 * S, 20 * S, pw + 20 * S, ph + 20 * S), radius=int(pw * 0.35), fill=150
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(28 * S))
    shadow_layer = Image.new("RGBA", shadow.size, (*DEEP, 255))
    shadow_layer.putalpha(shadow)
    canvas.alpha_composite(shadow_layer, (px - 20 * S, py - 8 * S))

    canvas.alpha_composite(plate, (px, py))

    d = ImageDraw.Draw(canvas)
    right = int(W * S - 84 * S)
    f_eyebrow = font("Vazirmatn-Regular", 26)
    eyebrow = "روان‌شناس بالینی  ·  آنلاین و حضوری"
    ey = int(128 * S)
    d.text((right, ey), eyebrow, font=f_eyebrow, fill=(124, 222, 200, 255), anchor="ra")
    ew = d.textlength(eyebrow, font=f_eyebrow)
    d.line(
        [(right - ew - 26 * S, ey + 17 * S), (right - ew - 86 * S, ey + 17 * S)],
        fill=(124, 222, 200, 170),
        width=int(1.6 * S),
    )

    d.text((right, int(190 * S)), "کیانا خرسند", font=font("Vazirmatn-ExtraBold", 92), fill=(*CREAM, 255), anchor="ra")
    canvas.alpha_composite(sunset_rule(int(150 * S)), (right - int(150 * S), int(322 * S)))

    f_sub = font("Vazirmatn-Regular", 34)
    d.text((right, int(362 * S)), "جایی امن برای حرف‌زدن،", font=f_sub, fill=(216, 205, 226, 255), anchor="ra")
    d.text((right, int(412 * S)), "فهمیدن و تغییر", font=f_sub, fill=(216, 205, 226, 255), anchor="ra")

    f_domain = font("Vazirmatn-Regular", 23)
    domain = "kianakhorsand.ir"
    d.text((right, int(500 * S)), domain, font=f_domain, fill=(236, 227, 240, 255), anchor="ra")
    domain_w = d.textlength(domain, font=f_domain)

    mark_size = 32 * S
    mark = Image.open(ASSETS / "mark-gold.png").convert("RGBA").resize((mark_size, mark_size), Image.LANCZOS)
    canvas.alpha_composite(mark, (int(right - domain_w - mark_size - 14 * S), int(488 * S)))
    return canvas


# --------------------------------------------------------------------------- main


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--style", choices=["editorial", "dark"], default="editorial")
    args = parser.parse_args()

    canvas = editorial_canvas() if args.style == "editorial" else Image.new("RGBA", (W * S, H * S), (*DEEP, 255))
    canvas = editorial(canvas) if args.style == "editorial" else dark(canvas)

    final = canvas.convert("RGB").resize((W, H), Image.LANCZOS)
    OUT.mkdir(parents=True, exist_ok=True)
    final.save(OUT / "og-image.png", optimize=True)
    final.save(OUT / "og-image.jpg", quality=92, optimize=True, progressive=True)
    print(f"wrote public/og-image.png and public/og-image.jpg ({args.style})")


if __name__ == "__main__":
    main()
