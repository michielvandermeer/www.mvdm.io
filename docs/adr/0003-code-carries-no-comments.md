# Code carries no comments

This site follows mvdmio-suite's comment rule ([#1433](https://github.com/michielvandermeer/mvdmio-suite/issues/1433), the suite's [ADR-0038](https://github.com/michielvandermeer/mvdmio-suite/blob/master/docs/adr/0038-code-carries-no-comments.md)). Code explains itself through names and structure. A reason that a name cannot carry goes into an ADR, and the history of a line lives in git. A comment drifts from the code it describes, and nothing notices when it does.

The deploy fails on a comment in the files the suite's rule would reach if this site were in the suite:

- A `<!-- -->` comment in any tracked HTML file. That is the suite's Razor markup comment, and here it covers every page and `assets/share-card.html`.
- A `//` or `/* */` comment in a tracked `.js` file or in an inline `<script>` of an HTML file. These are the site's browser scripts, the same role the suite's checked TypeScript files play.

The check is a step in the Pages deploy workflow, right after the address check. Like that step, it reads the committed files before anything is built, lists every comment it finds in one run, and fails the deploy. A comment that reaches `main` therefore keeps the live site on its previous version until a fix lands.

Unlike the suite, this site allows no exceptions. It has no `#pragma` lines, no package whose users read doc comments, and no tool that reads a `pre-review:` waiver.

## Considered Options

- **State the rule in `AGENTS.md` with no check.** Rejected because nothing would stop a comment from coming back, and every sibling repo enforces the rule with a check.
- **Leave the site out of the rule.** Rejected because the site would be the one mvdmio repo where a comment is still allowed in its markup and scripts.
- **Run the check on pull requests too.** Rejected because the repo has no pull request workflow, and adding one means a second workflow and moving the check out of the deploy step into a tracked script. A failed deploy costs little: the live site stays up on its previous version.
- **Cover CSS, the workflow's YAML, and its inline Node, Python, and shell.** Rejected, as in the suite: CSS, YAML, and shell are left out there too, and the deploy's inline scripts are build tooling, not code the site serves.

## Consequences

- The `.agents/` prototypes are not checked, because the site never serves them.
- To find a deleted reason, run `git log -S` with its text.
