[← Documentation](/index) / Nightly maintenance

---

# Nightly Maintenance

Run the bot on a schedule — no PR needed. Useful for catching docs drift, enforcing policies, or any task that should happen regularly.

---

## How it works

1. A scheduled GitHub Actions workflow runs on a cron
2. The bot reads your `.reviewerc` to find which commands to run for that job
3. It uses git history to understand what changed
4. If it makes file edits, it opens a PR for your team to review — never pushes directly to main

---

## Example: nightly docs check

**`.github/workflows/nightly.yml`:**

```yaml
name: Nightly Maintenance

on:
  schedule:
    - cron: "0 2 * * *"   # every night at 2am UTC
  workflow_dispatch:        # also allow manual run from Actions tab

permissions:
  contents: write
  pull-requests: write

jobs:
  nightly-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0    # required — bot needs full git history to detect drift
      - uses: ghcr.io/madibalive/copilot-for-github:latest
        with:
          provider: google
          api-key: ${{ secrets.GEMINI_API_KEY }}
          model: gemini-3-pro-preview
```

**`.reviewerc`** (add to or create at repo root):

```yaml
version: 1

commands:
  - id: docs-drift
    title: "Docs drift check"
    prompt: |
      Compare README.md and docs/ against code changes from the last 24 hours.
      Update any sections that no longer match the code.
      When done: git add <files>, git commit -m "docs: sync with recent changes", then push_pr.
    tools:
      allow: [filesystem, git.history, repo.write, github.pr.manage]

schedule:
  enabled: true
  runs:
    nightly-docs: [docs-drift]   # job name must match the workflow job name
  writeScope:
    include: ["README.md", "docs/**"]   # bot can only edit these paths
```

> The job name in `schedule.runs` must exactly match the job name in your workflow (`nightly-docs` above).

---

## What happens

- Bot checks git history for the last 24 hours
- If docs are out of date, it edits them and opens a PR
- If nothing is outdated, it does nothing — no empty PRs
- Your team reviews and merges the PR

---

## Safety guardrails (always enforced)

- The bot **never pushes directly to main** — always opens a PR
- `writeScope` limits which files it can edit
- `.github/workflows/**` and `.reviewerc` are always blocked from edits
- If no changes were made, `push_pr` fails with a clear message

---

## Multiple scheduled jobs

Run different jobs on different schedules using separate workflow files:

```yaml
# .github/workflows/nightly-docs.yml
on:
  schedule:
    - cron: "0 2 * * *"   # every night
jobs:
  nightly-docs: ...
```

```yaml
# .github/workflows/weekly-security.yml
on:
  schedule:
    - cron: "0 8 * * 1"   # every Monday
jobs:
  weekly-security: ...
```

**`.reviewerc`:**
```yaml
schedule:
  enabled: true
  runs:
    nightly-docs: [docs-drift]
    weekly-security: [security-audit]
```

---

## Run manually any time

Both workflow files have `workflow_dispatch:` so you can trigger them from:

**Actions tab → select workflow → Run workflow**

---

## Limit scope with conditions

Only run the docs job if README or docs actually changed recently:

```yaml
schedule:
  runs:
    nightly-docs: [docs-drift]
  conditions:
    paths:
      include: ["README.md", "docs/**"]
```

---

> Ready-to-use templates:
> - [templates/workflows/05-nightly-docs.yml](./templates/workflows/05-nightly-docs.yml)
> - [templates/workflows/06-weekly-security.yml](./templates/workflows/06-weekly-security.yml)
> - [templates/reviewerc/03-nightly-docs.reviewerc](./templates/reviewerc/03-nightly-docs.reviewerc)

---

[← Custom commands](./06-custom-commands.md) | [Next: Learning from reactions →](./08-learning.md)
