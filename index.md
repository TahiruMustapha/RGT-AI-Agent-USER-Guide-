# Copilot for GitHub — Documentation

AI-powered PR reviewer that reads your full codebase, posts inline comments, suggests fixes, and learns from your team's feedback.

---

## Getting started

New here? Start in order:

| Step | Guide | Time |
|---|---|---|
| 1 | [What it does](./01-what-it-does.md) | 2 min read |
| 2 | [Setup](./02-setup.md) | 5 min setup |
| 3 | [Providers](./providers.md) | Pick your AI provider |
| 4 | [Team context](./03-team-context.md) | Tell the bot your rules |

---

## All guides

### Core

- [What it does](./01-what-it-does.md) — Overview, what a review looks like, what it doesn't do
- [Setup](./02-setup.md) — Get running in 5 minutes
- [Providers](./providers.md) — Google, Anthropic, OpenRouter, OpenAI, Vertex AI, Bedrock, xAI, Cerebras, OpenAI-compatible

### Customisation

- [Team context file](./03-team-context.md) — Tell the bot your team's rules and conventions
- [Filtering PRs](./04-filtering-prs.md) — Control which PRs get reviewed
- [On-demand triggers](./05-on-demand-triggers.md) — Trigger reviews from PR comments
- [Custom commands](./06-custom-commands.md) — Security scans, perf reviews, and more
- [Nightly maintenance](./07-nightly-maintenance.md) — Scheduled runs that open PRs automatically
- [Learning from reactions](./08-learning.md) — 👍/👎 to teach the bot what your team cares about

### Reference

- [Options reference](./09-options-reference.md) — Every workflow input explained
- [FAQ](./10-faq.md) — Common questions and troubleshooting

---

## Templates

Copy-paste ready files — drop them into your repo and adjust.

### Workflow files `.github/workflows/`

| Template | Use when |
|---|---|
| [01-basic-review.yml](./templates/workflows/01-basic-review.yml) | Starting point — Google Gemini, every PR |
| [02-openrouter.yml](./templates/workflows/02-openrouter.yml) | One key for Claude, GPT, Gemini, Llama, and more |
| [03-filtered-review.yml](./templates/workflows/03-filtered-review.yml) | Scope to branches, labels, or authors |
| [04-on-demand-only.yml](./templates/workflows/04-on-demand-only.yml) | Manual triggers only — no auto-review |
| [05-nightly-docs.yml](./templates/workflows/05-nightly-docs.yml) | Nightly docs drift check |
| [06-weekly-security.yml](./templates/workflows/06-weekly-security.yml) | Weekly security audit |
| [07-anthropic.yml](./templates/workflows/07-anthropic.yml) | Anthropic Claude |
| [08-vertex-ai.yml](./templates/workflows/08-vertex-ai.yml) | Google Vertex AI (GCP, no API key) |
| [09-openai-compatible.yml](./templates/workflows/09-openai-compatible.yml) | Together AI, Fireworks, Ollama, vLLM |
| [10-amazon-bedrock.yml](./templates/workflows/10-amazon-bedrock.yml) | Amazon Bedrock (AWS) |

### `.reviewerc` files

| Template | Use when |
|---|---|
| [01-basic.reviewerc](./templates/reviewerc/01-basic.reviewerc) | Minimal — just set a default model |
| [02-security.reviewerc](./templates/reviewerc/02-security.reviewerc) | Security scan on every PR |
| [03-nightly-docs.reviewerc](./templates/reviewerc/03-nightly-docs.reviewerc) | Docs + security on a schedule |
| [04-full-example.reviewerc](./templates/reviewerc/04-full-example.reviewerc) | All features, commented |

### Context file `.github/`

| Template | Use when |
|---|---|
| [copilot-context.md](./templates/context/copilot-context.md) | Starter team conventions file |

---

## Quick answers

**Just want it running now →** [Setup guide](./02-setup.md)

**Not sure which provider to use →** [Providers](./providers.md) — Google Gemini recommended

**Want to focus on security →** [Custom commands](./06-custom-commands.md) + [02-security.reviewerc](./templates/reviewerc/02-security.reviewerc)

**Want manual triggers only →** [On-demand triggers](./05-on-demand-triggers.md) + [04-on-demand-only.yml](./templates/workflows/04-on-demand-only.yml)

**Want nightly maintenance →** [Nightly maintenance](./07-nightly-maintenance.md) + [05-nightly-docs.yml](./templates/workflows/05-nightly-docs.yml)

**Something not working →** [FAQ](./10-faq.md)
