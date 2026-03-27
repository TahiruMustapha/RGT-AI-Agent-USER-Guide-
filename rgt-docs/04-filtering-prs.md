[← Documentation](/index) / Filtering PRs

---

# Filtering PRs

Control exactly which pull requests the bot reviews. By default it reviews everything except bot PRs.

---

## Skip bot PRs (on by default)

Dependabot, Renovate, and `github-actions[bot]` are skipped automatically. To turn this off:

```yaml
exclude-bots: "false"
```

---

## Filter by branch

Only review PRs going into `main` or `release/*`:

```yaml
include-base-branches: "main,release/*"
```

Skip PRs from `chore/` or `docs/` branches:

```yaml
exclude-head-branches: "chore/*,docs/*"
```

---

## Filter by label

Only review PRs that have a `needs-review` label:

```yaml
include-labels: "needs-review"
```

Skip PRs with `wip` or `do-not-review`:

```yaml
exclude-labels: "wip,do-not-review,skip-review"
```

---

## Filter by PR title/body keywords

Skip anything with WIP or draft in the title:

```yaml
skip-keywords: "WIP,draft,DO NOT MERGE"
```

Only review PRs that mention `feature` or `fix`:

```yaml
include-keywords: "feature,fix,bug"
```

---

## Filter by author

Only review PRs from specific people:

```yaml
include-authors: "alice,bob,carol"
```

Skip a specific bot or author:

```yaml
exclude-authors: "my-release-bot[bot]"
```

---

## Control when reviews trigger

Review only when a PR is first opened (not on every push):

```yaml
trigger-on-updates: "false"
```

Disable automatic reviews entirely (manual triggers only):

```yaml
skip-automatic: "true"
```

---

## Combining filters

Filters can be combined. All conditions must pass for a PR to be reviewed.

```yaml
- uses: ghcr.io/madibalive/copilot-for-github:latest
  with:
    provider: google
    api-key: ${{ secrets.GEMINI_API_KEY }}
    model: gemini-3-pro-preview
    include-base-branches: "main,release/*"
    exclude-labels: "wip,skip-review"
    skip-keywords: "WIP,draft"
    exclude-bots: "true"
```

---

## What happens when a PR is skipped

The bot posts a short comment on the PR explaining why it was skipped:

```
⏭️ Review skipped — PR matches exclude-labels filter: wip
```

---

> Template with filters pre-configured → [templates/workflows/03-filtered-review.yml](./templates/workflows/03-filtered-review.yml)

---

[← Team context](./03-team-context.md) | [Next: On-demand triggers →](./05-on-demand-triggers.md)
