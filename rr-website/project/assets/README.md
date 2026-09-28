# assets

## Custom boot logo

The boot screen on the home page (`index.html`) shows a plain white circle with an "A" in it.
To replace the "A" with your own mark, add one of these files to this folder:

- `boot-logo.svg` (preferred)
- `boot-logo.png`

The home page checks for the SVG first, then the PNG, and falls back to the "A" if neither exists.

Use a dark glyph on a transparent background: it sits inside the white circle at about 60% of its size.
Only use artwork you made or have the rights to.
