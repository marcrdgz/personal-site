import Head from "next/head";
import { siteConfig } from "../lib/site";

export function SiteMeta({
  title,
  description,
  path = "",
  type = "website",
  image,
  publishedTime,
  tags,
}) {
  const pageTitle =
    title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
  const pageDescription = description ?? siteConfig.description;
  const pageUrl = siteConfig.url ? `${siteConfig.url}${path}` : null;
  const pageImage = image
    ? image.startsWith("http")
      ? image
      : `${siteConfig.url}${image}`
    : null;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {pageUrl && <link rel="canonical" href={pageUrl} />}

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteConfig.name} />
      {pageUrl && <meta property="og:url" content={pageUrl} />}
      {pageImage && <meta property="og:image" content={pageImage} />}
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {tags?.length > 0 && (
        <meta property="article:tag" content={tags.join(", ")} />
      )}

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:creator" content={siteConfig.twitterHandle} />

      <link rel="icon" href="/favicon.svg" />
    </Head>
  );
}
