// Scrape Hacker News front page posts
// Usage: flyscrape run hackernews.js

export const config = {
  url: "https://news.ycombinator.com/",
  cache: "file",  // Cache for development
};

export default function({ doc, absoluteURL }) {
  const posts = doc.find(".athing");
  
  return {
    posts: posts.map(post => {
      const titleLine = post.find(".titleline > a");
      const meta = post.next();  // The subtext row
      
      return {
        rank: post.find(".rank").text().replace(".", ""),
        title: titleLine.text(),
        url: absoluteURL(titleLine.attr("href")),
        points: meta.find(".score").text().replace(" points", ""),
        user: meta.find(".hnuser").text(),
        comments: meta.find("a").last().text(),
      };
    }),
  };
}
