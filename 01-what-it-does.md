[← Documentation](./index.md)

---

# What is Copilot for GitHub?

An AI that automatically reviews your pull requests — like having a senior developer read every PR before it gets merged.

---

## What it does on every PR

When someone opens or updates a pull request, the bot:

1. Reads the changed files in full (not just the diff)
2. Explores related files for context
3. Posts **inline comments** on specific lines
4. Posts **code suggestions** you can accept in one click
5. Posts a **summary** at the end with an overall verdict

---

## What a review looks like

```
src/auth/login.ts line 42
──────────────────────────────────────────────────────
🔴 HIGH — SQL Injection Risk

The query on line 42 concatenates user input directly.
Use a parameterized query instead:

  Suggestion:
  - const result = await db.query("SELECT * FROM users WHERE email = " + email)
  + const result = await db.query("SELECT * FROM users WHERE email = $1", [email])
```

At the bottom of the PR, a summary appears:

```
## Review Summary

Verdict: Request Changes

Found 1 high-severity issue, 2 suggestions.

### Issues
- SQL injection risk in auth/login.ts:42 (HIGH)
- Missing error handling in api/users.ts:88 (MEDIUM)
```

---

## What it does NOT do

| ✅ Does | ❌ Does not |
|---|---|
| Post comments and suggestions | Block or approve merges |
| Review logic and security | Replace your linter |
| Learn from 👍 / 👎 reactions | Write or commit code itself |
| Explain code in plain English | Run your tests |
| Open maintenance PRs on a schedule | Auto-merge anything |

---

[Next: Setup →](./02-setup.md)
