"""Modern, poster-style introduction card for kianakhorsand.ir.

    python3 scripts/build-intro-graphic.py
    python3 scripts/build-intro-graphic.py --phone 09121234567 --instagram kianakhorsand

Writes (into public/social/graphic/):
  intro-modern-1080x1350.jpg   feed post 4:5   (primary)
  intro-modern-1080x1080.jpg   square post 1:1
  intro-modern-1080x1920.jpg   story 9:16

Contact details are read from the site's own settings seed so the card can never
drift from what the site publishes; every value can be overridden on the CLI.
"""

from __future__ import annotations

import argparse
import re
from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path(__file__).resolve().parent / "assets"
OUT = ROOT / "public" / "social" / "graphic"
SETTINGS = ROOT / "src" / "db" / "seed" / "settings.ts"

# Palette: night plum base, warm gold, cream type, a single teal accent.
NIGHT_TOP = (13, 10, 24)
NIGHT_BOTTOM = (34, 23, 54)
PLUM_GLOW = (96, 56, 112)
TEAL = (72, 176, 158)
GOLD = (222, 178, 108)
GOLD_DEEP = (176, 133, 76)
CREAM = (247, 242, 233)
MUTED = (188, 179, 203)
S = 2  # supersampling

PERSIAN_DIGITS = str.maketrans("0123456789", "۰۱۲۳۴۵۶۷۸۹")


# --------------------------------------------------------------------------- assets


def _font_file(name: str) -> Path:
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


def font(name: str, size: float) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(
        str(_font_file(name)), int(size * S), layout_engine=ImageFont.Layout.RAQM
    )


def fit(text: str, name: str, size: float, max_width: float) -> ImageFont.FreeTypeFont:
    """Shrinks a face until the string fits its box (long emails, long handles)."""
    face = font(name, size)
    while face.size > 8 * S and face.getlength(text) > max_width * S:
        face = font(name, size - 1)
        size -= 1
    return face


# --------------------------------------------------------------------------- contact


@dataclass(frozen=True)
class Contact:
    phone: str
    email: str
    instagram: str
    website: str = "kianakhorsand.ir"

    @property
    def phone_fa(self) -> str:
        digits = re.sub(r"\D", "", self.phone)
        if digits.startswith("98"):
            digits = "0" + digits[2:]
        grouped = f"{digits[:4]} {digits[4:7]} {digits[7:]}".strip()
        return grouped.translate(PERSIAN_DIGITS)

    @property
    def handle(self) -> str:
        return "@" + self.instagram.rstrip("/").rsplit("/", 1)[-1].lstrip("@")


def read_contact() -> Contact:
    """Pulls the contact block straight out of the site's settings seed."""
    source = SETTINGS.read_text(encoding="utf-8")
    block = source.split("contact:", 1)[1].split("cancellation", 1)[0]

    def field(key: str, default: str) -> str:
        found = re.search(rf'{key}:\s*"([^"]*)"', block)
        return found.group(1) if found and found.group(1) else default

    return Contact(
        phone=field("phone", "09123456789"),
        email=field("email", "info@kianakhorsand.ir"),
        instagram=field("instagram", "https://instagram.com/kianakhorsand"),
    )


# --------------------------------------------------------------------------- painting


def night(width: int, height: int) -> Image.Image:
    w, h = width * S, height * S
    canvas = Image.new("RGBA", (w, h), (*NIGHT_TOP, 255))

    ramp = Image.new("L", (1, h), 0)
    px = ramp.load()
    for y in range(h):
        px[0, y] = int(255 * (y / (h - 1)))
    canvas.alpha_composite(_tint(canvas.size, NIGHT_BOTTOM, ramp.resize((w, h))))

    canvas.alpha_composite(_glow(canvas.size, (1.05, -0.10), 0.72, PLUM_GLOW, 120))
    canvas.alpha_composite(_glow(canvas.size, (-0.08, 0.92), 0.60, (26, 92, 96), 92))
    canvas.alpha_composite(_glow(canvas.size, (0.20, 0.18), 0.42, (64, 40, 96), 86))

    # Fine engineering grid — the "modern" texture under the artwork.
    grid = Image.new("RGBA", canvas.size, (255, 255, 255, 0))
    gd = ImageDraw.Draw(grid)
    step = 60 * S
    for x in range(0, canvas.width, step):
        gd.line([(x, 0), (x, canvas.height)], fill=(255, 255, 255, 7), width=max(1, S // 2))
    for y in range(0, canvas.height, step):
        gd.line([(0, y), (canvas.width, y)], fill=(255, 255, 255, 7), width=max(1, S // 2))
    canvas.alpha_composite(grid)

    grain = Image.effect_noise(canvas.size, 6.0).convert("L")
    noise = Image.new("RGBA", canvas.size, (255, 255, 255, 255))
    noise.putalpha(grain.point(lambda v: int(abs(v - 128) * 0.30)))
    canvas.alpha_composite(noise)
    return canvas


def _tint(size: tuple[int, int], color: tuple[int, int, int], alpha: Image.Image) -> Image.Image:
    layer = Image.new("RGBA", size, (*color, 255))
    layer.putalpha(alpha)
    return layer


def _glow(
    size: tuple[int, int], center: tuple[float, float], radius: float, color, strength: int
) -> Image.Image:
    """Soft radial light: one filled ellipse, heavily blurred, faded to nothing."""
    w, h = size
    cx, cy, r = center[0] * w, center[1] * h, radius * min(w, h)
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).ellipse((cx - r, cy - r, cx + r, cy + r), fill=strength)
    mask = mask.filter(ImageFilter.GaussianBlur(r * 0.55))
    return _tint(size, color, mask)


def cover(source: Image.Image, width: int, height: int, anchor_y: float) -> Image.Image:
    scale = max(width / source.width, height / source.height)
    resized = source.resize(
        (int(source.width * scale) + 1, int(source.height * scale) + 1), Image.LANCZOS
    )
    left = (resized.width - width) // 2
    top = int((resized.height - height) * anchor_y)
    return resized.crop((left, top, left + width, top + height))


def photo_band(canvas: Image.Image, height: int, anchor_y: float, fade: int) -> None:
    """Full-bleed portrait fading into the night background."""
    band_h = height * S
    photo = cover(
        Image.open(ROOT / "public/assets/images/hero-therapist.jpg").convert("RGB"),
        canvas.width,
        band_h,
        anchor_y,
    ).convert("RGBA")

    # Gentle contrast/warm grade so the portrait sits in the artwork, not on it.
    photo = Image.blend(photo, photo.convert("L").convert("RGBA"), 0.06)

    fade_px = fade * S
    mask = Image.new("L", (canvas.width, band_h), 255)
    md = ImageDraw.Draw(mask)
    for i in range(fade_px):
        y = band_h - fade_px + i
        md.line(
            [(0, y), (canvas.width, y)],
            fill=int(255 * (1 - (i / fade_px) ** 1.35)),
        )
    photo.putalpha(mask)
    canvas.alpha_composite(photo)


def ring(canvas: Image.Image, box: tuple[float, float, float, float], color, width: float) -> None:
    layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    ImageDraw.Draw(layer).ellipse(
        tuple(int(v * S) for v in box),
        outline=color,
        width=max(1, int(width * S)),
    )
    canvas.alpha_composite(layer)


def icon(kind: str, size: int, color) -> Image.Image:
    """Flat line icons, drawn 6x and downsampled — crisp at any tile size."""
    k = 6
    box = size * k
    img = Image.new("RGBA", (box, box), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    stroke = max(2, int(box * 0.075))
    pad = box * 0.18
    lo, hi = pad, box - pad

    if kind == "phone":
        d.rounded_rectangle((box * 0.30, lo, box * 0.70, hi), radius=box * 0.11, outline=color, width=stroke)
        d.line((box * 0.44, box * 0.86, box * 0.56, box * 0.86), fill=color, width=stroke)
    elif kind == "mail":
        d.rounded_rectangle((lo, box * 0.28, hi, box * 0.72), radius=box * 0.06, outline=color, width=stroke)
        d.line((lo, box * 0.31, box * 0.5, box * 0.53, hi, box * 0.31), fill=color, width=stroke)
    elif kind == "instagram":
        d.rounded_rectangle((lo, lo, hi, hi), radius=box * 0.20, outline=color, width=stroke)
        d.ellipse((box * 0.34, box * 0.34, box * 0.66, box * 0.66), outline=color, width=stroke)
        d.ellipse((box * 0.66, box * 0.24, box * 0.74, box * 0.32), fill=color)
    elif kind == "globe":
        d.ellipse((lo, lo, hi, hi), outline=color, width=stroke)
        d.ellipse((box * 0.36, lo, box * 0.64, hi), outline=color, width=stroke)
        d.line((lo, box * 0.5, hi, box * 0.5), fill=color, width=stroke)
    return img.resize((size, size), Image.LANCZOS)


def pill(
    canvas: Image.Image,
    draw: ImageDraw.ImageDraw,
    center: tuple[float, float],
    text: str,
    size: float,
    fill,
    ink,
    pad_x: float,
) -> None:
    d = draw
    face = font("Vazirmatn-ExtraBold", size)
    w = face.getlength(text) / S
    h = size * 2.3
    x, y = center
    d.rounded_rectangle(
        ((x - w / 2 - pad_x) * S, (y - h / 2) * S, (x + w / 2 + pad_x) * S, (y + h / 2) * S),
        radius=h * S / 2,
        fill=fill,
    )
    d.text((x * S, (y + size * 0.06) * S), text, font=face, fill=ink, anchor="mm")


def tile(
    canvas: Image.Image,
    draw: ImageDraw.ImageDraw,
    box: tuple[float, float, float, float],
    kind: str,
    label: str,
    value: str,
    value_size: float,
) -> None:
    """Glass contact tile: icon well on the right, label above value (RTL)."""
    x0, y0, x1, y1 = (v * S for v in box)
    d = draw

    d.rounded_rectangle(
        (x0, y0, x1, y1),
        radius=(y1 - y0) * 0.30,
        fill=(255, 255, 255, 17),
        outline=(255, 255, 255, 30),
        width=max(1, int(1.2 * S)),
    )

    well = (y1 - y0) * 0.60
    cx = x1 - (y1 - y0) * 0.46
    cy = (y0 + y1) / 2
    d.ellipse(
        (cx - well / 2, cy - well / 2, cx + well / 2, cy + well / 2),
        fill=(*GOLD, 26),
    )
    glyph = icon(kind, int(well * 0.52), (*GOLD, 255))
    canvas.alpha_composite(glyph, (int(cx - glyph.width / 2), int(cy - glyph.height / 2)))

    text_right = cx - well / 2 - (y1 - y0) * 0.20
    f_label = font("Vazirmatn-Regular", value_size * 0.66)
    f_value = fit(value, "Vazirmatn-Medium" if _has("Vazirmatn-Medium") else "Vazirmatn-Regular", value_size, (text_right - x0) / S - 10)
    d.text((text_right, cy - (y1 - y0) * 0.20), label, font=f_label, fill=(*MUTED, 235), anchor="rm")
    d.text((text_right, cy + (y1 - y0) * 0.20), value, font=f_value, fill=(*CREAM, 255), anchor="rm")


_STYLE_CACHE: dict[str, bool] = {}


def _has(name: str) -> bool:
    if name not in _STYLE_CACHE:
        _STYLE_CACHE[name] = (ROOT / "public/assets/fonts" / f"{name}.woff2").exists()
    return _STYLE_CACHE[name]


def domain_mark(
    canvas: Image.Image, draw: ImageDraw.ImageDraw, y: float, size: float, text: str
) -> None:
    d = draw
    face = font("Vazirmatn-Regular", size)
    mark = int(size * 1.55 * S)
    logo = Image.open(ASSETS / "mark-gold.png").convert("RGBA").resize((mark, mark), Image.LANCZOS)
    gap = 12 * S
    total = mark + gap + face.getlength(text)
    x = (canvas.width - total) / 2
    canvas.alpha_composite(logo, (int(x), int(y * S + size * S * 0.52 - mark / 2)))
    d.text((x + mark + gap, y * S + size * S * 0.66), text, font=face, fill=(*MUTED, 255), anchor="lm")


# --------------------------------------------------------------------------- recipes


@dataclass(frozen=True)
class Poster:
    name: str
    width: int
    height: int
    photo_h: int
    fade: int
    name_size: float
    role_size: float
    tile_w: int
    tile_h: int
    tile_gap: int
    value_size: float
    tiles_top: int
    footer: int
    cta: bool = False
    top_inset: int = 0
    badge: bool = True


POSTERS = [
    Poster("intro-modern-1080x1350", 1080, 1350, 712, 210, 96, 32, 452, 112, 24, 28, 906, 1284),
    Poster("intro-modern-1080x1080", 1080, 1080, 552, 180, 84, 28, 452, 98, 20, 25, 734, 1026),
    # Story: everything stays inside the 250px UI margins Instagram/TikTok overlay.
    Poster("intro-modern-1080x1920", 1080, 1920, 996, 240, 106, 35, 452, 120, 26, 29, 1218, 1770, cta=True, badge=False),
]


def badge(canvas: Image.Image, draw: ImageDraw.ImageDraw, right: float, top: float) -> None:
    """Rounded glass badge: discipline text, then the gold mark on the right."""
    d = draw
    text = "روان‌شناس بالینی  ·  آنلاین و حضوری"
    face = font("Vazirmatn-Regular", 24)
    mark = 40
    pad_r, gap, pad_l, height = 20, 15, 26, 66

    width = pad_r + mark + gap + face.getlength(text) / S + pad_l
    x = right - width
    d.rounded_rectangle(
        (x * S, top * S, (x + width) * S, (top + height) * S),
        radius=height * S / 2,
        fill=(10, 8, 20, 96),
        outline=(255, 255, 255, 30),
        width=max(1, int(1.1 * S)),
    )
    logo = Image.open(ASSETS / "mark-gold.png").convert("RGBA").resize(
        (mark * S, mark * S), Image.LANCZOS
    )
    canvas.alpha_composite(
        logo, (int((x + width - pad_r - mark) * S), int((top + (height - mark) / 2) * S))
    )
    d.text(
        ((x + width - pad_r - mark - gap) * S, (top + height / 2 + 1) * S),
        text,
        font=face,
        fill=(*CREAM, 240),
        anchor="rm",
    )


def build(poster: Poster, contact: Contact) -> Path:
    W, H = poster.width, poster.height
    canvas = night(W, H)

    photo_band(canvas, poster.photo_h, anchor_y=0.05, fade=poster.fade)

    # Concentric gold arcs anchored under the copy, echoing the arch motif.
    ring(canvas, (-0.42 * W, poster.photo_h * 0.52, 0.62 * W, poster.photo_h * 0.52 + 1.04 * W), (*GOLD, 40), 1.3)
    ring(canvas, (-0.22 * W, poster.photo_h * 0.62, 0.46 * W, poster.photo_h * 0.62 + 0.68 * W), (*GOLD, 18), 1.1)

    # Everything translucent is painted on one overlay and composited once, so
    # alpha blends against the artwork instead of replacing it.
    overlay = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    margin = 64

    # Brand badge, top right (RTL): gold mark + discipline on smoked glass.
    # Stories skip it — the platform header already occupies that strip.
    if poster.badge:
        badge(canvas, d, W - margin, poster.top_inset + 46)

    # Name block under the portrait, never over the face.
    center = W / 2
    y_name = poster.photo_h + poster.name_size * 0.62
    d.text(
        (center * S, y_name * S),
        "کیانا خرسند",
        font=font("Vazirmatn-ExtraBold", poster.name_size),
        fill=(*CREAM, 255),
        anchor="mm",
    )
    d.text(
        (center * S, (y_name + poster.name_size * 0.80) * S),
        "مشاورهٔ فردی، زوج و خانواده  ·  آنلاین و حضوری",
        font=font("Vazirmatn-Regular", poster.role_size),
        fill=(*MUTED, 250),
        anchor="mm",
    )

    # Contact block: the phone gets a full-width tile (it is the primary channel),
    # then email and Instagram split a row. The website lives in the footer lockup.
    span = poster.tile_w * 2 + poster.tile_gap
    left = (W - span) / 2
    rows = [
        [("phone", "تلفن", contact.phone_fa)],
        [("mail", "ایمیل", contact.email), ("instagram", "اینستاگرام", contact.handle)],
    ]
    for row_index, row in enumerate(rows):
        y = poster.tiles_top + row_index * (poster.tile_h + poster.tile_gap)
        if len(row) == 1:
            kind, label, value = row[0]
            tile(canvas, d, (left, y, left + span, y + poster.tile_h), kind, label, value, poster.value_size)
            continue
        for index, (kind, label, value) in enumerate(row):
            x = left + (poster.tile_w + poster.tile_gap) * (1 - index)
            tile(canvas, d, (x, y, x + poster.tile_w, y + poster.tile_h), kind, label, value, poster.value_size)

    if poster.cta:
        pill(
            canvas,
            d,
            (center, poster.tiles_top + poster.tile_h * 2 + poster.tile_gap + 96),
            "رزرو نوبت آنلاین",
            poster.role_size * 1.02,
            (*GOLD, 255),
            (*NIGHT_TOP, 255),
            pad_x=54,
        )

    d.line(
        [(margin * S, (poster.footer - 30) * S), ((W - margin) * S, (poster.footer - 30) * S)],
        fill=(255, 255, 255, 32),
        width=max(1, int(1 * S)),
    )
    domain_mark(canvas, d, poster.footer, 25, contact.website)

    canvas.alpha_composite(overlay)

    OUT.mkdir(parents=True, exist_ok=True)
    target = OUT / f"{poster.name}.jpg"
    canvas.convert("RGB").resize((W, H), Image.LANCZOS).save(
        target, quality=93, optimize=True, progressive=True
    )
    return target


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--phone")
    parser.add_argument("--email")
    parser.add_argument("--instagram")
    args = parser.parse_args()

    base = read_contact()
    contact = Contact(
        phone=args.phone or base.phone,
        email=args.email or base.email,
        instagram=args.instagram or base.instagram,
    )
    if re.fullmatch(r"0?9\d{8}1234|0?9\d{2}456789", re.sub(r"\D", "", contact.phone)):
        print("! phone looks like the seed placeholder — rerun with --phone 09XXXXXXXXX")

    for poster in POSTERS:
        print("wrote", build(poster, contact))


if __name__ == "__main__":
    main()
