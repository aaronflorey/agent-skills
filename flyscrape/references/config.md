# Flyscrape Configuration Reference

Complete reference for all `export const config = {}` options.

## URLs

### Single URL
```javascript
export const config = {
  url: "https://example.com/",
};
```

### Multiple URLs
```javascript
export const config = {
  urls: [
    "https://example.com/page1",
    "https://example.com/page2",
    "https://anothersite.com/",
  ],
};
```

Both `url` and `urls` can be used together.

---

## Link Following

### depth
How deep to follow links. Default: `0` (no following).

```javascript
export const config = {
  url: "https://example.com/",
  depth: 3,
};
```

Depth visualization:
```
https://example.com/           (depth 0 - initial)
↳ https://example.com/about    (depth 1)
  ↳ https://example.com/team   (depth 2)
    ↳ https://example.com/john (depth 3)
```

### follow
CSS selectors for links to follow. Default: `["a[href]"]` (all links).

```javascript
export const config = {
  url: "https://example.com/",
  depth: 5,
  follow: [
    ".pagination a",      // Pagination links
    ".article-list a",    // Article links
    ".next-page[href]",   // Next page button
  ],
};
```

**Disable automatic following** (for manual control via `follow()` function):
```javascript
export const config = {
  follow: [],
};
```

**Follow non-href attributes**:
```javascript
export const config = {
  follow: [".item[data-url]"],  // Follows data-url attribute
};
```

---

## Domain & URL Filtering

### allowedDomains
Restrict scraping to specific domains. Default: domain from starting URL.

```javascript
export const config = {
  url: "https://example.com/",
  allowedDomains: ["example.com", "cdn.example.com"],
};
```

Use `["*"]` to allow all domains:
```javascript
export const config = {
  allowedDomains: ["*"],
};
```

### blockedDomains
Block specific domains:
```javascript
export const config = {
  blockedDomains: ["ads.example.com", "tracking.com"],
};
```

### allowedURLs
Allow URLs matching regex patterns:
```javascript
export const config = {
  allowedURLs: [
    "/products/",
    "/articles/\\d+",  // Articles with numeric IDs
  ],
};
```

### blockedURLs
Block URLs matching regex patterns:
```javascript
export const config = {
  blockedURLs: [
    "/admin",
    "/login",
    "/cart",
  ],
};
```

---

## Rate Limiting & Concurrency

### rate
Requests per minute. Default: unlimited.

```javascript
export const config = {
  rate: 60,  // 1 request per second
};
```

### concurrency
Maximum concurrent requests. Default: unlimited.

```javascript
export const config = {
  concurrency: 5,
};
```

**Polite scraping example**:
```javascript
export const config = {
  rate: 30,        // 30 req/min
  concurrency: 2,  // Max 2 at once
};
```

---

## Caching

### cache
Enable file-based request caching. Useful for development.

```javascript
export const config = {
  cache: "file",  // Creates scriptname.cache
};
```

**Shared cache between scripts**:
```javascript
export const config = {
  cache: "file:/path/to/shared.cache",
};
```

When cached, `flyscrape dev` serves from cache instantly, letting you iterate on extraction logic without re-fetching.

---

## Browser Mode

For JavaScript-heavy pages (SPAs, dynamic content).

### browser
Enable headless Chromium. Default: `false`.

```javascript
export const config = {
  browser: true,
};
```

First run downloads Chromium automatically.

### headless
Show browser window (for debugging). Default: `true`.

```javascript
export const config = {
  browser: true,
  headless: false,  // Shows browser window
};
```

**Note**: Proxies are not compatible with browser mode.

---

## Proxies

### proxy
Single proxy:
```javascript
export const config = {
  proxy: "http://proxy.example.com:8080",
};
```

### proxies
Multiple proxies (rotated randomly):
```javascript
export const config = {
  proxies: [
    "http://proxy1.example.com:8080",
    "http://proxy2.example.com:8080",
    "http://user:pass@proxy3.example.com:8080",
  ],
};
```

Both `proxy` and `proxies` can be combined.

---

## Cookies

Use your browser's cookie store for authenticated scraping.

```javascript
export const config = {
  cookies: "chrome",   // or "firefox" or "edge"
};
```

This allows scraping sites where you're logged in via your browser.

---

## Headers

Custom HTTP headers:
```javascript
export const config = {
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Authorization": "Bearer your-token-here",
    "Accept-Language": "en-US,en;q=0.9",
  },
};
```

---

## Output

### output.file
Write to file instead of stdout:
```javascript
export const config = {
  output: {
    file: "results.json",
  },
};
```

### output.format
Output format: `"json"` (default) or `"ndjson"`.

```javascript
export const config = {
  output: {
    format: "ndjson",  // One JSON object per line
    file: "results.ndjson",
  },
};
```

NDJSON is useful for large datasets and streaming processing.

---

## Automatic Retry

Flyscrape automatically retries failed requests. No configuration needed.

**Retried status codes**: 403, 408, 425, 429, 500, 502, 503, 504

**Retry delays** (exponential backoff):
| Attempt | Delay |
|---------|-------|
| 1st retry | 1 second |
| 2nd retry | 2 seconds |
| 3rd retry | 5 seconds |
| 4th retry | 10 seconds |

After 4 retries, the request fails.

---

## CLI Overrides

Any config option can be overridden via command line:

```bash
flyscrape run script.js --url "https://other.com"
flyscrape run script.js --depth 5 --follow ".next-page a"
flyscrape run script.js --rate 30 --concurrency 2
flyscrape run script.js --browser --headless=false
flyscrape run script.js --output.file results.json --output.format ndjson
flyscrape run script.js --proxies "http://proxy1:8080,http://proxy2:8080"
```

---

## Complete Example

```javascript
export const config = {
  // URLs
  url: "https://example.com/products",
  urls: ["https://example.com/deals"],
  
  // Following
  depth: 3,
  follow: [".product-link", ".pagination a"],
  
  // Filtering
  allowedDomains: ["example.com"],
  allowedURLs: ["/products/"],
  blockedURLs: ["/admin", "/cart"],
  
  // Performance
  rate: 60,
  concurrency: 5,
  cache: "file",
  
  // Browser (for JS sites)
  browser: false,
  headless: true,
  
  // Authentication
  cookies: "chrome",
  headers: {
    "User-Agent": "MyBot/1.0",
  },
  
  // Output
  output: {
    file: "products.json",
    format: "json",
  },
};
```
