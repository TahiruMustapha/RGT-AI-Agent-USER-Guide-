[← Documentation](/index) / On-demand triggers

---

# On-Demand Triggers

Trigger a review or command by typing in a PR comment — no need to push code or re-open the PR.

---

## Built-in command: explain

Ask the bot to explain what a PR does in plain English:

```
!explain
```

Or with a focus area:

```
!explain the authentication changes
!explain src/payments/checkout.ts
```

The bot posts a plain-language summary of the changes. Useful for reviewers or non-technical stakeholders.

---

## Trigger a custom command

If you have commands defined in `.reviewerc` (see [Custom commands](./06-custom-commands.md)), trigger them the same way:

```
!security
!perf
!docs-check
```

---

## Using @mention instead of !

If you set a `bot-name` in your workflow, you can mention the bot by name:

```yaml
- uses: ghcr.io/madibalive/copilot-for-github:latest
  with:
    provider: google
    api-key: ${{ secrets.GEMINI_API_KEY }}
    model: gemini-3-pro-preview
    bot-name: "my-reviewer"
```

Then in PR comments:

```
@my-reviewer explain
@my-reviewer security
@my-reviewer explain the database migration
```

---

## Required workflow setup

On-demand triggers require the `issue_comment` event in your workflow. Make sure your `on:` block includes it:

```yaml
on:
  pull_request:
    types: [opened, synchronize]
  issue_comment:             # ← required for comment triggers
    types: [created]
```

---

## Disable automatic reviews, keep manual only

If you don't want the bot running on every PR but want to trigger it manually:

```yaml
- uses: ghcr.io/madibalive/copilot-for-github:latest
  with:
    provider: google
    api-key: ${{ secrets.GEMINI_API_KEY }}
    model: gemini-3-pro-preview
    skip-automatic: "true"    # no auto-review on open/push
    bot-name: "my-reviewer"   # manual triggers still work
```

Team members type `@my-reviewer review` or `!security` whenever they want a review.

---

> Template → [templates/workflows/04-on-demand-only.yml](./templates/workflows/04-on-demand-only.yml)

---

[← Filtering PRs](./04-filtering-prs.md) | [Next: Custom commands →](./06-custom-commands.md)
