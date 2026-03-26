[← Documentation](./index.md) / FAQ

---

# FAQ

---

**Does it block merges or approve PRs?**
No. It posts comments and suggestions only. Merging is always your decision.

---

**Can I accept a suggestion with one click?**
Yes. Code suggestions appear as GitHub suggestion blocks with an "Apply suggestion" button directly on the PR.

---

**Will it re-review every time I push a new commit?**
Yes by default. Each follow-up only covers what changed since the last review — it won't repeat old findings.
Set `trigger-on-updates: "false"` to review only on PR open.

---

**How do I stop it reviewing Dependabot / Renovate PRs?**
It skips them automatically. Set `exclude-bots: "false"` to turn that off.

---

**Can I give it specific rules for our codebase?**
Yes — create `.github/copilot-context.md` with your conventions. See [Team context](./03-team-context.md).

---

**What happens if the PR has too many files?**
The bot posts a "Skipped" comment explaining why. Default limit is 50 files. Adjust with `max-files`.

---

**Does it work on private repos?**
Yes, as long as the workflow has `pull-requests: write` permission.

---

**Can I run it manually instead of automatically?**
Yes. Set `skip-automatic: "true"` and use `!command` or `@botname command` in PR comments. See [On-demand triggers](./05-on-demand-triggers.md).

---

**My workflow ran but the bot posted nothing. Why?**
Check the Actions run log for errors. Most common causes:
- Wrong secret name or invalid API key
- PR was filtered out (check filter settings)
- `pull-requests: write` permission is missing

---

**Can different repos use different models?**
Yes. Each repo has its own workflow file and its own `.reviewerc`. Set whatever model you want per repo.

---

**How do I make the bot focus only on security?**
Add a `security` command to `.reviewerc` and put it in `review.run`. See [Custom commands](./06-custom-commands.md).

---

**Does it support monorepos?**
Yes. Use `include-head-branches`, `include-base-branches`, or path-based filtering to scope it as needed. You can also describe the monorepo structure in `.github/copilot-context.md`.

---

**How do I reset what it has learned?**
Delete or clear `.github/copilot-learned.json` from your repo. The bot starts fresh on the next review.

---

**Can the bot open PRs itself?**
Yes, in scheduled maintenance mode. It never pushes directly to main — always opens a PR. See [Nightly maintenance](./07-nightly-maintenance.md).

---

**The bot is commenting on things we don't care about. How do I fix it?**
Two options:
1. 👎 those comments — it will learn to stop after a few reviews
2. Add instructions to `.github/copilot-context.md`: e.g. "Do not comment on missing JSDoc — we don't use it."

---

[← Options reference](./09-options-reference.md) | [↑ Back to top](./index.md)
