# Team Context
#
# TEMPLATE: Copy this to .github/copilot-context.md in your repo.
# Edit it to reflect your team's actual conventions.
# The bot reads this on every review — no other setup needed.
#
# TIP: Be specific and actionable. Vague rules ("write clean code") don't help.
# TIP: Tell it what to ignore as well as what to flag.

## Architecture

- All database access goes through the repository layer. Never query the DB directly
  from controllers or services. Flag any direct DB imports outside of `src/repositories/`.
- We use Result<T, E> types instead of throwing exceptions. Flag any new `throw` statements
  in business logic (top-level error boundaries in index.ts are fine).
- Domain modules must not import from each other directly. Cross-domain access goes
  through the service layer.

## Security

- Auth and permission changes always need escalation. Flag these as HIGH confidence
  findings so a second reviewer is prompted.
- Never log request bodies, auth tokens, or PII. Flag any new logging in auth flows
  or user data handlers.
- All user-supplied input must be validated before use. Flag missing validation at
  API boundaries.

## Code patterns

- Avoid adding abstraction layers for single call-sites. Flag premature abstractions
  (e.g., an interface with only one implementation, a utility function called once).
- New public functions and API endpoints must have at least one test. Flag additions
  without test coverage.
- We use `snake_case` for database fields and `camelCase` in TypeScript. Flag mismatches
  at the boundary (ORM models, query results).

## What to ignore

- `src/generated/` — all files here are auto-generated. Do not review them.
- Lock files, migration files, and snapshot files — skip entirely.
- Missing JSDoc comments — we don't require documentation comments.
- Line length and formatting — handled by our linter, not the reviewer.

## Severity guidance

- SQL injection, auth bypass, exposed secrets → always HIGH
- Missing error handling on external calls → MEDIUM
- Performance issues in hot paths → MEDIUM
- Code style suggestions → LOW or omit entirely
