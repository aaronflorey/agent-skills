// Manual link following for precise navigation control
// Demonstrates: disabling auto-follow, using follow() function
// Usage: flyscrape run manual-follow.js

export const config = {
  url: "https://news.ycombinator.com/",
  depth: 5,
  follow: [],  // Disable automatic following
  cache: "file",
};

export default function({ url, doc, follow }) {
  // Extract the "More" link for pagination
  const nextLink = doc.find(".morelink").attr("href");

  // Manually decide to follow it
  if (nextLink) {
    follow(nextLink);
  }

  // Extract data from current page
  const posts = doc.find(".athing").map(post => ({
    title: post.find(".titleline > a").text(),
    link: post.find(".titleline > a").attr("href"),
  }));

  return {
    page: url,
    nextPage: nextLink || null,
    posts,
  };
}
