import agenticAiCover from "@/assets/blogs/agentic-ai-architecture.jpg";
import distributedSystemsCover from "@/assets/blogs/distributed-systems.jpg";
import realtimeWebsocketsCover from "@/assets/blogs/realtime-websockets.jpg";

/**
 * Technical blog post data contract.
 *
 * Any new technical article can simply be added to the `blogs` array below
 * and it will automatically be rendered by the unified BlogCard component
 * on the dedicated /blog page.
 */
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  /** Opening few lines summarizing the article */
  excerpt: string;
  /** Technical cover image / architectural diagram */
  coverImage: string;
  /** Formatted date label, e.g. "AUG 2026" */
  date: string;
  /** Estimated reading time */
  readTime: string;
  /** Main technical domain */
  category: string;
  /** Technical keywords / technologies */
  tags: string[];
  /** External Hashnode article link */
  articleUrl: string;
}

export const blogs: BlogPost[] = [
  {
    id: "agentic-ai-state-graphs",
    title: "Orchestrating Autonomous Multi-Agent AI Systems with Stateful Graph Execution",
    slug: "agentic-ai-state-graphs",
    excerpt:
      "Single-prompt LLMs fail when tasks demand iterative reasoning, state preservation, and dynamic tool selection. Exploring how directed acyclic graphs and persistent memory primitives transform stochastic language models into predictable, production-grade autonomous agent clusters.",
    coverImage: agenticAiCover,
    date: "AUG 2026",
    readTime: "7 MIN READ",
    category: "AGENTIC AI",
    tags: ["LangGraph", "Python", "FastAPI", "Multi-Agent"],
    articleUrl: "https://hashnode.com/@zaxx",
  },
  {
    id: "distributed-event-driven-architecture",
    title: "Building Resilient Event-Driven Distributed Backends with Zero-Loss Replication",
    slug: "distributed-event-driven-architecture",
    excerpt:
      "When synchronous RPC chains buckle under spike loads, event streaming decoupled by robust message brokers provides true fault isolation. A deep technical breakdown of handling idempotency, out-of-order delivery, and transactional outbox patterns across microservices.",
    coverImage: distributedSystemsCover,
    date: "JUL 2026",
    readTime: "9 MIN READ",
    category: "DISTRIBUTED SYSTEMS",
    tags: ["Kafka", "Redis", "PostgreSQL", "Architecture"],
    articleUrl: "https://hashnode.com/@zaxx",
  },
  {
    id: "realtime-bidirectional-websockets",
    title: "Scaling Real-Time Full-Duplex WebSockets to 100k Concurrent Connections",
    slug: "realtime-bidirectional-websockets",
    excerpt:
      "HTTP polling cannot deliver the sub-50ms latency demanded by collaborative software and live communication. Analyzing socket heartbeats, horizontal cluster pub/sub synchronization, memory footprint tuning, and graceful reconnection strategies at scale.",
    coverImage: realtimeWebsocketsCover,
    date: "MAY 2026",
    readTime: "6 MIN READ",
    category: "SYSTEM ARCHITECTURE",
    tags: ["WebSockets", "Pub/Sub", "Concurrency", "Performance"],
    articleUrl: "https://hashnode.com/@zaxx",
  },
];

export default blogs;
