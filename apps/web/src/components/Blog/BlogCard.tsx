import type { BlogPost } from "@/data/blogs";
import "./BlogCard.css";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="blog-card-btn-icon">
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

export function BlogCard({ post, index }: BlogCardProps) {
  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <article className="blog-card" id={`blog-${post.id}`}>
      {/* Editorial top line with index, category, and date */}
      <div className="blog-card-topbar">
        <div className="blog-card-meta-left">
          <span className="blog-card-index">{formattedIndex}</span>
          <span className="blog-card-dot">•</span>
          <span className="blog-card-category">{post.category}</span>
        </div>
        <div className="blog-card-meta-right">
          <span className="blog-card-date">{post.date}</span>
          <span className="blog-card-dot">•</span>
          <span className="blog-card-readtime">{post.readTime}</span>
        </div>
      </div>

      <div className="blog-card-main">
        {/* Left / Top: Technical Cover Graphic */}
        <a
          href={post.articleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="blog-card-media"
          aria-label={`Read article: ${post.title} on Hashnode`}
        >
          <div className="blog-card-img-wrapper">
            <img
              src={post.coverImage}
              alt={`${post.title} cover image`}
              className="blog-card-img"
              loading="lazy"
            />
          </div>
          <span className="blog-card-media-badge">Hashnode</span>
        </a>

        {/* Right / Body: Title, Excerpt, Tags, and Magnetic Read CTA */}
        <div className="blog-card-content">
          <h2 className="blog-card-title">
            <a
              href={post.articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-card-title-link"
            >
              {post.title}
            </a>
          </h2>

          <p className="blog-card-excerpt">{post.excerpt}</p>

          <div className="blog-card-footer">
            <div className="blog-card-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="blog-card-tag">
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={post.articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-card-cta magnetic"
              data-strength="28"
              aria-label={`Read full article "${post.title}" on Hashnode`}
            >
              <span className="blog-card-cta-text">Read on Hashnode</span>
              <span className="blog-card-cta-arrow">
                <ArrowUpRight />
              </span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;
