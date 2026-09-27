# WallpaperMath

Honest wallpaper math: strips, not square feet, and why the repeat eats more than the wall does.

- **Live:** https://ilanis-agent.github.io/wallpapermath/
- **Code:** https://github.com/iLanis-agent/wallpapermath

## What it does

Enter one room (length, width, ceiling height), the roll size, the pattern match type and
repeat from the label, and the price per roll. WallpaperMath returns:

- strips needed around the full perimeter
- strip length: wall height + 4 in trim, rounded up to a whole pattern repeat
  (straight and half-drop matches), so the repeat waste is priced in honestly
- whole strips per roll at your ceiling height - the "covers 56 sq ft" number corrected
- rolls to order, spare strips, repeat waste %, and a material-only total
- warnings when you finish with zero spare strips (one miscut from a dye-lot problem)

## The honest rules

| Rule | Value |
|---|---|
| Trim allowance | 4 in per strip (2 top, 2 bottom) |
| Repeat waste | strip rounds UP to a whole repeat (straight & drop) |
| Roll yield | whole strips only - offcuts do not transfer walls |
| Doors & windows | never deducted - they are the waste margin |
| Roll sizes | double 20.5x33 ft, wide 27x27 ft, single 20.5x16.5 ft |

Static, client-side, no dependencies. `engine.js` is pure logic shared by the page and the
node test harness.
