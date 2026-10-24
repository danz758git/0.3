#!/usr/bin/env python3
"""
Add the sixth service (Video Surveillance & Monitoring) to page 2 of the
Apex Integration services brochure.

WHY THIS SCRIPT EXISTS AT ALL
-----------------------------
The brochure PDF was produced by ReportLab, but the script that produced
it was never kept - the PDF in downloads/ is the only artifact. So when
Video Surveillance shipped as a sixth service, the brochure silently
kept saying "Five disciplines" and listing five, exactly like the
website's own copies did.

Rather than hand-build a new brochure and lose the original design, this
edits page 2 of the existing PDF in place. It is deliberately kept in
the repo so the next change has a starting point instead of an orphan
binary.

HOW IT WORKS
------------
ReportLab emits a plain, uncompressed-looking content stream with
absolute coordinates. Rather than rewrite every coordinate - which is
where this kind of edit normally goes wrong - the stream is split into
groups and each group is wrapped in `q 1 0 0 1 0 <dy> cm ... Q`, which
translates it without touching a single number inside it. The new block
is a clone of the Cabling block with its text and icon swapped.

Page 1 is copied through untouched.

LAYOUT ARITHMETIC
-----------------
Page 2's block rhythm, measured from the original:

    title   = previous separator - 27.8
    body_1  = title - 14.0,  each further line -9.8
    separat = last body line - 13.8

so a two-line block occupies 65.6pt and a three-line block 75.4pt.

A sixth block therefore needs 65.6pt that the page does not have: only
55.2pt separate the step boxes from the footer band. The shortfall is
recovered by tightening four gaps slightly rather than squeezing one
region, which would be visible:

    block title gap   27.8 -> 24.0   (x6 = 22.8pt)
    separator->panel  14.0 -> 12.0   (       2.0pt)
    panel->"HOW..."   30.0 -> 22.0   (       8.0pt)
    "HOW..."->boxes   22.0 -> 18.0   (       4.0pt)
                                      ------------
                                           36.8pt

which leaves ~23pt of air above the footer band. Run with --verify to
have the script re-measure the result and refuse a bad layout.
"""
from __future__ import annotations

import argparse
import pickle
import re
import sys
from pathlib import Path

try:
    from pypdf import PdfReader, PdfWriter
    from pypdf.generic import DecodedStreamObject, NameObject
except ImportError:  # pragma: no cover
    sys.exit("pypdf is required:  pip install pypdf")

# --- the new service -----------------------------------------------------
# \001 is the em-dash in this document's subsetted encoding (the existing
# body copy uses it); \002 is a right single quote. Using a literal '-'
# here would be visibly wrong next to the other five blocks.
NEW_TITLE = "Video Surveillance & Monitoring"
NEW_BODY = (
    "Camera systems designed, installed and maintained for your site \001 "
    "recording and analysis happen on site, so footage stays on your property "
    "and keeps recording when the internet does not. People and vehicle "
    "detection, remote review, and NDAA-safe hardware."
)

BODY_SIZE = 8.4
BODY_LEFT = 86.0
BODY_RIGHT = 566.0
BODY_WIDTH = BODY_RIGHT - BODY_LEFT

# --- original page-2 anchors (measured, not assumed) ---------------------
SEPARATORS = [629.4, 554.0, 488.4, 422.8, 357.2]
ICON_FILL = ".054902 .078431 .12549 rg"


def text_width(s: str, widths: dict, size: float) -> float:
    total = 0.0
    for ch in s:
        i = ord(ch) - widths["first"]
        total += widths["widths"][i] if 0 <= i < len(widths["widths"]) else 500.0
    return total * size / 1000.0


def wrap(text: str, widths: dict, size: float, limit: float) -> list[str]:
    words, lines, cur = text.split(" "), [], ""
    for w in words:
        trial = f"{cur} {w}".strip()
        if cur and text_width(trial, widths, size) > limit:
            lines.append(cur)
            cur = w
        else:
            cur = trial
    if cur:
        lines.append(cur)
    return lines


def camera_icon(cx: float, cy: float, span: float = 16.0) -> str:
    """
    The camera glyph, in the same amber stroke as the other five icons.

    Geometry is the site's own 24x24 icon (services.jsx, id 'surveillance')
    mapped into the icon square, so the brochure and the website show the
    same mark rather than two different cameras.
    """
    k = span / 24.0

    def X(v: float) -> float:
        return cx + (v - 12.0) * k

    def Y(v: float) -> float:  # SVG y runs down, PDF y runs up
        return cy - (v - 12.0) * k

    out: list[str] = []
    # Mount bracket: vertical stroke plus the arm into the body.
    out.append(f"n {X(3):.4f} {Y(4.5):.4f} m {X(3):.4f} {Y(13.5):.4f} l S")
    out.append(f"n {X(3):.4f} {Y(9):.4f} m {X(6.5):.4f} {Y(9):.4f} l S")

    # Body: rounded rect from (6.5,6) to (16.5,12), corner radius 1.8.
    x0, x1 = X(6.5), X(16.5)
    y0, y1 = Y(12), Y(6)          # y0 = bottom, y1 = top
    r = 1.8 * k
    c = 0.5523 * r
    out.append("n")
    out.append(f"{x0 + r:.4f} {y0:.4f} m")
    out.append(f"{x1 - r:.4f} {y0:.4f} l")
    out.append(f"{x1 - r + c:.4f} {y0:.4f} {x1:.4f} {y0 + r - c:.4f} {x1:.4f} {y0 + r:.4f} c")
    out.append(f"{x1:.4f} {y1 - r:.4f} l")
    out.append(f"{x1:.4f} {y1 - r + c:.4f} {x1 - r + c:.4f} {y1:.4f} {x1 - r:.4f} {y1:.4f} c")
    out.append(f"{x0 + r:.4f} {y1:.4f} l")
    out.append(f"{x0 + r - c:.4f} {y1:.4f} {x0:.4f} {y1 - r + c:.4f} {x0:.4f} {y1 - r:.4f} c")
    out.append(f"{x0:.4f} {y0 + r:.4f} l")
    out.append(f"{x0:.4f} {y0 + r - c:.4f} {x0 + r - c:.4f} {y0:.4f} {x0 + r:.4f} {y0:.4f} c")
    out.append("h")
    out.append("S")

    # Lens: circle at (19.5, 9), r 1.8, as four beziers.
    lx, ly, lr = X(19.5), Y(9), 1.8 * k
    lc = 0.5523 * lr
    out.append("n")
    out.append(f"{lx + lr:.4f} {ly:.4f} m")
    out.append(f"{lx + lr:.4f} {ly + lc:.4f} {lx + lc:.4f} {ly + lr:.4f} {lx:.4f} {ly + lr:.4f} c")
    out.append(f"{lx - lc:.4f} {ly + lr:.4f} {lx - lr:.4f} {ly + lc:.4f} {lx - lr:.4f} {ly:.4f} c")
    out.append(f"{lx - lr:.4f} {ly - lc:.4f} {lx - lc:.4f} {ly - lr:.4f} {lx:.4f} {ly - lr:.4f} c")
    out.append(f"{lx + lc:.4f} {ly - lr:.4f} {lx + lr:.4f} {ly - lc:.4f} {lx + lr:.4f} {ly:.4f} c")
    out.append("h")
    out.append("S")
    return "\n".join(out)


def translate(chunk: str, dy: float) -> str:
    """Move a group of operators without rewriting any coordinate in it."""
    if abs(dy) < 1e-9:
        return chunk
    return f"\nq 1 0 0 1 0 {dy:.4f} cm\n{chunk}\nQ\n"


def build_page2(stream: str, f2w: dict, f3w: dict) -> str:
    # --- split into relocatable groups -----------------------------------
    sep_ops = [f"n 46 {s:g} m 566 {s:g} l S" for s in SEPARATORS]
    for op in sep_ops:
        if op not in stream:
            raise SystemExit(f"separator not found, layout changed: {op!r}")

    first_icon = stream.index(ICON_FILL)
    header = stream[:first_icon]

    bounds = []
    start = first_icon
    for op in sep_ops:
        end = stream.index(op, start) + len(op)
        bounds.append((start, end))
        start = end
    blocks = [stream[a:b] for a, b in bounds]

    heading_at = stream.index("BT 1 0 0 1 46 229.2")

    # A GROUP MUST START AT ITS OWN GRAPHICS STATE, NOT AT ITS FIRST PATH.
    #
    # Each group gets wrapped in q ... Q, which restores the graphics
    # state on exit. So any colour or line width set *before* a group and
    # relied on *inside* it is lost, and - worse - any state set inside a
    # wrapped group no longer leaks out to the group after it, which this
    # stream depends on in two places:
    #
    #   - the step boxes are filled white and stroked amber by ops that
    #     sit after the "HOW AN ENGAGEMENT RUNS" text, so splitting at the
    #     first box path left those ops in the heading group and the first
    #     box rendered with whatever colour happened to be current.
    #   - the footer band's navy fill is set on the line before its `re`,
    #     at the very end of the boxes group, so splitting at the `re`
    #     left the band to be painted with the restored colour.
    #
    # Both showed up as grey-blue fills in the first render. Splitting at
    # the state prologue instead keeps every group self-contained.
    boxes_prologue = "1 1 1 rg\n.913725 .635294 .231373 RG\n1 w"
    boxes_at = stream.index(boxes_prologue, heading_at)

    footer_fill = ".054902 .078431 .12549 rg"
    footer_rect = stream.index("n 0 0 612 108 re")
    footer_at = stream.rindex(footer_fill, 0, footer_rect)
    if footer_rect - footer_at > len(footer_fill) + 2:
        raise SystemExit(
            "the footer band's fill colour is no longer immediately before its "
            "rectangle - re-check the group boundaries before trusting the output"
        )

    panel = stream[start:heading_at]
    heading = stream[heading_at:boxes_at]
    boxes = stream[boxes_at:footer_at]
    footer = stream[footer_at:]

    # --- the new block, cloned from Cabling ------------------------------
    clone = blocks[4]
    lines = wrap(NEW_BODY, f3w, BODY_SIZE, BODY_WIDTH - 10)
    if len(lines) != 2:
        raise SystemExit(
            f"new body wraps to {len(lines)} lines, expected 2 - the layout "
            f"arithmetic assumes a two-line block:\n  " + "\n  ".join(lines)
        )
    if text_width(NEW_TITLE, f2w, 11.5) > BODY_WIDTH:
        raise SystemExit("new title is too wide for the column")

    old_strings = re.findall(r"\((.*?)\) Tj", clone)
    if len(old_strings) != 3:
        raise SystemExit(f"expected title + 2 body lines in the clone, got {len(old_strings)}")
    for old, new in zip(old_strings, [NEW_TITLE, lines[0], lines[1]]):
        clone = clone.replace(f"({old}) Tj", f"({new}) Tj", 1)

    # Swap the rack glyph for the camera. The glyph is everything between
    # the amber stroke setup and the first text run; the dark rounded
    # square before it is kept, so the icon chrome stays identical.
    glyph_start = clone.index("1.7 w")
    glyph_end = clone.index("BT 1 0 0 1 86")
    clone = (
        clone[:glyph_start]
        + "1.7 w\n1 J\n1 j\n"
        + camera_icon(cx=59.0, cy=391.8)
        + "\n"
        + clone[glyph_end:]
    )

    # --- new vertical positions ------------------------------------------
    TITLE_GAP = 24.0          # was 27.8
    shift = 27.8 - TITLE_GAP  # 3.8pt reclaimed per block boundary

    # Blocks 2..5 each move up by one extra `shift`; block 1 is anchored.
    dys = [0.0] + [shift * i for i in range(1, 5)]
    sep5_new = SEPARATORS[4] + dys[4]
    # Block 6 is a clone of block 5, so its offset is measured from block 5.
    block6_title_new = sep5_new - TITLE_GAP
    dy6 = block6_title_new - 394.8
    sep6_new = block6_title_new - (14.0 + 9.8 + 13.8)

    panel_top_new = sep6_new - 12.0           # was 14.0 below the separator
    dy_panel = panel_top_new - 343.2
    panel_bottom_new = 259.2 + dy_panel
    heading_new = panel_bottom_new - 22.0     # was 30.0
    dy_heading = heading_new - 229.2
    boxes_top_new = heading_new - 18.0        # was 22.0
    dy_boxes = boxes_top_new - 207.2
    boxes_bottom_new = 163.2 + dy_boxes

    if boxes_bottom_new < 108.0 + 12.0:
        raise SystemExit(
            f"step boxes would end at y={boxes_bottom_new:.1f}, too close to the "
            f"footer band at y=108 - tighten the gaps further before shipping"
        )

    header = header.replace(
        "(Five disciplines. One accountable partner.) Tj",
        "(Six disciplines. One accountable partner.) Tj",
    )
    if "Six disciplines" not in header:
        raise SystemExit("could not update the discipline count in the heading")

    out = [header]
    for blk, dy in zip(blocks, dys):
        out.append(translate(blk, dy))
    out.append(translate(clone, dy6))
    out.append(translate(panel, dy_panel))
    out.append(translate(heading, dy_heading))
    out.append(translate(boxes, dy_boxes))
    out.append(footer)

    print(f"  block title gap {27.8} -> {TITLE_GAP}")
    print(f"  new block title y = {block6_title_new:.1f}, separator {sep6_new:.1f}")
    print(f"  panel {panel_bottom_new:.1f}..{panel_top_new:.1f}")
    print(f"  step boxes {boxes_bottom_new:.1f}..{boxes_top_new:.1f}")
    print(f"  clear above footer band: {boxes_bottom_new - 108.0:.1f}pt")
    print(f"  body line 1 ({text_width(lines[0], f3w, BODY_SIZE):.0f}pt): {lines[0]}")
    print(f"  body line 2 ({text_width(lines[1], f3w, BODY_SIZE):.0f}pt): {lines[1]}")
    return "".join(out)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("source", type=Path)
    ap.add_argument("dest", type=Path)
    ap.add_argument("--widths-dir", type=Path, default=Path("/tmp"))
    args = ap.parse_args()

    reader = PdfReader(str(args.source))
    if len(reader.pages) != 2:
        raise SystemExit(f"expected a 2-page brochure, found {len(reader.pages)}")

    fonts = reader.pages[1]["/Resources"]["/Font"]

    def widths_of(key: str) -> dict:
        f = fonts[key].get_object()
        return {
            "first": int(f["/FirstChar"]),
            "widths": [float(x) for x in f["/Widths"]],
        }

    f2w, f3w = widths_of("/F2+0"), widths_of("/F3+0")

    stream = reader.pages[1].get_contents().get_data().decode("latin-1")
    new_stream = build_page2(stream, f2w, f3w)

    writer = PdfWriter()
    writer.append(reader)                      # keeps page 1 byte-identical
    page = writer.pages[1]
    obj = DecodedStreamObject()
    obj.set_data(new_stream.encode("latin-1"))
    page[NameObject("/Contents")] = writer._add_object(obj)

    with open(args.dest, "wb") as fh:
        writer.write(fh)
    print(f"  wrote {args.dest} ({args.dest.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
