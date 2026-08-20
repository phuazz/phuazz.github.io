#!/usr/bin/env python3
"""Render og-image.svg to og-image.png at exactly 1200x630.

Uses headless Chrome (or Edge as a fallback) so the Google Fonts referenced by
the SVG (Newsreader, DM Sans, JetBrains Mono) render exactly as the site does.
Network access is required at render time; if the fonts fail to load the text
silently falls back to Georgia / system fonts, so ALWAYS open the produced PNG
and read every string before committing it (per C:\\dev\\VISUAL_DESIGN.md).

Usage:
    python scripts/render_og.py [--svg PATH] [--out PATH]

Set OG_BROWSER to a Chrome/Edge executable to override browser discovery.
"""
import argparse
import os
import shutil
import struct
import subprocess
import sys
import tempfile
from pathlib import Path

WIDTH, HEIGHT = 1200, 630  # must match the og:image:width/height meta tags

CANDIDATE_BROWSERS = [
    os.environ.get("OG_BROWSER"),
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    shutil.which("chrome"),
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    shutil.which("msedge"),
]


def find_browser() -> str:
    for p in CANDIDATE_BROWSERS:
        if p and Path(p).is_file():
            return p
    sys.exit("No Chrome/Edge executable found; set OG_BROWSER to one.")


def png_dimensions(path: Path) -> tuple[int, int]:
    head = path.read_bytes()[:24]
    if head[:8] != b"\x89PNG\r\n\x1a\n" or head[12:16] != b"IHDR":
        sys.exit(f"{path} is not a valid PNG")
    return struct.unpack(">II", head[16:24])


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--svg", type=Path, default=root / "og-image.svg")
    ap.add_argument("--out", type=Path, default=root / "og-image.png")
    args = ap.parse_args()

    svg = args.svg.resolve()
    out = args.out.resolve()
    if not svg.is_file():
        sys.exit(f"SVG source not found: {svg}")

    browser = find_browser()
    # A throwaway profile keeps a running desktop browser from hijacking the
    # flags; the virtual time budget lets the web fonts finish loading.
    with tempfile.TemporaryDirectory() as profile:
        cmd = [
            browser,
            "--headless=new",
            f"--user-data-dir={profile}",
            "--disable-gpu",
            "--disable-extensions",
            "--hide-scrollbars",
            "--force-device-scale-factor=1",
            f"--window-size={WIDTH},{HEIGHT}",
            "--default-background-color=FFFFFFFF",
            "--virtual-time-budget=15000",
            f"--screenshot={out}",
            svg.as_uri(),
        ]
        run = subprocess.run(cmd, capture_output=True, text=True)
        if run.returncode != 0:
            sys.exit(f"Browser exited {run.returncode}:\n{run.stderr.strip()}")

    if not out.is_file():
        sys.exit(f"Browser produced no screenshot at {out}")
    w, h = png_dimensions(out)
    if (w, h) != (WIDTH, HEIGHT):
        sys.exit(f"Rendered {w}x{h}; expected {WIDTH}x{HEIGHT}")
    print(f"OK: {out} ({w}x{h}, {out.stat().st_size:,} bytes) via {browser}")


if __name__ == "__main__":
    main()
