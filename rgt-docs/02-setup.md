[← Documentation](/rgt-docs/index) / Setup

---

# Setup Guide

Get the bot running on your repo in 3 steps. Takes about 5 minutes.

---

## Step 1 — Get an API key

Pick a provider and get a free or paid API key:

| Provider | Sign up | Best model to use |
|---|---|---|
| **Google (recommended)** | aistudio.google.com | `gemini-3-pro-preview` |
| OpenRouter | openrouter.ai | `anthropic/claude-sonnet-4-6` |
| Anthropic | console.anthropic.com | `claude-sonnet-4-6` |
| OpenAI | platform.openai.com | `gpt-4.1` |

> **Not sure which to pick?** Use Google Gemini. It's the primary supported model and has a generous free tier.
>
> For a full list of providers including AWS Bedrock, Vertex AI, and OpenAI-compatible → [Provider guide](./providers.md)

---

## Step 2 — Add the API key to your repo

1. Go to your GitHub repo
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Set the name and value:

| Provider | Secret name | Value |
|---|---|---|
| Google | `GEMINI_API_KEY` | your key from aistudio.google.com |
| OpenRouter | `OPENROUTER_KEY` | your key from openrouter.ai |
| Anthropic | `ANTHROPIC_KEY` | your key from console.anthropic.com |
| OpenAI | `OPENAI_KEY` | your key from platform.openai.com |

---

## Step 3 — Create the workflow file

Create this file in your repo at `.github/workflows/pr-review.yml`:

```yaml
name: PR Review

on:
  pull_request:
    types: [opened, synchronize]
  issue_comment:
    types: [created]

permissions:
  contents: write
  pull-requests: write
  issues: read

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ghcr.io/madibalive/copilot-for-github:latest
        with:
          provider: google
          api-key: ${{ secrets.GEMINI_API_KEY }}
          model: gemini-3-pro-preview
          reasoning: medium
```

Commit and push this file. The next PR you open will be reviewed automatically.

> Copy-paste ready templates for other providers and scenarios → [templates/workflows/](./templates/workflows/)

---

## Verify it's working

1. Open a pull request (or push a new commit to an existing one)
2. Go to the **Actions** tab in your repo
3. You should see a "PR Review" workflow running
4. When it finishes, check the PR for comments from the bot

---

## Permissions explained

| Permission | Why it's needed |
|---|---|
| `pull-requests: write` | Post comments and suggestions on PRs |
| `contents: write` | Save learned preferences to `.github/copilot-learned.json` |
| `issues: read` | Read 👍 / 👎 reactions on comments (for learning) |

If you don't want the learning feature, use `contents: read` instead of `write` and remove `issues: read`.

---

## Troubleshooting

**Workflow doesn't appear in Actions tab**
Make sure the file is saved at exactly `.github/workflows/pr-review.yml` and pushed to the default branch.

**Bot posts nothing on the PR**
Check the workflow run logs in the Actions tab for errors. Most common cause: wrong secret name or invalid API key.

**"Resource not accessible by integration" error**
The workflow permissions block is missing or incomplete. Make sure `pull-requests: write` is set.

---

[← What it does](./01-what-it-does.md) | [Next: Providers →](./providers.md)
