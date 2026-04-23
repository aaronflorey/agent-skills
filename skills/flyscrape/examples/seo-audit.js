// SEO audit - extract metadata from pages
// Demonstrates: meta tag extraction, structured data
// Usage: flyscrape run seo-audit.js --url "https://yoursite.com"

export const config = {
  url: "https://example.com",
  depth: 2,
  follow: ["a[href^='/']"],  // Internal links only
  allowedURLs: ["^/"],       // Stay on same site
  rate: 30,
  cache: "file",
  output: {
    file: "seo-report.json",
  },
};

export default function({ doc, url }) {
  // Basic meta
  const title = doc.find("title").text().trim();
  const description = doc.find('meta[name="description"]').attr("content");
  const canonical = doc.find('link[rel="canonical"]').attr("href");
  
  // Open Graph
  const ogTitle = doc.find('meta[property="og:title"]').attr("content");
  const ogDescription = doc.find('meta[property="og:description"]').attr("content");
  const ogImage = doc.find('meta[property="og:image"]').attr("content");
  
  // Twitter Card
  const twitterCard = doc.find('meta[name="twitter:card"]').attr("content");
  const twitterTitle = doc.find('meta[name="twitter:title"]').attr("content");
  
  // Headings structure
  const h1s = doc.find("h1").map(h => h.text().trim());
  const h2s = doc.find("h2").map(h => h.text().trim());
  
  // Links analysis
  const internalLinks = doc.find('a[href^="/"], a[href^="' + new URL(url).origin + '"]').length();
  const externalLinks = doc.find('a[href^="http"]').length() - 
                        doc.find('a[href^="' + new URL(url).origin + '"]').length();
  
  // Images without alt
  const imagesWithoutAlt = doc.find('img:not([alt]), img[alt=""]').length();
  const totalImages = doc.find('img').length();

  // Issues
  const issues = [];
  if (!title) issues.push("Missing title tag");
  if (!description) issues.push("Missing meta description");
  if (h1s.length === 0) issues.push("No H1 tag found");
  if (h1s.length > 1) issues.push("Multiple H1 tags found");
  if (imagesWithoutAlt > 0) issues.push(`${imagesWithoutAlt} images missing alt text`);
  if (title && title.length > 60) issues.push("Title too long (>60 chars)");
  if (description && description.length > 160) issues.push("Description too long (>160 chars)");

  return {
    url,
    meta: {
      title,
      titleLength: title?.length || 0,
      description,
      descriptionLength: description?.length || 0,
      canonical,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      image: ogImage,
    },
    twitter: {
      card: twitterCard,
      title: twitterTitle,
    },
    structure: {
      h1: h1s,
      h2: h2s,
      h1Count: h1s.length,
      h2Count: h2s.length,
    },
    links: {
      internal: internalLinks,
      external: externalLinks,
    },
    images: {
      total: totalImages,
      missingAlt: imagesWithoutAlt,
    },
    issues,
    score: Math.max(0, 100 - (issues.length * 15)),
  };
}
