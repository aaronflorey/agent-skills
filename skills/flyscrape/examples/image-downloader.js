// Download images from a website
// Demonstrates: file downloads, directory organization
// Usage: flyscrape run image-downloader.js

import { download } from "flyscrape/http";

export const config = {
  url: "https://example.com/gallery",
  
  // Follow gallery pages
  depth: 5,
  follow: [".gallery-nav a", ".pagination a"],
  
  // Limit to same domain
  allowedDomains: ["example.com"],
  
  // Rate limit to be polite
  rate: 20,
  
  cache: "file",
};

export default function({ doc, absoluteURL, url }) {
  // Extract page/category info for organizing downloads
  const category = doc.find(".category-name").text().trim() || "uncategorized";
  
  const images = doc.find(".gallery-image img");
  
  // Download each image
  const downloaded = [];
  images.each(img => {
    const src = img.attr("src") || img.attr("data-src");
    if (src) {
      const imageUrl = absoluteURL(src);
      const filename = imageUrl.split("/").pop();
      
      // Download to category subfolder
      download(imageUrl, `downloads/${category}/`);
      downloaded.push(filename);
    }
  });
  
  return {
    page: url,
    category,
    imagesFound: images.length(),
    downloaded,
  };
}
