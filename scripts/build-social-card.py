"""Builds the social-media introduction card for kianakhorsand.ir.

    python3 scripts/build-social-card.py

Writes:
  public/social/intro-1080x1350.jpg   Instagram / Telegram feed (4:5)
  public/social/intro-1080x1080.jpg   square feed post (1:1)
  public/social/intro-1080x1920.jpg   story / status (9:16)

Everything is drawn from assets already shipped with the site: the hero portrait,
the gold brand mark and the site's Vazirmatn fonts. No new photography is invented.

Persian is shaped with Pillow's RAQM engine (HarfBuzz + FreeType), so joining and the
bidi algorithm are handled by the renderer rather than hand-reversed strings.
"""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path(__file__).resolve().parent / "assets"
OUT = ROOT / "public" / "social"

INK = (36, 30, 58)
INK_SOFT = (86, 79, 108)
PAPER_TOP = (253, 249, 244)
PAPER_BOTTOM = (243, 234, 224)
GOLD = (198, 156, 92)
TEAL = (31, 111, 104)
S = 2  # supersampling


@dataclass(frozen=True)
class Recipe:
    name: str
    width: int
    height: int
    mark: int
    photo_w: int
    photo_h: int
    photo_top: int
    name_size: int
    role_size: int
    chip_size: int
    domain_size: int
    show_tagline: bool = False


RECIPES = [
    # name, w, h, mark, photo w/h/top, name, role, chip, domain
    Recipe("intro-1080x1350", 1080, 1350, 84, 700, 720, 196, 66, 30, 26, 24),
    Recipe("intro-1080x1080", 1080, 1080, 74, 520, 545, 176, 54, 26, 22, 21),
    Recipe("intro-1080x1920", 1080, 1920, 96, 760, 1080, 232, 78, 34, 28, 26, show_tagline=True),
]


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(_unpack(name)), size * S, layout_engine=ImageFont.Layout.RAQM)


def _unpack(name: str) -> Path:
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


# --------------------------------------------------------------------------- helpers


def paper(width: int, height: int) -> Image.Image:
    """Ivory paper with a plum bloom and a teal halo; the site's own palette."""
    w, h = width * S, height * S
    canvas = Image.new("RGBA", (w, h), (*PAPER_TOP, 255))

    ramp = Image.new("L", (1, h), 0)
    px = ramp.load()
    for y in range(h):
        px[0, y] = int(255 * (y / (h - 1)))
    bottom = Image.new("RGBA", (w, h), (*PAPER_BOTTOM, 255))
    bottom.putalpha(ramp.resize((w, h)))
    canvas.alpha_composite(bottom)

    bloom = Image.new("L", (w, h), 0)
    ImageDraw.Draw(bloom).ellipse(
        (int(-0.25 * w), int(-0.30 * h), int(0.85 * w), int(0.72 * h)), fill=95
    )
    bloom = bloom.filter(ImageFilter.GaussianBlur(int(w * 0.19)))
    wash = Image.new("RGBA", (w, h), (250, 231, 235, 255))
    wash.putalpha(bloom.point(lambda v: int(v * 0.62)))
    canvas.alpha_composite(wash)

    halo = Image.new("L", (w, h), 0)
    ImageDraw.Draw(halo).ellipse(
        (int(0.05 * w), int(0.55 * h), int(1.10 * w), int(1.05 * h)), fill=105
    )
    halo = halo.filter(ImageFilter.GaussianBlur(int(w * 0.16)))
    teal = Image.new("RGBA", (w, h), (214, 235, 229, 255))
    teal.putalpha(halo.point(lambda v: int(v * 0.55)))
    canvas.alpha_composite(teal)

    grain = Image.effect_noise((w, h), 3.0).convert("L")
    noise = Image.new("RGBA", (w, h), (255, 255, 255, 255))
    noise.putalpha(grain.point(lambda v: int(abs(v - 128) * 0.42)))
    canvas.alpha_composite(noise)
    return canvas


def arch(size: tuple[int, int], foot: float = 0.06) -> Image.Image:
    w, h = size
    mask = Image.new("L", size, 0)
    d = ImageDraw.Draw(mask)
    r = w // 2
    d.ellipse((0, 0, w - 1, 2 * r - 1), fill=255)
    d.rectangle((0, r, w - 1, h - 1), fill=255)
    frame = Image.new("L", size, 0)
    ImageDraw.Draw(frame).rounded_rectangle((0, 0, w - 1, h - 1), radius=int(w * foot), fill=255)
    return Image.composite(mask, Image.new("L", size, 0), frame)


def arch_line(size: tuple[int, int], width: int, color: tuple[int, ...]) -> Image.Image:
    outer = arch(size)
    inner = arch(size).filter(ImageFilter.MinFilter(max(3, width) | 1))
    edge = ImageChops.subtract(outer, inner)
    line = Image.new("RGBA", size, color)
    line.putalpha(edge.point(lambda v: int(v * (color[3] / 255))))
    return line


def cover(source: Image.Image, width: int, height: int, anchor_y: float = 0.12) -> Image.Image:
    scale = max(width / source.width, height / source.height)
    resized = source.resize(
        (int(source.width * scale) + 1, int(source.height * scale) + 1), Image.LANCZOS
    )
    left = (resized.width - width) // 2
    top = int((resized.height - height) * anchor_y)
    return resized.crop((left, top, left + width, top + height))


def portrait(width: int, height: int) -> Image.Image:
    photo = cover(
        Image.open(ROOT / "public/assets/images/hero-therapist.jpg").convert("RGB"),
        width,
        height,
        anchor_y=0.10,
    )
    mask = arch((width, height))
    plate = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    plate.paste(photo, (0, 0), mask)
    plate.alpha_composite(
        arch_line((width, height), max(2, int(1.6 * S)), (255, 246, 230, 150))
    )
    return plate


def chips(canvas: Image.Image, labels: list[str], y: int, size: int) -> None:
    """Centered row of quiet outline pills."""
    f = font("Vazirmatn-Regular", size)
    d = ImageDraw.Draw(canvas)
    pad_x, gap, height = 30 * S, 16 * S, int(size * 2.1 * S)

    widths = [int(d.textlength(label, font=f)) + pad_x * 2 for label in labels]
    total = sum(widths) + gap * (len(labels) - 1)
    x = (canvas.width - total) // 2
    for label, width in zip(labels, widths):
        box = (x, y, x + width, y + height)
        d.rounded_rectangle(box, radius=height // 2, fill=(255, 255, 255, 205), outline=(*GOLD, 90), width=max(1, int(1.1 * S)))
        d.text(
            (x + width // 2, y + height // 2),
            label,
            font=f,
            fill=(*INK_SOFT, 255),
            anchor="mm",
        )
        x += width + gap


def lockup(canvas: Image.Image, y: int, domain_size: int) -> None:
    """Domain with the gold mark just before it, centered."""
    d = ImageDraw.Draw(canvas)
    f = font("Vazirmatn-Regular", domain_size)
    domain = "kianakhorsand.ir"
    text_w = d.textlength(domain, font=f)

    mark_size = int(domain_size * 1.5 * S)
    mark = Image.open(ASSETS / "mark-gold.png").convert("RGBA").resize(
        (mark_size, mark_size), Image.LANCZOS
    )
    gap = 12 * S
    total = mark_size + gap + text_w
    x = (canvas.width - total) / 2
    canvas.alpha_composite(mark, (int(x), int(y + (domain_size * S * 0.5) - mark_size / 2)))
    d.text(
        (x + mark_size + gap, y + domain_size * S * 0.62),
        domain,
        font=f,
        fill=(*INK_SOFT, 255),
        anchor="lm",
    )


def hairline(canvas: Image.Image, y: int, inset: float = 0.18) -> None:
    d = ImageDraw.Draw(canvas)
    d.line(
        [(canvas.width * inset, y), (canvas.width * (1 - inset), y)],
        fill=(*INK, 28),
        width=max(1, int(1 * S)),
    )


# --------------------------------------------------------------------------- card


def build(recipe: Recipe) -> Path:
    W, H = recipe.width, recipe.height
    canvas = paper(W, H)
    d = ImageDraw.Draw(canvas)

    # Oversized arcs echoing the portrait frame.
    echo = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    ed = ImageDraw.Draw(echo)
    ed.arc(
        (
            int(-0.14 * W * S),
            int(0.30 * H * S),
            int(0.72 * W * S),
            int(1.18 * H * S),
        ),
        start=300,
        end=120,
        fill=(*GOLD, 48),
        width=max(2, int(1.2 * S)),
    )
    ed.arc(
        (
            int(0.62 * W * S),
            int(-0.16 * H * S),
            int(1.22 * W * S),
            int(0.62 * H * S),
        ),
        start=120,
        end=300,
        fill=(*GOLD, 34),
        width=max(2, int(1.2 * S)),
    )
    canvas.alpha_composite(echo)

    # Brand mark at the top.
    mark_size = recipe.mark * S
    mark = Image.open(ASSETS / "mark-gold.png").convert("RGBA").resize(
        (mark_size, mark_size), Image.LANCZOS
    )
    canvas.alpha_composite(mark, ((canvas.width - mark_size) // 2, 66 * S))

    # Portrait plate. Drawn 1:1 with the output grid (the whole canvas is supersampled
    # by S, so photo_w is already in final-pixel units and never resampled twice).
    pw, ph = recipe.photo_w * S, recipe.photo_h * S
    px = (canvas.width - pw) // 2
    py = recipe.photo_top * S

    shadow = Image.new("L", (pw + 70 * S, ph + 70 * S), 0)
    ImageDraw.Draw(shadow).rounded_rectangle(
        (35 * S, 35 * S, pw + 35 * S, ph + 35 * S), radius=int(pw * 0.42), fill=90
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(34 * S))
    shadow_layer = Image.new("RGBA", shadow.size, (122, 98, 122, 255))
    shadow_layer.putalpha(shadow)
    canvas.alpha_composite(shadow_layer, (px - 35 * S, py + 10 * S))

    canvas.alpha_composite(portrait(pw, ph), (px, py))

    outer = arch_line((pw + 30 * S, ph + 30 * S), max(2, int(1.2 * S)), (*GOLD, 110))
    canvas.alpha_composite(outer, (px - 15 * S, py - 15 * S))

    # Copy.
    f_name = font("Vazirmatn-ExtraBold", recipe.name_size)
    y_name = py + ph + int(46 * S)
    d.text((canvas.width // 2, y_name), "کیانا خرسند", font=f_name, fill=(*INK, 255), anchor="ma")

    f_role = font("Vazirmatn-Regular", recipe.role_size)
    y_role = y_name + int(recipe.name_size * 1.26 * S)
    d.text(
        (canvas.width // 2, y_role),
        "روان‌شناس بالینی  ·  آنلاین و حضوری",
        font=f_role,
        fill=(*INK_SOFT, 255),
        anchor="ma",
    )

    y_chips = y_role + int(recipe.role_size * 2.5 * S)
    # The role line already says «آنلاین و حضوری», so the pill adds different facts
    # taken from the site itself rather than repeating them.
    chip_line = "مشاورهٔ فردی، زوج و خانواده  ·  جلسه‌ی ۵۰ دقیقه‌ای  ·  رزرو آنلاین"
    f_chip = font("Vazirmatn-Regular", recipe.chip_size)
    chip_w = d.textlength(chip_line, font=f_chip)
    chip_h = int(recipe.chip_size * 2.3 * S)
    chip_pad = int(recipe.chip_size * 1.5 * S)
    d.rounded_rectangle(
        (
            (canvas.width - chip_w) / 2 - chip_pad,
            y_chips,
            (canvas.width + chip_w) / 2 + chip_pad,
            y_chips + chip_h,
        ),
        radius=chip_h // 2,
        fill=(255, 255, 255, 205),
        outline=(*GOLD, 110),
        width=max(2, int(1.2 * S)),
    )
    d.text(
        (canvas.width // 2, y_chips + chip_h // 2),
        chip_line,
        font=f_chip,
        fill=(*INK_SOFT, 255),
        anchor="mm",
    )

    if recipe.show_tagline:
        f_tag = font("Vazirmatn-Regular", recipe.role_size)
        d.text(
            (canvas.width // 2, y_chips + int(recipe.chip_size * 4.4 * S)),
            "جایی امن برای حرف‌زدن، فهمیدن و تغییر",
            font=f_tag,
            fill=(*TEAL, 255),
            anchor="ma",
        )

    hairline(canvas, canvas.height - int(96 * S))
    lockup(canvas, canvas.height - int(74 * S), recipe.domain_size)

    final = canvas.convert("RGB").resize((W, H), Image.LANCZOS)
    OUT.mkdir(parents=True, exist_ok=True)
    target = OUT / f"{recipe.name}.jpg"
    final.save(target, quality=93, optimize=True, progressive=True)
    return target


def main() -> None:
    for recipe in RECIPES:
        print("wrote", build(recipe))


if __name__ == "__main__":
    main()
