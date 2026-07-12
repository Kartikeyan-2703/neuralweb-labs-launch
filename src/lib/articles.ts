export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Source {
  name: string;
  title: string;
  url: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string; // ISO
  updatedAt: string;
  lastVerified: string; // "July 2026"
  readingTime: number; // minutes
  difficulty: Difficulty;
  cover: {
    gradient: string; // css gradient
    label: string;   // short label shown on cover
  };
  featured?: boolean;
  content: string; // markdown
  sources: Source[];
}

const AUTHOR = "Prasanna Saravanan";

export const articles: Article[] = [
  {
    slug: "model-quantization-explained",
    title: "Model Quantization Explained: How to Run Big AI Models on Small Hardware",
    description:
      "What is model quantization? A simple guide to FP32, FP16, INT8, and INT4, with real 2026 benchmark data, so you can run big AI models faster and cheaper.",
    category: "LLMs",
    tags: ["AI", "LLMs", "Optimization", "Machine Learning"],
    author: "Kartikeyan Suresh",
    publishedAt: "2026-07-05",
    updatedAt: "2026-07-05",
    lastVerified: "July 2026",
    readingTime: 6,
    difficulty: "Beginner",
    featured: true,
    cover: {
      gradient: "linear-gradient(135deg, #EADFCD 0%, #D8C7B1 100%)",
      label: "Quantization",
    },
    content: `## Introduction 

Large Language Models (LLMs) like Llama, Qwen, and Mistral can answer questions, write code, and summarize documents. But these models are huge. They need a lot of memory and strong hardware to run.

Buying expensive GPUs is not easy for every team. Big models cost more to host and are hard to run on small devices.

This is where model quantization helps. Quantization shrinks a model's size while keeping most of its accuracy. A smaller model runs faster, uses less memory, and can work on devices with limited power.

This guide explains what quantization is, how it works, its benefits and limits, and real 2026 data on how much it actually saves.

## Why Big AI Models Are a Problem 

A modern AI model can have billions of parameters. Each parameter is a number that helps the model make predictions. When each number is stored at high precision, the model takes up a lot of memory.

For example, a 7-billion-parameter model stored in full precision (FP32) needs about 28 GB of memory just to hold the model's weights. A 70-billion-parameter model at full precision needs around 280 GB, according to industry estimates.

This large memory need causes a few problems:

- You need expensive, high-end GPUs.
- Cloud hosting costs go up.
- The model runs slower, since more data has to move in and out of memory.
- You cannot run the model on a laptop or phone.

As AI models keep getting bigger, cutting down memory use has become a real priority for engineering teams.

## What Is Model Quantization? 

Model quantization means storing a model's numbers with fewer bits. Instead of using 32 bits for every value, you can use 16, 8, or even 4 bits.

Think of it like compressing a photo. A compressed photo is much smaller in file size, but it still looks almost the same to your eyes. Quantization does the same thing to an AI model: it shrinks the file while keeping the output nearly as good.

The goals of quantization are simple:

- Use less memory
- Run faster
- Work on cheaper or smaller hardware
- Cost less to host

## FP32 vs FP16 vs INT8 vs INT4: What Is the Difference? 

AI models can store their numbers in different formats. Here is a simple comparison based on 2026 industry data:

| Format | Memory vs FP32 | Typical Use | Accuracy Impact |
|---|---|---|---|
| **FP32 (32-bit)** | Full size (baseline) | Model training | None — full precision |
| **FP16 (16-bit)** | About 50% smaller | Common for everyday inference | Very small, usually unnoticeable |
| **INT8 (8-bit)** | About 75% smaller | Production inference on most GPUs | Small, often under 1–5% |
| **INT4 (4-bit)** | About 75–87% smaller | Running large models on one consumer GPU | Noticeable on hard tasks like coding or math |

These numbers are averages. The real result depends on the model, the quantization method, and the task.

## How Quantization Works 

Quantization takes a high-precision number and rounds it to a lower-precision version. Instead of keeping every exact decimal, it keeps an approximate value using fewer bits.

For example, a value stored in FP32 might be **0.82736491**. After INT8 quantization, it may become **0.83**. Some precision is lost, but the model's overall behavior barely changes.

There are two common ways to quantize a model:

- **Post-Training Quantization (PTQ)**: the model is trained normally first, then shrunk afterward. Methods like GPTQ and AWQ work this way.
- **Quantization-Aware Training (QAT)**: the model learns to work with lower precision during training itself, which often keeps more accuracy.

## Benefits of Quantization 

### Lower Memory Use 
Smaller number formats mean the model takes up less space in memory.

### Faster Responses 
A smaller model moves less data between memory and the processor, so it replies faster.

### Lower Cost 
Since a quantized model needs fewer GPU resources, you spend less on cloud hosting.

### Runs on Small Devices 
Quantized models can run on laptops, phones, and small edge devices that cannot handle a full-size model.

### Less Power Use 
Less computing work usually means lower energy use, which matters for both cost and sustainability.

## The Accuracy Trade-Off: Real 2026 Benchmark Data 

Quantization is not free. Shrinking a model's numbers can lower its accuracy, especially at very low bit sizes.

A 2026 benchmark on the Qwen3-32B model, run on an H100 GPU, shows how this trade-off plays out in practice:

| Format | General Knowledge Score | Coding Score | Speed vs Full Precision |
|---|---|---|---|
| **FP8 (near full precision)** | 70.9% | 39.0% | 1.5x faster |
| **INT8** | 70.3% | 37.2% | About the same as FP8 |
| **INT4** | 68.7% | 31.1% | 2.7x faster |

Two clear patterns show up in this kind of data. First, general knowledge and math scores barely move, even at INT4. Second, coding and detailed reasoning tasks lose more accuracy, because small rounding errors can add up across a long piece of code.

As a simple rule of thumb from recent testing: INT8 typically costs you about 2–5% quality, while INT4 can cost 10–15% quality on harder tasks, but delivers much bigger gains in speed and memory.

The right choice depends on your model, your quantization method, and what your application needs most: accuracy, speed, or low cost.

## Where Quantization Is Used Today 

- Running LLMs on personal laptops
- AI assistants on smartphones
- Self-hosted chatbots, to cut cloud costs
- Edge AI devices and IoT hardware
- Real-time AI apps that need fast responses
- Robotics

Many open-source models are now released in ready-made quantized versions, such as GGUF files, to make deployment easier for developers.

## When You Should Not Quantize 

Quantization is useful, but it is not always the right choice. Consider skipping it when:

- You are training a brand-new model from scratch
- Your task needs the highest possible precision
- Even a small accuracy drop is not acceptable, such as in certain medical or scientific tools
- Memory and cost are not a real constraint for your project

## The Future of Quantization 

Quantization methods keep improving. Newer techniques, such as AWQ and FP8 support on the latest GPUs, are closing the gap between small models and full-precision models.

As AI models keep growing in size, quantization is likely to become a standard part of how most production AI systems are deployed, not an optional extra step.

## Conclusion 

Model quantization makes large AI models cheaper and easier to run. By storing model numbers with fewer bits, teams can cut memory use, speed up responses, and run models on smaller hardware.

The trade-off is a small drop in accuracy, which grows as you push to lower bit sizes. FP16 and INT8 are safe choices for most production use. INT4 is powerful but works best for tasks that can tolerate a bigger accuracy trade-off.

As more companies deploy AI in production, understanding quantization is becoming a core skill for AI engineers.

Need help choosing the right model size and hosting setup for your AI product? [NeuralWeb Labs](/) helps companies deploy AI models affordably, without giving up the performance that matters. Visit [www.neuralweblabs.com](/) to learn more.`,
    sources: [
      { name: "Mobisoft Infotech", title: "What is Quantization in LLM? A Complete Guide to Optimizing AI", url: "#" },
      { name: "Meta Intelligence", title: "Model Quantization Guide: Run 70B LLMs in 4 Bits", url: "#" },
      { name: "VRLA Tech", title: "LLM Quantization Explained: INT4, INT8, FP8, AWQ, and GPTQ in 2026", url: "#" },
      { name: "AIMultiple", title: "LLM Quantization: BF16 vs FP8 vs INT4 (Qwen3-32B benchmark on H100)", url: "#" },
      { name: "Latitude", title: "We Tested Quantized LLMs: Cost and Performance Results", url: "#" }
    ],
  },
  {
    slug: "building-production-llm-systems",
    title: "Building Production LLM Systems: Architecture, Latency & Guardrails",
    description:
      "A practical field guide to designing LLM-powered systems that survive real traffic — retrieval, streaming, evaluation, and fallback strategies from live deployments.",
    category: "LLMs",
    tags: ["AI", "LLMs", "System Design", "Backend"],
    author: AUTHOR,
    publishedAt: "2026-07-04",
    updatedAt: "2026-07-04",
    lastVerified: "July 2026",
    readingTime: 14,
    difficulty: "Advanced",
    cover: {
      gradient: "linear-gradient(135deg, #E6DEC9 0%, #D1C5AD 100%)",
      label: "LLM Systems",
    },
    content: `## Why "just call the API" fails at scale

Every LLM feature starts as a single \`fetch\` to a provider. It works in the
demo. Then a hundred users hit it concurrently, someone pastes a 40k-token
document, a model gets deprecated overnight, and the abstraction breaks.

Production LLM systems are less about prompts and more about the boring
infrastructure surrounding them: **routing, caching, streaming, evaluation,
and cost control**.

## The reference architecture

A serious LLM feature has at least five layers:

1. **Gateway** — model-agnostic routing, retries, timeouts, quotas.
2. **Context assembly** — retrieval, tool results, memory, system prompt.
3. **Inference** — the model call itself, streaming by default.
4. **Post-processing** — parsing, validation (JSON schema), guardrails.
5. **Observability** — traces, evals, cost per request, per-user quotas.

Skip any one of them and you'll rediscover why it exists within a quarter.

## Streaming is a product decision

Non-streaming responses look 3× slower than they are. Even if total
generation time is 8 seconds, users perceive first-token latency. Ship
streaming from day one:

\`\`\`ts
const stream = await client.chat.completions.create({
  model: "gpt-4.1",
  stream: true,
  messages,
});

for await (const chunk of stream) {
  const delta = chunk.choices[0]?.delta?.content ?? "";
  if (delta) writer.write(delta);
}
\`\`\`

On the client, render tokens as they arrive with a small buffer to smooth
out bursts. Backpressure the writer on slow connections.

> **Tip:** Reserve a UI slot with a skeleton the instant the request starts.
> The perceived latency win is bigger than any model optimization.

## Retrieval that actually improves answers

Naive RAG stuffs the top-5 semantic matches into the prompt and hopes. Real
systems combine:

- **Hybrid search** — BM25 + dense vectors, reranked with a cross-encoder.
- **Metadata filters** — tenant, recency, permissions. RLS at retrieval time.
- **Chunking that respects structure** — split on H2/H3, not fixed tokens.

| Approach | Recall@10 | Median latency |
|---|---|---|
| Dense only | 0.61 | 90ms |
| Hybrid | 0.78 | 140ms |
| Hybrid + rerank | 0.86 | 320ms |

The rerank cost is worth it for anything users read carefully. Skip it for
autocomplete.

## Guardrails: schema first, model second

If your response must be JSON, don't ask nicely — enforce it:

\`\`\`ts
const Result = z.object({
  intent: z.enum(["refund", "question", "escalate"]),
  confidence: z.number().min(0).max(1),
  entities: z.array(z.string()),
});

const raw = await callModelWithJsonMode(prompt);
const parsed = Result.safeParse(JSON.parse(raw));
if (!parsed.success) return retryWithRepairPrompt(raw, parsed.error);
\`\`\`

Two retries max. If it still fails, log the failure and fall back to a
deterministic path. Users tolerate degraded features; they don't tolerate
crashes.

## Evaluation is your only defense against silent regressions

Model providers ship new versions weekly. Prompts drift. Retrieval corpora
grow. Without evals you'll ship regressions you can't see.

- Freeze a **golden set** of 100–300 inputs with expected outputs.
- Run it on every prompt change, every model swap.
- Track pass rate, cost, and P95 latency together — a "smarter" model that
  costs 4× and adds 2s of latency is often the wrong trade.

## Cost control in practice

Set per-user, per-tenant, and per-feature budgets in the gateway, not in
application code. When a budget trips, return a specific error the UI can
handle gracefully. Cache aggressively on \`(model, prompt_hash)\` for
idempotent calls — a 10–30% hit rate is normal.

## Wrapping up

LLM features feel like magic; LLM systems feel like databases. Treat them
that way — with schemas, budgets, traces, and tests — and they'll behave.`,
    sources: [
      { name: "OpenAI", title: "Production best practices", url: "https://platform.openai.com/docs/guides/production-best-practices" },
      { name: "Anthropic", title: "Building with Claude", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview" },
      { name: "Vercel", title: "AI SDK — Streaming", url: "https://ai-sdk.dev/docs/ai-sdk-ui/streaming-data" },
    ],
  },
  {
    slug: "designing-scalable-backend-apis",
    title: "Designing Scalable Backend APIs: Patterns That Survive 10× Growth",
    description:
      "Idempotency, pagination, rate limiting, and background jobs — the API primitives that stop breaking when traffic goes vertical.",
    category: "Backend",
    tags: ["Backend", "System Design", "APIs"],
    author: "Kartikeyan Suresh",
    publishedAt: "2026-07-03",
    updatedAt: "2026-07-03",
    lastVerified: "July 2026",
    readingTime: 11,
    difficulty: "Intermediate",
    cover: {
      gradient: "linear-gradient(135deg, #DED2C1 0%, #C8B69F 100%)",
      label: "Backend",
    },
    content: `## The APIs that break first

Every backend eventually meets the same failure modes: duplicate writes on
retries, unbounded list endpoints, thundering herds on cache expiry, and
webhooks that nobody knows are silently 500-ing.

You don't need Kubernetes to solve these. You need a handful of primitives
applied consistently.

## Idempotency, or how to survive retries

Networks lie. Clients retry. Without idempotency keys, a "create order"
endpoint will double-charge someone this week.

\`\`\`http
POST /orders
Idempotency-Key: 018f...c3a2
Content-Type: application/json

{ "amount": 4200, "currency": "usd" }
\`\`\`

Store the key, request hash, and response for 24 hours. On replay: same
hash → return the stored response; different hash → 409.

## Cursor pagination, always

Offset pagination breaks the moment data changes mid-scroll and gets slow
past page 50. Cursors are stable and index-friendly:

\`\`\`sql
SELECT id, created_at, ...
FROM posts
WHERE (created_at, id) < ($cursor_ts, $cursor_id)
ORDER BY created_at DESC, id DESC
LIMIT 21;
\`\`\`

Return \`items[0..20]\` and use item 21 to compute \`next_cursor\`.

## Rate limiting that a human can debug

Token bucket per \`(tenant, route)\`. Return the state on every response:

\`\`\`
X-RateLimit-Limit: 600
X-RateLimit-Remaining: 412
X-RateLimit-Reset: 1720000000
Retry-After: 12
\`\`\`

Clients that see these headers self-throttle. Clients that don't get 429s
they can act on.

## Background jobs beat "just add a queue"

Most "async" bugs are actually missing invariants:

- Jobs must be **idempotent** (same primary key, same effect).
- Jobs must have a **visibility timeout** shorter than their max runtime.
- Failed jobs go to a **DLQ**, not a retry-until-heat-death loop.

A simple table + \`FOR UPDATE SKIP LOCKED\` gets you 90% of what SQS does,
without the ops.

## Webhooks: signed, retried, and observable

- Sign every payload with HMAC-SHA256 and a rotating secret.
- Retry with exponential backoff for 24h, then park in a DLQ.
- Expose a per-tenant delivery log — this is a support tool, not a nice-to-have.

## Observability minimum

Three signals, from day one: **request logs with trace IDs**, **RED metrics**
(rate, errors, duration) per route, and **structured error events** with the
tenant, user, and request ID. If you can't answer "what broke for customer X
at 14:03?" in under a minute, you're flying blind.

## The trade you're actually making

Every pattern here trades a little upfront complexity for a lot of removed
future incidents. Ship them once, forget them forever.`,
    sources: [
      { name: "Stripe", title: "Idempotent requests", url: "https://docs.stripe.com/api/idempotent_requests" },
      { name: "AWS", title: "SQS visibility timeout", url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html" },
      { name: "Cloudflare", title: "Rate limiting", url: "https://developers.cloudflare.com/waf/rate-limiting-rules/" },
    ],
  },

  {
    slug: "forward-deployed-engineer-guide",
    title: "The Forward Deployed Engineer: Role, Reality, and How to Break In",
    description:
      "What forward deployed engineering actually looks like at companies like Palantir and OpenAI — the skills, the day-to-day, and the interview loop.",
    category: "Career",
    tags: ["Career", "Software Engineering"],
    author: AUTHOR,
    publishedAt: "2026-07-02",
    updatedAt: "2026-07-02",
    lastVerified: "July 2026",
    readingTime: 8,
    difficulty: "Beginner",
    cover: {
      gradient: "linear-gradient(135deg, #E3D9C9 0%, #CCBFA7 100%)",
      label: "Career",
    },
    content: `## Introduction 
Companies now want AI tools built just for them. They do not want the same tool that every other company uses. This need has created a new job. It is called the Forward Deployed Engineer, or FDE.

A Forward Deployed Engineer talks to customers, learns their problems, and then builds an AI tool to fix those problems. This person is both a coder and a problem-solver.

Big AI companies like OpenAI, Anthropic, and Palantir hire FDEs. In this guide, we explain what an FDE does, what skills you need, and how much this job pays in 2026.

## What Does a Forward Deployed Engineer Do? 
A Forward Deployed Engineer is an engineer who works right next to the customer, not just inside the office.

Most engineers build a product for everyone to use. An FDE does something different. They visit a customer, watch how the customer works, find the problem, and then build a tool that fits that one customer's needs.

Here is a simple example. A hospital wants AI to shorten patient reports. An FDE does not just hand over an AI model. The FDE studies how doctors write notes, builds the right prompts, connects the AI to the hospital's system, and tests it before doctors use it.

In short, an FDE sits between the customer and the engineering team. Their job is to make sure the AI actually solves a real problem, not just that the code runs.

## Why Do Companies Hire Forward Deployed Engineers? 
Most companies offer AI through an API. But every business is different. A bank, a hospital, and an online store all work in different ways.

One single AI setup cannot work well for all of them. So companies send an FDE to each customer. The FDE builds a version of the tool that fits that customer's exact workflow, data, and rules.

This approach makes customers happier. It also gets the product working faster, and it keeps customers using the product for longer.

## Forward Deployed Engineer vs Other Tech Jobs 
These four job titles sound alike, but the daily work is different. Here is a simple comparison:

| Job Title | Main Focus | Talks to Customers? |
| --- | --- | --- |
| **Software Engineer** | Builds and maintains the company's own product | Rarely |
| **Machine Learning Engineer** | Builds and trains AI models, improves accuracy | Rarely |
| **Solutions Engineer** | Explains the product and helps during sales demos | Often, mostly before the sale |
| **Forward Deployed Engineer** | Builds a custom AI solution for one customer, after the sale | Constantly, during the whole project |

## Real Examples of FDE Work 
Palantir made this role famous. In real Palantir interviews, candidates get a hard, open-ended problem, such as: a city wants to cut down 911 emergency response times using call data, traffic data, and ambulance GPS data. The candidate has 60 minutes to work out an approach. This shows the real job: messy data, a real problem, and no easy answer.

Here are a few more examples of the kind of work an FDE might do:
- A delivery company wants fewer late shipments. The FDE studies the delivery routes and builds an AI tool that predicts delays and suggests better routes. 
- A law firm wants AI to summarize legal papers. The FDE builds prompts that create accurate summaries and connects the tool to the firm's document system, while keeping private data safe. 
- A factory wants to catch machine problems early. The FDE connects AI to the factory's monitoring tools so it can warn workers before a machine breaks down. 

These examples show that the job is not only about writing code. It is also about understanding a real business problem and solving it.

## Skills You Need to Become an FDE 
You need a mix of tech skills and people skills.

### Technical Skills 
- A programming language, such as Python or JavaScript 
- Basics of data structures, algorithms, databases, and APIs 
- How large language models work, plus prompt writing 
- Retrieval-augmented generation (RAG), vector databases, and AI agents 
- Tools such as Docker, Git, and a cloud platform like AWS, Google Cloud, or Azure 

### People Skills 
- Talking to customers and understanding what they really need 
- Explaining tech ideas in plain, simple words 
- Solving new problems with no fixed playbook 

The best way to learn is to build small real projects, not just follow tutorials. Try to solve an actual problem for a friend's business or a local shop.

## How Much Does a Forward Deployed Engineer Earn in 2026? 
Pay for this role varies a lot. It depends on the company, the city, and your experience level. Here is what recent data shows:

- **Glassdoor**: average base pay is about $155,889 a year in the US, with a typical range of $124,580 to $198,147. 
- **ZipRecruiter**: average base pay is about $147,524 a year for a Forward Deployed Software Engineer, with a range of roughly $120,000 to $173,000 for most roles. 
- **Levels.fyi**: median base salary is about $163,295 across companies that report data. 
- **Recruiting from Scratch**: median base pay is about $183,000 a year, mostly falling between $160,000 and $215,000. 
- **At Palantir**, the company that started this role, median total pay (base plus stock) is about $215,000. 
- At frontier AI labs such as Anthropic and OpenAI, senior FDEs can earn total pay (base plus stock plus bonus) from around $350,000 up to $700,000 or more, according to industry compensation reports. 

The main point: base pay alone does not tell the full story. At many AI companies, stock and bonus make up a large part of total pay, especially for senior engineers.

## What Is the Future of This Job? 
AI is growing fast, and businesses want AI that fits their exact needs, not just a generic tool. This trend is good news for FDEs.

In the coming years, FDEs may work more with AI agents, voice tools, and automated workflows. Instead of only writing code, they will spend more time understanding the customer's problem and guiding the AI to solve it well.

As more companies use AI in daily work, skilled FDEs will stay in high demand.

## Conclusion 
A Forward Deployed Engineer is a mix of a software engineer and a customer problem-solver. They build AI tools that fit one customer's exact needs, not a one-size-fits-all product.

If you enjoy coding, talking to people, and solving real business problems, this career path is worth exploring. Pay is strong, demand is growing, and the role sits at the center of how companies actually use AI today.`,
    sources: [
      { name: "Palantir", title: "Forward Deployed Software Engineer", url: "https://www.palantir.com/careers/" },
      { name: "OpenAI", title: "Careers", url: "https://openai.com/careers/" },
      { name: "Glassdoor", title: "FDE salaries", url: "https://www.glassdoor.com/Salaries/forward-deployed-engineer-salary-SRCH_KO0,25.htm" },
    ],
  },
];

export function getAllArticles(): Article[] {
  return [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRelated(slug: string, limit = 3): Article[] {
  const current = getArticle(slug);
  if (!current) return [];
  return getAllArticles()
    .filter((a) => a.slug !== slug)
    .sort((a, b) => {
      const overlapA = a.tags.filter((t) => current.tags.includes(t)).length +
        (a.category === current.category ? 2 : 0);
      const overlapB = b.tags.filter((t) => current.tags.includes(t)).length +
        (b.category === current.category ? 2 : 0);
      return overlapB - overlapA;
    })
    .slice(0, limit);
}

export const CATEGORIES = [
  "All",
  "AI",
  "LLMs",
  "Machine Learning",
  "Backend",
  "Career",
] as const;
