[← Documentation](/index) / Team context

---

# Team Context File

Tell the bot about your team's rules, patterns, and conventions. It reads this file on every review and adjusts what it looks for.

---

## How it works

Create a file at `.github/copilot-context.md` in your repo. No extra configuration needed — the bot picks it up automatically.

Write it like you're briefing a new engineer on what your team cares about.

---

## Example

```markdown
## Architecture
- All database access goes through the repository layer. Never query the DB directly from controllers or services.
- We use Result<T, E> types instead of throwing exceptions. Flag any new throw statements in business logic.

## Security
- Auth changes always need a second pair of eyes. Escalate as high-confidence finding.
- Never log request bodies or auth tokens. Flag any new logging in auth flows.

## Code style
- Avoid adding abstraction layers for single call-sites. Flag premature abstractions.
- Our API responses follow { data, error, meta } shape. Flag deviations.

## Testing
- Unit tests should not hit the database. Flag tests that import db directly.
- New public functions need at least one test.
```

---

## What to put in it

| Category | Examples |
|---|---|
| **Architecture rules** | "DB access only via repository layer", "no direct imports from other domains" |
| **Security rules** | "auth changes need escalation", "never log tokens" |
| **Patterns to flag** | "no throwing in business logic", "no direct env reads outside config/" |
| **Patterns to ignore** | "generated files in src/graphql/ are auto-generated, ignore them" |
| **Naming / style** | "we use snake_case for DB fields, camelCase in TS" |
| **Things to praise** | "acknowledge when new code adds tests proactively" |

---

## Tips

**Be specific, not aspirational**

```markdown
# Too vague — bot won't know what to do with this
Write clean code.

# Good — actionable and specific
All async functions must handle errors explicitly. Flag any async function without a try/catch or .catch().
```

**Tell it what to skip**

```markdown
# Ignore our legacy payment module — it's being rewritten
Files in src/legacy/payments/ are scheduled for deletion. Do not review them.
```

**Set severity expectations**

```markdown
# We care a lot about security
Any SQL query that concatenates user input should be flagged as HIGH severity, not medium.
```

---

## Using a different file path

If you want to store the context file somewhere else, set `context-file` in your workflow:

```yaml
- uses: ghcr.io/madibalive/copilot-for-github:latest
  with:
    provider: google
    api-key: ${{ secrets.GEMINI_API_KEY }}
    model: gemini-3-pro-preview
    context-file: .github/reviewer-context.md   # custom path
```

---

> Starter template → [templates/context/copilot-context.md](./templates/context/copilot-context.md)

---

[← Providers](./providers.md) | [Next: Filtering PRs →](./04-filtering-prs.md)
