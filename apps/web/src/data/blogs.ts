import jsAbsurdCoverPart1 from "@/assets/blogs/why-does-javascript-feel-so-absurd-part-1.png";
import jsAbsurdCoverPart2 from "@/assets/blogs/why-does-javascript-feel-so-absurd-part-2.png";
import jsAbsurdCoverPart3 from "@/assets/blogs/why-does-javascript-feel-so-absurd-part-3.png";

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
  /** Formatted date label, e.g. "SEP 2026" */
  date: string;
  /** Exact ISO publication date for chronological sorting (YYYY-MM-DD) */
  publishDate: string;
  /** Estimated reading time display string */
  readTime: string;
  /** Estimated reading time in minutes for numerical sorting */
  readTimeMinutes: number;
  /** Main technical domain */
  category: string;
  /** Technical keywords / technologies */
  tags: string[];
  /** External Hashnode article link */
  articleUrl: string;
  /** Optional full article markdown content */
  content?: string;
}

export const blogs: BlogPost[] = [
  {
    id: "why-does-javascript-feel-so-absurd-part-1",
    title: "Why Does JavaScript Feel So AbSuRd? Part - 1",
    slug: "why-does-javascript-feel-so-absurd-part-1",
    excerpt:
      "[] == false // true. 0.1 + 0.2 === 0.3 // false. typeof null // \"object\". NaN === NaN // false. JavaScript has some wonderfully weird corners. Exploring the underlying engine design decisions, IEEE 754 floating point arithmetic, abstract type coercion algorithms, and decades of backward compatibility that make JS behave the way it does.",
    coverImage: jsAbsurdCoverPart1,
    date: "SEP 2026",
    publishDate: "2026-09-01",
    readTime: "11 MIN READ",
    readTimeMinutes: 11,
    category: "JAVASCRIPT INTERNALS",
    tags: ["JavaScript", "Web Development", "Type Coercion", "Language Internals"],
    articleUrl: "https://zaxx-blog.hashnode.dev/why-does-javascript-feel-so-absurd-part-1",
  },
  {
    id: "why-does-javascript-feel-so-absurd-part-2",
    title: "Why Does JavaScript Feel So AbSuRd? Part - 2",
    slug: "why-does-javascript-feel-so-absurd-part-2",
    excerpt:
      "If Part 1 was about JavaScript doing suspicious things with values, Part 2 is where we meet what makes JavaScript feel like an actual programming language: Functions. Exploring first-class functions, higher-order functions, reduce(), currying, function composition, pipe(), lexical scope, the scope chain, and the mechanics behind `this`.",
    coverImage: jsAbsurdCoverPart2,
    date: "SEP 2026",
    publishDate: "2026-09-04",
    readTime: "11 MIN READ",
    readTimeMinutes: 11,
    category: "FUNCTIONS & SCOPE",
    tags: ["JavaScript", "Functions", "Scope & Closures", "Functional Programming"],
    articleUrl: "https://zaxx-blog.hashnode.dev/why-does-javascript-feel-so-absurd-part-2",
  },
  {
    id: "why-does-javascript-feel-so-absurd-part-3",
    title: "Why Does JavaScript Feel So AbSuRd? Part - 3",
    slug: "why-does-javascript-feel-so-absurd-part-3",
    excerpt:
      "Understanding JavaScript hoisting, the Temporal Dead Zone (TDZ), closures, real-world patterns like debounce and throttle, the five rules of `this`, call(), apply(), bind(), method borrowing, and finally solving the architectural mystery from Part 2.",
    coverImage: jsAbsurdCoverPart3,
    date: "SEP 2026",
    publishDate: "2026-09-07",
    readTime: "12 MIN READ",
    readTimeMinutes: 12,
    category: "CLOSURES & THIS",
    tags: ["JavaScript", "Closures", "this Keyword", "Hoisting", "Scope & Context"],
    articleUrl: "https://zaxx-blog.hashnode.dev/why-does-javascript-feel-so-absurd-part-3",
  },
];

export default blogs;
