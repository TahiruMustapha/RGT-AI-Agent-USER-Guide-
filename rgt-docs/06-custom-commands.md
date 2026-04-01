[← Documentation](/index) / Custom commands

---

# Custom Commands

Define reusable review commands tailored to your team. Commands run as focused sub-agents with a specific goal.

---

## The `.reviewerc` file

Create `.reviewerc` at your repo root to define commands.

```yaml
version: 1

commands:
  - id: security
    title: "Security scan"
    prompt: |
      Review for auth bypass, hardcoded secrets, unsafe deserialization,
      and input validation gaps. Flag anything HIGH severity immediately.
```

---

## Running a command automatically on every PR

Add the command id to `review.run`:

```yaml
version: 1

commands:
  - id: security
    title: "Security scan"
    prompt: |
      Review for auth bypass, unsafe deserialization, secrets in code,
      and missing input validation.

review:
  run: [security]   # runs automatically on every PR
```

---

## Running a command manually

Commands NOT in `review.run` can be triggered on demand from a PR comment:

```
!security
```

---

## Multiple commands

```yaml
version: 1

commands:
  - id: security
    title: "Security scan"
    prompt: |
      Review for auth bypass, hardcoded secrets, and input validation gaps.

  - id: perf
    title: "Performance review"
    prompt: |
      Look for N+1 queries, unnecessary allocations, missing DB indexes,
      and synchronous calls that should be async.

  - id: tests
    title: "Test coverage check"
    prompt: |
      Check if new functions and logic changes have corresponding tests.
      Flag anything that adds business logic without a test.

review:
  run: [security]       # security runs automatically
  # perf and tests are manual: type !perf or !tests in a PR comment
```

---

## Limiting what a command can do

By default commands inherit the global tool allowlist. You can restrict further with `tools.allow`:

```yaml
commands:
  - id: security
    prompt: "Review for security issues."
    tools:
      allow: [filesystem, git.read, github.pr.read]
      # This command can only read files and PR info — cannot post comments itself
```

Available tool categories:

| Category | What it gives access to |
|---|---|
| `filesystem` | Read files, search content |
| `git.read` | PR diffs and changed files |
| `git.history` | Git log and history |
| `github.pr.read` | PR metadata, existing comments |
| `github.pr.feedback` | Post comments and suggestions |
| `github.pr.manage` | Open/update PRs (scheduled use) |
| `repo.write` | Edit files (scheduled use) |

---

## Setting output limits

Prevent noisy commands from flooding the PR:

```yaml
commands:
  - id: security
    prompt: "Review for security issues."
    limits:
      maxFiles: 100
      maxFindings: 10    # post at most 10 comments
    output:
      severityFloor: medium   # only report medium and above
```

---

## Setting default model per review

```yaml
review:
  defaults:
    provider: google
    model: gemini-3-pro-preview
    reasoning: medium
    temperature: 1.0
  run: [security]
```

This overrides the workflow `with:` defaults for review runs.

---

> Ready-to-use templates:
> - [templates/reviewerc/02-security.reviewerc](./templates/reviewerc/02-security.reviewerc)
> - [templates/reviewerc/04-full-example.reviewerc](./templates/reviewerc/04-full-example.reviewerc)

---

[← On-demand triggers](./05-on-demand-triggers) | [Next: Nightly maintenance →](./07-nightly-maintenance)
