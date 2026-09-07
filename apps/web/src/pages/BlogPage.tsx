import { useState, useMemo, useRef } from "react";
import { Preloader } from "@/components/motion/Preloader";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/sections/Footer/Footer";
import { useMagnetic } from "@/components/motion/useMagnetic";
import { BlogCard } from "@/components/Blog/BlogCard";
import { blogs, type BlogPost } from "@/data/blogs";
import { GLOBAL_LINKS } from "@/data/links";
import "./BlogPage.css";

type SortOption = "recent" | "oldest" | "read-time-asc" | "read-time-desc" | "title-asc";

const ALL_CATEGORY = "ALL";

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

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="blogpage-search-icon">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="blogpage-clear-icon">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SortIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="blogpage-sort-icon">
      <path d="M3 7h18M6 12h12M10 17h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function BlogPage() {
  const root = useRef<HTMLElement>(null);
  useMagnetic(root);

  // Filter & Sort State (Default sort: "recent")
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_CATEGORY);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  // Dynamic unique categories
  const categories = useMemo(() => {
    const unique = Array.from(new Set(blogs.map((b) => b.category)));
    return [ALL_CATEGORY, ...unique];
  }, []);

  // Post counts by category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { [ALL_CATEGORY]: blogs.length };
    for (const b of blogs) {
      counts[b.category] = (counts[b.category] || 0) + 1;
    }
    return counts;
  }, []);

  // Filtered and sorted blog items
  const processedBlogs = useMemo(() => {
    const filtered = blogs.filter((post: BlogPost) => {
      // 1. Category Filter
      if (selectedCategory !== ALL_CATEGORY && post.category !== selectedCategory) {
        return false;
      }

      // 2. Search Query (Title, Excerpt, Category, Tags)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = post.title.toLowerCase().includes(query);
        const matchExcerpt = post.excerpt.toLowerCase().includes(query);
        const matchCategory = post.category.toLowerCase().includes(query);
        const matchTags = post.tags.some((tag) => tag.toLowerCase().includes(query));

        if (!matchTitle && !matchExcerpt && !matchCategory && !matchTags) {
          return false;
        }
      }

      return true;
    });

    // 3. Sorting (Default: "recent")
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return b.publishDate.localeCompare(a.publishDate);
        case "oldest":
          return a.publishDate.localeCompare(b.publishDate);
        case "read-time-asc":
          return a.readTimeMinutes - b.readTimeMinutes;
        case "read-time-desc":
          return b.readTimeMinutes - a.readTimeMinutes;
        case "title-asc":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const isFiltered = selectedCategory !== ALL_CATEGORY || searchQuery.trim() !== "" || sortBy !== "recent";

  const handleResetFilters = () => {
    setSelectedCategory(ALL_CATEGORY);
    setSearchQuery("");
    setSortBy("recent");
  };

  return (
    <>
      <Preloader text="Blog" />
      <Navbar />
      <main className="blogpage" ref={root}>
        {/* Editorial Header Section */}
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

        {/* Filter, Search & Sort Control Toolbar */}
        <section className="blogpage-controls container" aria-label="Article Filters and Sorting">
          <div className="blogpage-toolbar">
            {/* Category Filter Pills */}
            <div className="blogpage-categories" role="tablist" aria-label="Filter articles by category">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                const count = categoryCounts[cat] || 0;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`blogpage-category-pill ${isActive ? "active" : ""}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <span>{cat === ALL_CATEGORY ? "All Articles" : cat}</span>
                    <span className="blogpage-category-count">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Action Controls: Search & Sort */}
            <div className="blogpage-actions">
              {/* Search Field */}
              <div className="blogpage-search-wrapper">
                <span className="blogpage-search-prefix">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, keywords..."
                  className="blogpage-search-input"
                  aria-label="Search articles by keywords"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="blogpage-search-clear"
                    aria-label="Clear search input"
                  >
                    <ClearIcon />
                  </button>
                )}
              </div>

              {/* Sort Selector Dropdown */}
              <div className="blogpage-sort-wrapper">
                <span className="blogpage-sort-icon-box">
                  <SortIcon />
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="blogpage-sort-select"
                  aria-label="Sort articles order"
                >
                  <option value="recent">Recent (Default)</option>
                  <option value="oldest">Oldest First</option>
                  <option value="read-time-asc">Read Time: Quick</option>
                  <option value="read-time-desc">Read Time: Deep Dive</option>
                  <option value="title-asc">Title: A → Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Status Bar */}
          {isFiltered && (
            <div className="blogpage-active-filter-bar">
              <span className="blogpage-active-count">
                Showing <strong>{processedBlogs.length}</strong> of {blogs.length} articles
                {selectedCategory !== ALL_CATEGORY && ` in "${selectedCategory}"`}
                {searchQuery.trim() && ` matching "${searchQuery}"`}
                {sortBy !== "recent" && ` (sorted)`}
              </span>
              <button
                type="button"
                onClick={handleResetFilters}
                className="blogpage-reset-btn"
                aria-label="Reset all applied filters"
              >
                Reset filters
              </button>
            </div>
          )}
        </section>

        {/* Blog Post List */}
        <section className="blogpage-posts container" aria-label="Technical Blog Posts">
          {processedBlogs.length > 0 ? (
            <div className="blogpage-posts-list">
              {processedBlogs.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="blogpage-empty">
              <div className="blogpage-empty-icon">
                <SearchIcon />
              </div>
              <h2 className="blogpage-empty-title">No articles found</h2>
              <p className="blogpage-empty-desc">
                No engineering notes matched your search query or selected category filter.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="blogpage-empty-cta magnetic"
                data-strength="20"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>

        <Footer />
      </main>
    </>
  );
}

export default BlogPage;
