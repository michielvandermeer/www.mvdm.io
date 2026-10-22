# Tracker: GitHub Issues

Issues live as GitHub issues in this repo's GitHub repository. Use the `gh` CLI, which takes the repository from `git remote -v`. Pass multi-line text with `--body-file`. When `gh auth status` fails, stop and say so.

## Settings

- Repository: `michielvandermeer/www.mvdm.io`

## Issues

- **Reference**: `#<number>` or the issue's URL. A run's slug is the number plus the title in kebab case, such as `42-teams-notifications`; the leading number finds the Issue a slug names.
- **File**: `gh issue create --title "…" --body-file <file> --label <status>`, adding the category and context labels. GitHub drops labels silently from an account without triage access: read them back, and name any that are missing in your report. The Issue then counts as `needs-triage`.
- **Read**: `gh issue view <n> --json number,title,body,labels,state,assignees,comments`, plus its blockers.
- **Claim for implement**: `/implement` and `/hillclimb` claim the Issue before any other work on it. Read the assignees with the Read command. The current user is `gh api user --jq .login`. When an assignee is someone else, stop and name them. Do not change the assignees. When the only assignee is the current user, continue. When there is no assignee, run `gh issue edit <n> --add-assignee @me`, then read the assignees again. Continue only when the only assignee is the current user. When someone else is also assigned, run `gh issue edit <n> --remove-assignee @me` and stop. The assignee stays after the run halts or lands. A later run by that same user continues.
- **Claim for grilling**: a `/grilling` session that starts from an Issue (including `/grill-with-docs`) claims it in round 1, before any question is asked. Read the assignees with the Read command. The current user is `gh api user --jq .login`. When there is no assignee, run `gh issue edit <n> --add-assignee @me`. When the only assignee is the current user, do nothing. When someone else is assigned, leave the assignees alone, name them, and ask whether to grill anyway. A session with no starting Issue claims nothing. An Issue filed during the session for a branch we cut is not claimed. The assignee stays after the session ends, unless the session sets the Issue to `ready-for-agent`: then **Release the claim** clears it.
- **Release the claim**: a Spec is ready for the implementation bot only when no one is assigned, since an assignee marks the Issue as in progress. After a session sets an Issue to `ready-for-agent`, clear every assignee as its last write, once the body and labels are final. Read them with `gh issue view <n> --json assignees --jq '[.assignees[].login] | join(",")'`. When the result is not empty, run `gh issue edit <n> --remove-assignee <that result>`, then read the assignees again and confirm none remain. This covers `/triage`, `/grill-with-docs`, `/to-spec`, and any other session that files or rewrites a Spec. An Issue set to any other status keeps its assignee. A Decision ticket's claim is not released this way.
- **List by status**: `gh issue list --state open --label <status> --json number,title,labels`. `needs-triage` is every open issue that carries no status label.
- **Rewrite the body**: `gh issue edit <n> --body-file <file>`.
- **Set status**: `gh issue edit <n> --remove-label <old> --add-label <new>`. An issue carries one status label at a time. Setting `ready-for-agent` is followed by **Release the claim**.
- **Set category**: `gh issue edit <n> --add-label <category>`, removing the other category label.
- **Comment**: `gh issue comment <n> --body-file <file>`.
- **Link as blocked by**: `gh api --method POST repos/michielvandermeer/www.mvdm.io/issues/<n>/dependencies/blocked_by -F issue_id=<id>`, where `<id>` is the blocker's database id from `gh api repos/michielvandermeer/www.mvdm.io/issues/<blocker> --jq .id`, not its number. Read them with `gh api repos/michielvandermeer/www.mvdm.io/issues/<n>/dependencies/blocked_by`. Where dependencies are unavailable, put `Blocked by: #<n>, #<n>` at the top of the body. A blocker is open while its issue is open.
- **Close as done**: `gh issue close <n> --reason completed --comment "…"`.
- **Close as not planned**: `gh issue close <n> --reason "not planned" --comment "…"`.
- **Closing reference**: a `Closes #<n>` line in the landing commit's message. GitHub closes the issue when that commit reaches the default branch. A blocker has landed on a branch when `git log <branch> --grep "Closes #<n>"` finds a commit.

## Statuses

Each status is a label of the same name: `needs-triage`, `needs-info`, `needs-grilling`, `needs-human`, `wayfinding`, `ready-for-agent`, `ready-for-human`. The category is the `bug` or `enhancement` label. In a repo with a `CONTEXT-MAP.md`, the context is a label named and picked as the plugin's `skills/domain-modeling/CONTEXT-PATHS.md` names and picks a context subfolder, `common` included.

## Maps and Decision tickets

A Map is an Issue labelled `wayfinding`. Its Decision tickets are its sub-issues.

- **File a ticket**: file an issue labelled `wayfinder:<type>` — `research`, `prototype`, `grilling`, or `task` — then attach it with `gh api --method POST repos/michielvandermeer/www.mvdm.io/issues/<map>/sub_issues -F sub_issue_id=<id>`, using the ticket's database id. Where sub-issues are unavailable, put `Part of #<map>` at the top of its body and add it to a task list in the Map's body.
- **Claim**: `gh issue edit <n> --add-assignee @me`, before any other work. A ticket with no assignee is unclaimed.
- **Blocked by**: as for Issues.
- **List the tickets**: `gh api repos/michielvandermeer/www.mvdm.io/issues/<map>/sub_issues`, with each ticket's state, assignee, and blockers.
- **List the frontier**: the tickets that are open, with no assignee and no open blocker, in the Map's order.
- **Resolve**: comment the answer under `## Answer`, close the ticket as done, and add a line linking it to the Map's Decisions so far.
- **Rule out of scope**: close the ticket as not planned, with a comment saying why.
