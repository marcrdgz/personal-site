import Link from "next/link";
import styles from "../styles/BlogPost.module.css";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const BlogPost = ({ post }) => {
  return (
    <article className={styles.post}>
      <Link href="/blog" className={styles.back}>
        ← All posts
      </Link>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.meta}>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </div>
      <div
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
      {post.devtoUrl && (
        <p className={styles.devto}>
          Also published on{" "}
          <a
            href={post.devtoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.devtoLink}
          >
            DEV Community
          </a>
        </p>
      )}
    </article>
  );
};
