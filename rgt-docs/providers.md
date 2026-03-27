[← Documentation](/index) / Providers

---

# Provider Setup Guide

Every provider needs two things in your workflow: a `provider` name and an `api-key` secret.
This guide covers every supported provider with exact setup steps and recommended models.

---

## Quick comparison

| Provider | Best for | Needs | Web search |
|---|---|---|---|
| [Google Gemini](#google-gemini) | Best overall quality, free tier | API key | ✅ |
| [Google Vertex AI](#google-vertex-ai) | GCP teams, no API key needed | GCP project | ✅ |
| [Anthropic](#anthropic-claude) | Strong reasoning, reliable | API key | ❌ |
| [OpenRouter](#openrouter) | One key for every model | API key | ❌ |
| [OpenAI](#openai) | GPT-4 family | API key | ❌ |
| [OpenAI-compatible](#openai-compatible-providers) | Together AI, Fireworks, Ollama, self-hosted | API key or none | ❌ |
| [Amazon Bedrock](#amazon-bedrock) | AWS teams | AWS credentials | ❌ |
| [xAI (Grok)](#xai-grok) | Grok models | API key | ❌ |
| [GitHub Copilot](#github-copilot) | Already have Copilot? | Token | ❌ |
| [Cerebras](#cerebras) | Ultra-fast inference | API key | ❌ |

---

## Google Gemini

**Recommended for most teams.** Best quality results, free tier available, supports web search.

### Get an API key
1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Click **Get API key** → **Create API key**
3. Copy the key

### Add to GitHub secrets
**Repo → Settings → Secrets → Actions → New secret**

| Name | Value |
|---|---|
| `GEMINI_API_KEY` | your key |

### Workflow

```yaml
- uses: ghcr.io/madibalive/copilot-for-github:latest
  with:
    provider: google
    api-key: ${{ secrets.GEMINI_API_KEY }}
    model: gemini-3-pro-preview
    reasoning: medium
```

### Models

| Model | Use when |
|---|---|
| `gemini-3-pro-preview` | Best quality — recommended |
| `gemini-3-flash-preview` | Faster, cheaper — high-volume or large PRs |
| `gemini-2.5-pro` | Stable release (non-preview) |
| `gemini-2.5-flash` | Stable, fast |
| `gemini-2.0-flash` | Lightweight, very fast |

### Notes
- Leave `temperature` unset — Gemini 3 requires `1.0` and the action sets it automatically
- Web search is only available with Google/Vertex providers

---

## Google Vertex AI

**For teams already on GCP.** Uses Application Default Credentials — no API key required.

### Prerequisites
- A GCP project with the Vertex AI API enabled
- Credentials available in the runner (Workload Identity Federation or a service account key)

### Add to GitHub secrets

| Name | Value |
|---|---|
| `GOOGLE_CLOUD_PROJECT` | your GCP project ID (e.g. `my-project-123`) |
| `GOOGLE_CLOUD_LOCATION` | region (e.g. `us-central1`) |

### Workflow (no API key — uses ADC)

```yaml
- uses: ghcr.io/madibalive/copilot-for-github:latest
  with:
    provider: google-vertex      # aliases: vertex, vertex-ai
    model: gemini-3-pro-preview
    reasoning: medium
  env:
    GOOGLE_CLOUD_PROJECT: ${{ secrets.GOOGLE_CLOUD_PROJECT }}
    GOOGLE_CLOUD_LOCATION: ${{ secrets.GOOGLE_CLOUD_LOCATION }}
```

### Workflow (with Vertex API key)

```yaml
- uses: ghcr.io/madibalive/copilot-for-github:latest
  with:
    provider: google-vertex
    api-key: ${{ secrets.VERTEX_AI_API_KEY }}
    model: gemini-3-pro-preview
    reasoning: medium
  env:
    GOOGLE_CLOUD_PROJECT: ${{ secrets.GOOGLE_CLOUD_PROJECT }}
    GOOGLE_CLOUD_LOCATION: ${{ secrets.GOOGLE_CLOUD_LOCATION }}
```

### Models
Same as Google Gemini above.

---

## Anthropic (Claude)

**Strong reasoning and instruction-following.** Best alternative to Gemini.

### Get an API key
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. **API Keys** → **Create Key**

### Add to GitHub secrets

| Name | Value |
|---|---|
| `ANTHROPIC_KEY` | your key |

### Workflow

```yaml
- uses: ghcr.io/madibalive/copilot-for-github:latest
  with:
    provider: anthropic          # alias: claude
    api-key: ${{ secrets.ANTHROPIC_KEY }}
    model: claude-sonnet-4-6
    reasoning: medium
```

### Models

| Model | Use when |
|---|---|
| `claude-sonnet-4-6` | Best quality — recommended |
| `claude-opus-4-6` | Highest capability, slower and more expensive |
| `claude-haiku-4-5` | Fast and cheap — high-volume use |
| `claude-sonnet-4-5` | Previous generation |

---

## OpenRouter

**One API key to access every provider.** Best choice if you want flexibility or don't want to manage multiple keys. Routes to Claude, GPT, Gemini, Llama, DeepSeek, Mistral, and hundreds more.

### Get an API key
1. Go to [openrouter.ai](https://openrouter.ai)
2. Sign up → **Keys** → **Create Key**

### Add to GitHub secrets

| Name | Value |
|---|---|
| `OPENROUTER_KEY` | your key |

### Workflow

```yaml
- uses: ghcr.io/madibalive/copilot-for-github:latest
  with:
    provider: openrouter
    api-key: ${{ secrets.OPENROUTER_KEY }}
    model: anthropic/claude-sonnet-4-6
    reasoning: medium
```

### Model format

OpenRouter uses `provider/model-name` for the `model` value:

| Model | OpenRouter name |
|---|---|
| Claude Sonnet 4.6 | `anthropic/claude-sonnet-4-6` |
| Claude Opus 4.6 | `anthropic/claude-opus-4-6` |
| Claude Haiku 4.5 | `anthropic/claude-haiku-4-5` |
| GPT-4.1 | `openai/gpt-4.1` |
| GPT-4o | `openai/gpt-4o` |
| Gemini 3 Pro | `google/gemini-3-pro-preview` |
| Gemini 2.5 Pro | `google/gemini-2.5-pro` |
| Llama 3.3 70B | `meta-llama/llama-3.3-70b-instruct` |
| DeepSeek R1 | `deepseek/deepseek-r1` |
| Mistral Devstral | `mistralai/devstral-medium` |
| Grok 2 | `x-ai/grok-2` |

> Full list at [openrouter.ai/models](https://openrouter.ai/models)

---

## OpenAI

### Get an API key
1. Go to [platform.openai.com](https://platform.openai.com)
2. **API keys** → **Create new secret key**

### Add to GitHub secrets

| Name | Value |
|---|---|
| `OPENAI_KEY` | your key |

### Workflow

```yaml
- uses: ghcr.io/madibalive/copilot-for-github:latest
  with:
    provider: openai             # aliases: gpt, chatgpt
    api-key: ${{ secrets.OPENAI_KEY }}
    model: gpt-4.1
    reasoning: medium
```

### Models

| Model | Use when |
|---|---|
| `gpt-4.1` | Best quality — recommended |
| `gpt-4.1-mini` | Faster and cheaper |
| `gpt-4o` | Well-tested previous generation |
| `gpt-4-turbo` | Older, stable |

---

## OpenAI-Compatible Providers

Any service that implements the OpenAI API spec works by using `provider: openai` and pointing it at the right base URL via the `OPENAI_BASE_URL` environment variable.

This covers: **Together AI**, **Fireworks AI**, **Perplexity**, **Ollama** (local), **LM Studio** (local), **vLLM** (self-hosted), and any other OpenAI-compatible endpoint.

---

### Together AI

**Access to Llama, Qwen, DeepSeek, and more open-source models.**

1. Sign up at [api.together.xyz](https://api.together.xyz) → **API Keys**
2. Add `TOGETHER_API_KEY` to repo secrets

```yaml
- uses: ghcr.io/madibalive/copilot-for-github:latest
  with:
    provider: openai
    api-key: ${{ secrets.TOGETHER_API_KEY }}
    model: meta-llama/Llama-3.3-70B-Instruct-Turbo
  env:
    OPENAI_BASE_URL: https://api.together.xyz/v1
```

**Popular Together models:**

| Model | ID |
|---|---|
| Llama 3.3 70B Turbo | `meta-llama/Llama-3.3-70B-Instruct-Turbo` |
| Llama 3.1 405B | `meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo` |
| DeepSeek R1 | `deepseek-ai/DeepSeek-R1` |
| Qwen 2.5 72B | `Qwen/Qwen2.5-72B-Instruct-Turbo` |

---

### Fireworks AI

**Fast inference for open-source models.**

1. Sign up at [fireworks.ai](https://fireworks.ai) → **API Keys**
2. Add `FIREWORKS_API_KEY` to repo secrets

```yaml
- uses: ghcr.io/madibalive/copilot-for-github:latest
  with:
    provider: openai
    api-key: ${{ secrets.FIREWORKS_API_KEY }}
    model: accounts/fireworks/models/llama-v3p3-70b-instruct
  env:
    OPENAI_BASE_URL: https://api.fireworks.ai/inference/v1
```

---

### Perplexity

**Models with real-time web access.**

1. Sign up at [docs.perplexity.ai](https://docs.perplexity.ai) → **API Keys**
2. Add `PERPLEXITY_API_KEY` to repo secrets

```yaml
- uses: ghcr.io/madibalive/copilot-for-github:latest
  with:
    provider: openai
    api-key: ${{ secrets.PERPLEXITY_API_KEY }}
    model: llama-3.1-sonar-large-128k-online
  env:
    OPENAI_BASE_URL: https://api.perplexity.ai
```

---

### Ollama (self-hosted, local)

**Run models entirely on your own infrastructure.** Requires a self-hosted GitHub Actions runner with Ollama installed.

```yaml
- uses: ghcr.io/madibalive/copilot-for-github:latest
  with:
    provider: openai
    api-key: "ollama"            # Ollama ignores the key — placeholder required
    model: llama3.3:70b          # must match a model you've pulled with `ollama pull`
  env:
    OPENAI_BASE_URL: http://localhost:11434/v1
```

> Pull a model on your runner first: `ollama pull llama3.3:70b`

---

### LM Studio (self-hosted)

**Local model server with a GUI.** Requires a self-hosted runner with LM Studio's local server running.

```yaml
- uses: ghcr.io/madibalive/copilot-for-github:latest
  with:
    provider: openai
    api-key: "lm-studio"         # placeholder — LM Studio ignores the key
    model: your-loaded-model     # matches the model currently loaded in LM Studio
  env:
    OPENAI_BASE_URL: http://localhost:1234/v1
```

---

### vLLM / text-generation-inference (self-hosted)

**For teams running their own model servers on internal infrastructure.**

```yaml
- uses: ghcr.io/madibalive/copilot-for-github:latest
  with:
    provider: openai
    api-key: ${{ secrets.VLLM_API_KEY }}
    model: meta-llama/Llama-3.3-70B-Instruct  # must match the --model arg used to start vLLM
  env:
    OPENAI_BASE_URL: https://your-vllm-server.internal/v1
```

---

## Amazon Bedrock

**For AWS teams.** Uses AWS IAM credentials — no separate API key.

### Prerequisites
- AWS account with Bedrock model access enabled
- IAM credentials with `bedrock:InvokeModelWithResponseStream` permission

### Add to GitHub secrets

| Name | Value |
|---|---|
| `AWS_ACCESS_KEY_ID` | IAM access key |
| `AWS_SECRET_ACCESS_KEY` | IAM secret key |
| `AWS_REGION` | e.g. `us-east-1` |

### Workflow

```yaml
- uses: ghcr.io/madibalive/copilot-for-github:latest
  with:
    provider: amazon-bedrock
    model: amazon.nova-pro-v1:0
  env:
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    AWS_DEFAULT_REGION: ${{ secrets.AWS_REGION }}
```

### Models

| Model | ID |
|---|---|
| Nova Premier (best) | `amazon.nova-premier-v1:0` |
| Nova Pro | `amazon.nova-pro-v1:0` |
| Nova Lite | `amazon.nova-lite-v1:0` |
| Nova Micro (fastest) | `amazon.nova-micro-v1:0` |

---

## xAI (Grok)

### Get an API key
1. Go to [console.x.ai](https://console.x.ai) → Create API key

### Add to GitHub secrets

| Name | Value |
|---|---|
| `XAI_API_KEY` | your key |

### Workflow

```yaml
- uses: ghcr.io/madibalive/copilot-for-github:latest
  with:
    provider: xai
    api-key: ${{ secrets.XAI_API_KEY }}
    model: grok-2-latest
```

### Models

| Model | ID |
|---|---|
| Grok 2 (latest) | `grok-2-latest` |
| Grok 2 (pinned) | `grok-2` |
| Grok 2 Vision | `grok-2-vision` |

---

## GitHub Copilot

**If your org already pays for GitHub Copilot.** No separate billing — uses the Copilot token.

### Workflow

```yaml
- uses: ghcr.io/madibalive/copilot-for-github:latest
  with:
    provider: github-copilot
    api-key: ${{ secrets.GITHUB_TOKEN }}
    model: claude-sonnet-4
```

### Models

| Model | ID |
|---|---|
| Claude Sonnet 4.6 | `claude-opus-4.6` |
| Claude Sonnet 4.5 | `claude-sonnet-4.5` |
| Claude Sonnet 4 | `claude-sonnet-4` |
| Claude Haiku 4.5 | `claude-haiku-4.5` |

---

## Cerebras

**Ultra-fast inference on wafer-scale chips.**

### Get an API key
1. Go to [cloud.cerebras.ai](https://cloud.cerebras.ai) → Create API key

### Add to GitHub secrets

| Name | Value |
|---|---|
| `CEREBRAS_API_KEY` | your key |

### Workflow

```yaml
- uses: ghcr.io/madibalive/copilot-for-github:latest
  with:
    provider: cerebras
    api-key: ${{ secrets.CEREBRAS_API_KEY }}
    model: llama3.1-8b
```

### Models

| Model | ID |
|---|---|
| GPT OSS 120B | `gpt-oss-120b` |
| Llama 3.1 8B (fastest) | `llama3.1-8b` |
| Qwen 3 235B | `qwen-3-235b-a22b-instruct-2507` |

---

## Provider aliases

These shorthand names work anywhere `provider:` is accepted:

| You type | Resolves to |
|---|---|
| `gemini` | `google` |
| `vertex` | `google-vertex` |
| `vertex-ai` | `google-vertex` |
| `claude` | `anthropic` |
| `gpt` | `openai` |
| `chatgpt` | `openai` |

---

## Reasoning levels by provider

| Level | Google Gemini | Anthropic Claude | OpenAI | Others |
|---|---|---|---|---|
| `off` | low thinking | no thinking | no thinking | ignored |
| `low` | low thinking | low budget | low effort | ignored |
| `medium` | **high thinking** | medium budget | medium effort | ignored |
| `high` | **high thinking** | high budget | high effort | ignored |
| `xhigh` | **high thinking** | max budget | max effort | ignored |

**Recommendation by task:**

| Task | Level |
|---|---|
| Quick / small PR | `off` or `low` |
| Standard review | `medium` |
| Security review | `high` |
| Large PR / architecture | `high` or `xhigh` |

---

[← Setup](./02-setup.md) | [Next: Team context →](./03-team-context.md)
