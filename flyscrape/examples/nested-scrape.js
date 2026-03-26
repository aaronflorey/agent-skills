// Scrape with nested detail pages (HN with comments)
// Demonstrates: scrape() function for fetching related pages
// Usage: flyscrape run nested-scrape.js

export const config = {
  url: "https://news.ycombinator.com/",
  cache: "file",
};

export default function({ doc, scrape }) {
  // Get the first post
  const post = doc.find(".athing.submission").first();
  const title = post.find(".titleline > a").text();
  const postUrl = post.find(".titleline > a").attr("href");
  
  // Get the comments link from the subtext row
  const subtext = post.next();
  const commentsLink = subtext.find("a").last().attr("href");

  // Nested scrape: fetch the comments page
  const comments = scrape(commentsLink, function({ doc }) {
    return doc.find(".comtr").map(comment => ({
      author: comment.find(".hnuser").text(),
      text: comment.find(".commtext").text().trim(),
      age: comment.find(".age a").text(),
    }));
  });

  return {
    title,
    url: postUrl,
    commentsPage: commentsLink,
    commentCount: comments.length,
    comments: comments.slice(0, 10),  // First 10 comments
  };
}
