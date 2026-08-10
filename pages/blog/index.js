import { BlogList } from "../../components/BlogList";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import { SiteMeta } from "../../components/SiteMeta";
import { getSortedPostsData } from "../../lib/posts";
import { siteConfig } from "../../lib/site";

export default function Blog({ posts }) {
  return (
    <div>
      <SiteMeta
        title="Blog"
        description={`${siteConfig.name} — Blog`}
        path="/blog"
      />

      <main>
        <NavBar />
        <BlogList posts={posts} />
        <Footer />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const posts = getSortedPostsData();
  return { props: { posts } };
}
