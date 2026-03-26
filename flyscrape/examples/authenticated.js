// Scrape authenticated content using browser cookies
// Demonstrates: using local browser cookies for auth
// Usage: First log in via Chrome, then: flyscrape run authenticated.js

export const config = {
  url: "https://members-only-site.com/dashboard",
  
  // Use Chrome's cookie store (you must be logged in via Chrome)
  cookies: "chrome",  // or "firefox" or "edge"
  
  // Stay within the authenticated domain
  allowedDomains: ["members-only-site.com"],
  
  // Follow member pages
  depth: 2,
  follow: [".nav-link", ".content-link"],
  
  // Don't hit login/logout pages
  blockedURLs: ["/login", "/logout", "/signup"],
  
  cache: "file",
};

export default function({ doc, url }) {
  // Check if we're actually authenticated
  const userBadge = doc.find(".user-badge");
  if (userBadge.length() === 0) {
    return {
      error: "Not authenticated - please log in via your browser first",
      url,
    };
  }
  
  return {
    url,
    user: userBadge.text(),
    content: {
      title: doc.find("h1").text(),
      body: doc.find(".content-body").text().trim(),
      memberSince: doc.find(".member-since").text(),
    },
  };
}
