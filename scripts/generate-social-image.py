"""Export the social image from original Deck artwork and outlined local type.

Requires Python fontTools (with WOFF2 support) and ffmpeg with librsvg.
Uses the current generated card faces; generation provenance is retained in public/cards/.
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
import base64
import json
import subprocess
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
BASE = TTFont(ROOT / "public/fonts/hanken-grotesk-latin-wght-normal.woff2")


def text(content, x, y, size, color="#3D1C2E", weight=800, tracking=0):
    font = instantiateVariableFont(BASE, {"wght": weight}, inplace=False)
    glyphs = font.getGlyphSet()
    cmap = font.getBestCmap()
    scale = size / font["head"].unitsPerEm
    result = []
    position = 0
    for character in content:
        name = cmap.get(ord(character), ".notdef")
        glyph = glyphs[name]
        pen = SVGPathPen(glyphs)
        glyph.draw(pen)
        result.append(f'<path fill="{color}" transform="translate({x + position * scale},{y}) scale({scale},{-scale})" d="{pen.getCommands()}"/>')
        position += glyph.width + tracking / scale
    return "".join(result)


def asset(name, x, y, width, opacity=1):
    svg = ET.parse(ROOT / "public/brand" / name).getroot()
    viewbox = svg.attrib["viewBox"].split()
    scale = width / float(viewbox[2])
    children = "".join(ET.tostring(child, encoding="unicode") for child in svg if child.tag.endswith(("path", "g")))
    return f'<g opacity="{opacity}" transform="translate({x},{y}) scale({scale})">{children}</g>'


def card(x, y, angle, variant, currency, ending):
    ink = "#FFF8ED" if variant == "blackberry" else "#3D1C2E"
    face = ROOT / "public/cards" / f"deck-{variant}.webp"
    raster = subprocess.run([
        "ffmpeg", "-hide_banner", "-loglevel", "error", "-i", str(face),
        "-vf", "scale=740:-1", "-frames:v", "1", "-f", "image2pipe", "-c:v", "png", "pipe:1",
    ], stdout=subprocess.PIPE, check=True).stdout
    encoded = base64.b64encode(raster).decode("ascii")
    return (f'<g transform="translate({x},{y}) rotate({angle},185,116)">'
            f'<g clip-path="url(#card-crop)"><image x="-14" y="-9" width="398" height="251" href="data:image/png;base64,{encoded}"/></g>'
            f'{text(currency, 305, 181, 13, ink, 500)}'
            f'{text("VIRTUAL", 305, 193, 6, ink, 400, .4)}'
            f'{text("••••  " + ending, 27, 202, 13, ink, 500, .7)}</g>')


svg = ('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">'
       '<defs><clipPath id="card-crop"><rect width="370" height="233" rx="15"/></clipPath></defs>'
       '<rect width="1200" height="630" fill="#FDFBF8"/>'
       + asset("deck-horizontal-ink.svg", 56, 44, 116)
       + text("Every card.", 56, 265, 100, "#3D1C2E", 500, -3)
       + text("One Deck.", 56, 365, 100, "#3D1C2E", 500, -3)
       + text("Your personal and business cards.", 60, 432, 23, "#705665", 400)
       + text("Together in one app.", 60, 467, 23, "#705665", 400)
       + card(755, 80, -12, "lilac", "USD", "6208")
       + card(660, 237, -3, "blackberry", "NGN", "1094")
       + card(785, 365, 10, "ember", "NGN", "4821")
       + text("DECK CARDS", 60, 590, 11, "#705665", 500, .7)
       + '</svg>')
output = ROOT / "public/og-deck.svg"
output.write_text(svg)
subprocess.run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", str(output), "-frames:v", "1", str(ROOT / "public/og-deck.png")], check=True)
(ROOT / "public/og-deck.png.provenance.json").write_text(json.dumps({
    "origin": "Authored SVG composition with original Deck logos, outlined local Hanken Grotesk and the current image_gen card faces.",
    "generator": "scripts/generate-social-image.py",
    "cardArtwork": "Built-in image_gen; exact prompts in public/cards/provenance.json",
    "renderedWith": "fontTools and ffmpeg/librsvg",
}, indent=2))
print("Generated public/og-deck.png (1200 × 630)")
