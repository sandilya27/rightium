# Rightium website assistant

The public site shell includes a compact, nonmodal chat panel in the existing Slate & Glacier system. It answers service questions and offers explicit page links. Clicking a link navigates; a model response never redirects a visitor automatically.

## Configuration

Set `GROQ_API_KEY` in `.env.local` for development and in the hosting project's server environment for deployment. Restart the server after changing it. Do not use a `NEXT_PUBLIC_` prefix or commit keys. `GROQ_MODEL` defaults to `openai/gpt-oss-20b` and can be changed to another Groq model supporting JSON object responses.

Protocol: [Groq chat completions](https://console.groq.com/docs/text-chat). No additional SDK is required.

## Content and boundaries

`src/lib/chat-knowledge.ts` reads the shared service catalogue and contact configuration, plus published articles and case studies through the same CMS adapters used by the pages. It ranks entries against recent user questions, includes the best matching article/case-study bodies, and supplies a bounded source set. Draft CMS content is excluded. An unavailable CMS leaves the service catalogue usable.

This is bounded retrieval, not an exhaustive site crawl: general pages have short descriptions, service data is structured, and long article bodies are truncated. New static informational pages should be added to the source list. The model is instructed to acknowledge gaps and route visitors to the team. Grounding reduces but cannot eliminate incorrect answers.

The endpoint validates message roles, body size, history length and answer shape; rejects cross-origin browser requests; limits model output; times out upstream calls; and filters suggested links to exact source URLs. It never renders model HTML. Conversation state stays in React memory, with no database or browser-storage persistence. Messages are sent to Groq; the panel and privacy page disclose this.

The in-memory rate guard allows 12 requests per minute per IP per server instance. It is best effort, resets on cold starts, and is not a distributed quota. Before public release, configure hosting/WAF rate limits and a Groq project spending limit.

## Validation

Run `npm run typecheck`, `npm run lint`, and `node --test tests/chat.test.cjs`. Tests use mocked Groq responses and require no credentials. With a real key, check service questions, follow-up questions, page navigation requests, unsupported questions and provider errors. Test keyboard operation, Escape, new chat, and mobile overflow.
