# Prototype — top bar reachability

Throwaway. Do not ship these files.

**Question:** how do people reach pages that no longer have a primary place in the top bar?

**Verdict:** variant C (a slim row of secondary links above the five Product names), plus a two-line footer. Variants A, B, and D were rejected. There is no Products index and no dropdown.

The script and stylesheet rewrote the live header and footer on every page, gated by `?variant=A|B|C|D`. Default after the verdict is C. The Products index HTML was only for variant B.

| Key | Name | What it tried |
| --- | --- | --- |
| A | Products dropdown | One Products control opens a panel. Blog and About stay in the top bar. |
| B | Products index | Products is one link to a new page. No menus. |
| C | Utility row | Open source, Blog, About, and Resume sit in a slim row that stays visible on a phone. All five Products stay in the main bar. |
| D | Flagship + More | Compliance and Translation Tools stay visible. Everything else sits behind More. |

Footer after the verdict (every variant):

1. mvdmio – Built by Michiel van der Meer – michiel@mvdm.io
2. Terms of Service – Privacy Notice – Data Processing Agreement – Subprocessors – Company details
