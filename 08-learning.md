[← Documentation](./index.md) / Learning from reactions

---

# Learning from Reactions

The bot gets smarter over time by watching how your team reacts to its comments.

---

## How it works

- 👍 a comment → bot will make **more** observations like that in future reviews
- 👎 a comment → bot will **stop** making that kind of comment

Preferences are saved to `.github/copilot-learned.json` in your repo and applied on every subsequent review.

---

## Setup

Learning is on by default. You just need the right permissions in your workflow:

```yaml
permissions:
  contents: write      # saves preferences to .github/copilot-learned.json
  pull-requests: write
  issues: read         # reads 👍/👎 reactions on comments
```

This is already included in the standard setup from [Setup](./02-setup.md).

---

## Example

The bot flags a comment style your team finds unhelpful:

```
# Bot posts this:
Consider adding a comment here to explain the logic.

# Developer reacts 👎
```

Next time the bot is tempted to suggest adding a comment in a similar spot, it suppresses it.

Conversely:

```
# Bot posts this:
This function has no error handling — if the API call fails, the caller gets an unhandled rejection.

# Developer reacts 👍
```

The bot learns your team values this kind of finding and will continue surfacing it.

---

## Where preferences are stored

After each review, preferences are committed to:

```
.github/copilot-learned.json
```

This file is managed automatically. You can commit it, review it, or reset it by deleting it.

---

## Turn off learning

```yaml
- uses: ghcr.io/madibalive/copilot-for-github:latest
  with:
    provider: google
    api-key: ${{ secrets.GEMINI_API_KEY }}
    model: gemini-3-pro-preview
    learning: "false"
```

If learning is off, reactions are still read and influence the current review session, but preferences are not persisted between runs.

---

## Turn off learning and drop write permission

If you don't want the bot committing any files to your repo:

```yaml
permissions:
  contents: read         # read-only
  pull-requests: write

jobs:
  review:
    steps:
      - uses: actions/checkout@v4
      - uses: ghcr.io/madibalive/copilot-for-github:latest
        with:
          provider: google
          api-key: ${{ secrets.GEMINI_API_KEY }}
          model: gemini-3-pro-preview
          learning: "false"
```

---

[← Nightly maintenance](./07-nightly-maintenance.md) | [Next: Options reference →](./09-options-reference.md)
