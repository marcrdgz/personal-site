import { BlogPost } from "../../components/BlogPost";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import { SiteMeta } from "../../components/SiteMeta";
import { getAllPostSlugs, getPostData } from "../../lib/posts";

export default function Post({ post }) {
  return (
    <div>
      <SiteMeta
        title={post.title}
        description={post.description}
        path={`/blog/${post.slug}`}
        type="article"
        publishedTime={post.date}
        tags={post.tags}
      />

      <main>
        <NavBar />
        <BlogPost post={post} />
        <Footer />
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: getAllPostSlugs(),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostData(params.slug);
  return { props: { post } };
}
