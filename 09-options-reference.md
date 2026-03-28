[← Documentation](./index.md) / Options reference

---

# Options Reference

All options go in the `with:` block of your workflow step.

```yaml
- uses: ghcr.io/madibalive/copilot-for-github:latest
  with:
    option-name: "value"
```

---

## Required

| Option | Description |
|---|---|
| `provider` | LLM provider: `google`, `openrouter`, `anthropic`, `openai`, etc. — see [Providers](./providers.md) |
| `api-key` | API key for your provider |
| `model` | Model to use — see [model options](#model-options) below |

---

## Review behaviour

| Option | Default | Description |
|---|---|---|
| `reasoning` | `off` | Thinking depth: `off` `low` `medium` `high` `xhigh` |
| `max-files` | `50` | Skip review if PR changes more files than this |
| `ignore-patterns` | `*.lock,*.generated.*` | Comma-separated globs to skip |
| `trigger-on-updates` | `true` | Set `false` to review only on PR open, not on every push |
| `skip-automatic` | `false` | Set `true` to disable automatic reviews (manual triggers still work) |
| `experimental-pr-explainer` | `false` | Post a PR guide + per-file explanation comments |

---

## Filtering

| Option | Default | Description |
|---|---|---|
| `exclude-bots` | `true` | Skip Dependabot, Renovate, github-actions[bot] |
| `include-authors` | — | Only review PRs from these authors (comma-separated) |
| `exclude-authors` | — | Skip PRs from these authors |
| `skip-keywords` | — | Skip if PR title/body contains these words |
| `include-keywords` | — | Only review if PR title/body contains one of these |
| `include-base-branches` | — | Only review PRs targeting these branches (glob patterns) |
| `exclude-base-branches` | — | Skip PRs targeting these branches |
| `include-head-branches` | — | Only review PRs from these source branches |
| `exclude-head-branches` | — | Skip PRs from these source branches |
| `include-labels` | — | Only review PRs with at least one of these labels |
| `exclude-labels` | — | Skip PRs with any of these labels |

---

## Team context and learning

| Option | Default | Description |
|---|---|---|
| `context-file` | `.github/copilot-context.md` | Path to team conventions file |
| `learning` | `true` | Learn from 👍/👎 reactions on comments |

---

## On-demand triggers

| Option | Default | Description |
|---|---|---|
| `bot-name` | — | Name for `@bot command` triggers (e.g. `my-reviewer`) |

---

## GitHub App auth (optional)

Only needed if you want the bot to appear as a named GitHub App instead of `github-actions[bot]`.

| Option | Description |
|---|---|
| `app-id` | GitHub App ID |
| `app-installation-id` | GitHub App installation ID |
| `app-private-key` | GitHub App private key PEM |

---

## Advanced

| Option | Default | Description |
|---|---|---|
| `temperature` | provider default | Sampling temperature 0–2. Leave unset for Gemini. |
| `compaction-model` | same as `model` | Model used when context gets too large |
| `debug` | `false` | Enable verbose logging in the Actions run |
| `allow-pr-tools` | `false` | Allow the bot to open PRs during a PR review run |
| `use-dora` | `false` | Enable code-graph tools (call graph, dependency tracing) |

---

## Model options

### Google (recommended)

| Model | Notes |
|---|---|
| `gemini-3-pro-preview` | Best quality. Use `reasoning: medium` or higher. |
| `gemini-3-flash-preview` | Faster and cheaper. Good for large PRs. |
| `gemini-2.5-pro` | Stable non-preview release. |

### OpenRouter (use `provider/model-name` format)

| Model | OpenRouter name |
|---|---|
| Claude Sonnet 4.6 | `anthropic/claude-sonnet-4-6` |
| Claude Opus 4.6 | `anthropic/claude-opus-4-6` |
| GPT-4.1 | `openai/gpt-4.1` |
| Gemini 3 Pro | `google/gemini-3-pro-preview` |
| DeepSeek R1 | `deepseek/deepseek-r1` |
| Llama 3.3 70B | `meta-llama/llama-3.3-70b-instruct` |

### Anthropic (direct)

| Model | Notes |
|---|---|
| `claude-sonnet-4-6` | Recommended |
| `claude-opus-4-6` | Highest quality, slower |
| `claude-haiku-4-5` | Fast and cheap |

### OpenAI (direct)

| Model | Notes |
|---|---|
| `gpt-4.1` | Recommended |
| `gpt-4.1-mini` | Faster and cheaper |
| `gpt-4o` | Previous generation, well-tested |

---

## Reasoning levels

Controls how much the model "thinks" before responding. Higher = better quality, slower, more expensive.

| Level | Use when |
|---|---|
| `off` | Speed matters, simple PRs |
| `low` | Routine reviews |
| `medium` | Most PRs — good balance (recommended) |
| `high` | Security reviews, complex logic |
| `xhigh` | Architectural reviews, large PRs |

---

[← Learning from reactions](./08-learning.md) | [Next: FAQ →](./10-faq.md)
