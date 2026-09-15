# Share card pictures are rendered at deploy time, not committed

GitHub Pages serves this repository exactly as committed, and the site has no
build step for its pages — so a reader reasonably expects every file a page
references to be in the repository. Share card pictures are the exception. Each
of the 35 pages points `og:image` at a PNG under `assets/share-cards/`, and none
of those PNGs is in git. They are rendered during the Pages deploy by the same
headless Chromium that already turns the five Legal pages into PDFs, and they
exist only in the published site.

We chose this over committing 35 hand-drawn pictures because a committed picture
and the page it advertises drift apart. A card carries the page's own headline;
if the headline is edited and the picture is not, the card starts advertising
copy that no longer exists, and nothing in the repository would catch it.
Rendering from the page makes that disagreement impossible, which is the same
bargain `/legal/` already makes: a Legal page and its PDF are always made
together, so they cannot contradict each other.

The cost is real and worth stating. You cannot open a card locally without
running the deploy step yourself, so a design change to the template is checked
by deploying or by driving Chromium by hand. The pictures are also a hard
dependency on a network fetch at deploy time, because the card is set in Source
Serif 4 and IBM Plex Mono from Google Fonts. Both failure modes are loud rather
than quiet: the render step runs under `set -euo pipefail`, so a card that
cannot be drawn fails the deploy instead of publishing a page that points at a
missing picture.
