// Multi-site news aggregator
// Demonstrates: multiple starting URLs, URL filtering, NDJSON output
// Usage: flyscrape run news-aggregator.js

export const config = {
  // Scrape multiple news sites
  urls: [
    "https://news.ycombinator.com/",
    "https://lobste.rs/",
    "https://reddit.com/r/programming/.json",
  ],
  
  // Allow all these domains
  allowedDomains: ["*"],
  
  // Only scrape the starting pages, no following
  depth: 0,
  
  // Rate limit across all sites
  rate: 10,
  
  // Output as newline-delimited JSON for streaming
  output: {
    file: "news.ndjson",
    format: "ndjson",
  },
};

export default function({ doc, url }) {
  // Determine which site we're on and extract accordingly
  if (url.includes("ycombinator")) {
    return extractHackerNews(doc, url);
  } else if (url.includes("lobste.rs")) {
    return extractLobsters(doc, url);
  } else if (url.includes("reddit")) {
    return extractReddit(doc, url);
  }
  
  return { source: "unknown", url };
}

function extractHackerNews(doc, url) {
  return {
    source: "hackernews",
    url,
    items: doc.find(".athing").map(post => ({
      title: post.find(".titleline > a").text(),
      link: post.find(".titleline > a").attr("href"),
    })).filter(item => item.title),
  };
}

function extractLobsters(doc, url) {
  return {
    source: "lobsters",
    url,
    items: doc.find(".story").map(story => ({
      title: story.find(".link a").text(),
      link: story.find(".link a").attr("href"),
      tags: story.find(".tag").map(t => t.text()),
    })),
  };
}

function extractReddit(doc, url) {
  // Reddit JSON endpoint returns plain text
  // This is a simplified example - actual implementation 
  // would need to parse the JSON response
  return {
    source: "reddit",
    url,
    note: "Reddit API returns JSON - use HTTP client for better results",
  };
}
