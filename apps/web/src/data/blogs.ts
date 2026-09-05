import jsAbsurdCover from "@/assets/blogs/why-does-javascript-feel-so-absurd.jpg";

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
  /** Estimated reading time */
  readTime: string;
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
    id: "why-does-javascript-feel-so-absurd",
    title: "Why Does JavaScript Feel So AbSuRd?",
    slug: "why-does-javascript-feel-so-absurd",
    excerpt:
      "[] == false // true. 0.1 + 0.2 === 0.3 // false. typeof null // \"object\". NaN === NaN // false. JavaScript has some wonderfully weird corners. Exploring the underlying engine design decisions, IEEE 754 floating point arithmetic, abstract type coercion algorithms, and decades of backward compatibility that make JS behave the way it does.",
    coverImage: jsAbsurdCover,
    date: "SEP 2026",
    readTime: "11 MIN READ",
    category: "JAVASCRIPT INTERNALS",
    tags: ["JavaScript", "Web Development", "Type Coercion", "Language Internals"],
    articleUrl: "https://zaxx-blog.hashnode.dev/why-does-javascript-feel-so-absurd",
  },
];

export default blogs;
