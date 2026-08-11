import Link from "next/link";
import styles from "../styles/BlogList.module.css";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const BlogList = ({ posts }) => {
  return (
    <section className={styles.list}>
      <h1 className={styles.title}>Blog</h1>
      {posts.length === 0 ? (
        <p className={styles.empty}>No posts yet. Check back soon.</p>
      ) : (
        posts.map((post) => (
          <article key={post.slug} className={styles.post}>
            <Link href={`/blog/${post.slug}`} className={styles.link}>
              <h2 className={styles.postTitle}>{post.title}</h2>
              {post.description && (
                <p className={styles.description}>{post.description}</p>
              )}
              <div className={styles.meta}>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
            </Link>
          </article>
        ))
      )}
    </section>
  );
};
