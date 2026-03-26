# Flyscrape Troubleshooting Guide

Common issues and their solutions when using flyscrape.

## Getting Blocked / 403 Errors

### Symptoms
- Requests return 403 Forbidden
- Site returns CAPTCHA pages
- Empty or different content than expected

### Solutions

**1. Add realistic headers**
```javascript
export const config = {
  headers: {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
  },
};
```

**2. Slow down requests**
```javascript
export const config = {
  rate: 20,        // Only 20 requests per minute
  concurrency: 1,  // One at a time
};
```

**3. Use browser mode** (renders like a real browser)
```javascript
export const config = {
  browser: true,
};
```

**4. Use your browser's cookies** (for sites where you're logged in)
```javascript
export const config = {
  cookies: "chrome",  // or "firefox", "edge"
};
```

**5. Use proxies**
```javascript
export const config = {
  proxies: [
    "http://proxy1:8080",
    "http://proxy2:8080",
  ],
};
```

---

## Empty Results / No Data Extracted

### Symptoms
- Script runs but returns empty arrays
- Fields are null or undefined
- Missing expected elements

### Solutions

**1. Check if site uses JavaScript rendering**

Run with browser mode to see if content appears:
```javascript
export const config = {
  browser: true,
  headless: false,  // Watch what happens
};
```

**2. Verify selectors in dev mode**

Use `flyscrape dev script.js` to iterate quickly with cached responses.

**3. Check for dynamic class names**

SPAs often generate random class names. Use more stable selectors:
```javascript
// Instead of:
doc.find(".css-1a2b3c")

// Use:
doc.find("[data-testid='product-title']")
doc.find("article h2")
doc.find(".product-card > a")
```

**4. Handle missing elements gracefully**
```javascript
const subtitle = doc.find(".subtitle");
return {
  title: doc.find("h1").text(),
  subtitle: subtitle.length() > 0 ? subtitle.text() : null,
};
```

---

## Links Not Being Followed

### Symptoms
- Only the initial URL is scraped
- Pagination doesn't work
- Linked pages aren't visited

### Solutions

**1. Set depth > 0**
```javascript
export const config = {
  depth: 5,  // Must be > 0 to follow links
};
```

**2. Check your follow selectors**
```javascript
export const config = {
  depth: 5,
  follow: [".pagination a", ".next-page"],  // Must match actual links
};
```

**3. Check domain restrictions**
```javascript
export const config = {
  // Links to other domains are blocked by default
  allowedDomains: ["example.com", "cdn.example.com"],
  // Or allow all:
  allowedDomains: ["*"],
};
```

**4. Check URL filters**
```javascript
export const config = {
  // These might be blocking your links
  allowedURLs: ["/products/"],  // Only URLs containing /products/
  blockedURLs: ["/login"],      // Blocked patterns
};
```

**5. Use manual following for complex logic**
```javascript
export const config = {
  depth: 5,
  follow: [],  // Disable automatic following
};

export default function({ doc, follow }) {
  // Custom logic to decide what to follow
  const nextPage = doc.find(".pagination .next").attr("href");
  if (nextPage && !nextPage.includes("page=100")) {
    follow(nextPage);
  }
  return { /* ... */ };
}
```

---

## Slow Scraping Performance

### Solutions

**1. Increase concurrency** (if site allows)
```javascript
export const config = {
  concurrency: 10,  // 10 parallel requests
};
```

**2. Enable caching during development**
```javascript
export const config = {
  cache: "file",
};
```

**3. Avoid browser mode if not needed**

Browser mode is slower. Only use it for JavaScript-heavy sites:
```javascript
export const config = {
  browser: false,  // Default, faster
};
```

**4. Be more selective with link following**
```javascript
export const config = {
  follow: [".product-link"],  // Only follow product links
  blockedURLs: ["/reviews", "/related"],  // Skip unnecessary pages
};
```

---

## Automatic Retry Behavior

Flyscrape automatically retries failed requests with exponential backoff:

| Retry | Delay | Status Codes Retried |
|-------|-------|---------------------|
| 1st   | 1s    | 403, 408, 425, 429, 500, 502, 503, 504 |
| 2nd   | 2s    | |
| 3rd   | 5s    | |
| 4th   | 10s   | |

This is automatic - no configuration needed.

---

## Cache Issues

### Stale cached data
Delete the cache file to force fresh requests:
```bash
rm scriptname.cache
flyscrape run scriptname.js
```

### Share cache between scripts
```javascript
export const config = {
  cache: "file:/path/to/shared.cache",
};
```

---

## Browser Mode Issues

### Browser not found
First run with `browser: true` downloads Chromium automatically. If it fails:
```bash
# Check for network/permissions issues
# The browser is downloaded to a cache directory
```

### Can't see what's happening
```javascript
export const config = {
  browser: true,
  headless: false,  // Opens visible browser window
};
```

### Proxies don't work with browser mode
This is a known limitation. Use regular mode with proxies:
```javascript
export const config = {
  browser: false,  // Required for proxies
  proxies: ["http://proxy:8080"],
};
```

---

## Output Issues

### JSON too large / memory issues
Use NDJSON format for streaming large datasets:
```javascript
export const config = {
  output: {
    format: "ndjson",
    file: "results.ndjson",
  },
};
```

### Need to process results further
NDJSON can be processed line-by-line:
```bash
# Count results
wc -l results.ndjson

# Filter with jq
cat results.ndjson | jq 'select(.price > 100)'

# Convert to CSV
cat results.ndjson | jq -r '[.name, .price] | @csv'
```

---

## Dev Mode vs Run Mode

| Feature | `flyscrape dev` | `flyscrape run` |
|---------|-----------------|-----------------|
| Watches for changes | Yes | No |
| Uses cache | Always | If configured |
| Follows links | No | Yes (if depth > 0) |
| Use case | Developing extraction logic | Production scraping |

Always start with `dev` mode to iterate on your selectors, then switch to `run` for the actual scrape.
