import { useRef } from "react";
import { Preloader } from "@/components/motion/Preloader";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/sections/Footer/Footer";
import { useMagnetic } from "@/components/motion/useMagnetic";
import { BlogCard } from "@/components/Blog/BlogCard";
import { blogs } from "@/data/blogs";
import { GLOBAL_LINKS } from "@/data/links";
import "./BlogPage.css";

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="blogpage-chip-icon">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 17 17 7M8 7h9v9"
      />
    </svg>
  );
}

export function BlogPage() {
  const root = useRef<HTMLElement>(null);
  useMagnetic(root);

  return (
    <>
      <Preloader text="Blog" />
      <Navbar />
      <main className="blogpage" ref={root}>
        {/* Editorial Header Section matching Work & About pages */}
        <header className="blogpage-head container">
          <div className="blogpage-head-top">
            <span className="blogpage-index">
              {String(blogs.length).padStart(2, "0")} {blogs.length === 1 ? "Article" : "Articles"} &bull; Engineering Notes
            </span>

            <a
              href={GLOBAL_LINKS.hashnode}
              target="_blank"
              rel="noopener noreferrer"
              className="blogpage-hashnode-badge magnetic"
              data-strength="18"
              aria-label="View Rohit Maity on Hashnode"
            >
              <span className="blogpage-badge-dot" />
              <span>hashnode.com/@zaxx</span>
              <span className="blogpage-badge-arrow">
                <ArrowUpRight />
              </span>
            </a>
          </div>

          <h1 className="blogpage-title">
            Technical <em>writings</em> &amp; systems architecture
          </h1>

          <p className="blogpage-lead">
            Deep dives into JavaScript engine mechanics, type systems, web architecture,
            and software engineering fundamentals.
            Opening previews below &mdash; full articles hosted on Hashnode.
          </p>
        </header>

        {/* Blog Post List using the persistent unified BlogCard component */}
        <section className="blogpage-posts container" aria-label="Technical Blog Posts">
          <div className="blogpage-posts-list">
            {blogs.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

export default BlogPage;
