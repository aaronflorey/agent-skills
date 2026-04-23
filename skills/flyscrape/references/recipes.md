# Flyscrape Recipes & Patterns

Ready-to-use patterns for common scraping scenarios.

## Loading URLs from a File

Read URLs from a text file (one per line):

```javascript
// urls.txt:
// https://example.com/page1
// https://example.com/page2
// https://example.com/page3

import urls from "./urls.txt"

export const config = {
  urls: urls.split("\n").filter(u => u.trim()),
};

export default function({ doc, url }) {
  return {
    url,
    title: doc.find("title").text().trim(),
  };
}
```

---

## Manual Link Following

For complex navigation logic, disable automatic following and use `follow()`:

```javascript
export const config = {
  url: "https://news.ycombinator.com/",
  depth: 5,
  follow: [],  // Disable automatic following
};

export default function({ url, doc, follow }) {
  // Custom logic: only follow "More" link
  const nextLink = doc.find(".morelink").attr("href");
  
  if (nextLink) {
    follow(nextLink);  // Manually queue this URL
  }

  return {
    url,
    items: doc.find(".athing").map(item => item.find(".titleline a").text()),
  };
}
```

---

## Nested Scraping with Detail Pages

Scrape a list page, then fetch additional details from each item's page:

```javascript
export const config = {
  url: "https://news.ycombinator.com/",
};

export default function({ doc, scrape }) {
  const post = doc.find(".athing.submission").first();
  const title = post.find(".titleline > a").text();
  const commentsLink = post.next().find("a").last().attr("href");

  // Nested scrape: fetch and parse the comments page
  const comments = scrape(commentsLink, function({ doc }) {
    return doc.find(".comtr").map(comment => ({
      author: comment.find(".hnuser").text(),
      text: comment.find(".commtext").text(),
    }));
  });

  return {
    title,
    comments,  // Array of comment objects
  };
}
```

---

## Extracting Structured Table Data

Parse HTML tables into structured objects:

```javascript
export default function({ doc }) {
  const rows = doc.find("table tbody tr");

  return {
    data: rows.map(row => {
      const cols = row.find("td");
      return {
        position: cols.get(0).text().trim(),
        name: cols.get(1).text().trim(),
        value: cols.get(2).text().trim(),
        change: cols.get(3).text().trim(),
      };
    }),
  };
}
```

**With dynamic column detection:**
```javascript
export default function({ doc }) {
  // Get headers
  const headers = doc.find("table thead th").map(th => 
    th.text().trim().toLowerCase().replace(/\s+/g, "_")
  );

  // Map rows to objects
  const rows = doc.find("table tbody tr").map(row => {
    const obj = {};
    row.find("td").each((cell, idx) => {
      if (headers[idx]) {
        obj[headers[idx]] = cell.text().trim();
      }
    });
    return obj;
  });

  return { rows };
}
```

---

## Handling Pagination Patterns

### "Next" button pagination
```javascript
export const config = {
  url: "https://example.com/products",
  depth: 50,
  follow: [".pagination .next", "a[rel='next']"],
};
```

### Numbered pagination
```javascript
export const config = {
  url: "https://example.com/products",
  depth: 20,
  follow: [".pagination a[href*='page=']"],
  blockedURLs: ["page=1$"],  // Don't revisit page 1
};
```

### "Load more" / infinite scroll (requires browser mode)
```javascript
export const config = {
  url: "https://example.com/feed",
  browser: true,
  // Browser mode waits for JS to render
  // But infinite scroll may need custom handling
};
```

### Manual pagination with page numbers
```javascript
export const config = {
  urls: Array.from({ length: 10 }, (_, i) => 
    `https://example.com/products?page=${i + 1}`
  ),
};
```

---

## Conditional Data Extraction

Extract different data based on page type:

```javascript
export default function({ doc, url }) {
  // Detect page type and extract accordingly
  if (url.includes("/product/")) {
    return extractProduct(doc);
  } else if (url.includes("/category/")) {
    return extractCategory(doc);
  } else {
    return { type: "unknown", url };
  }
}

function extractProduct(doc) {
  return {
    type: "product",
    name: doc.find("h1.product-title").text(),
    price: doc.find(".price").text(),
    description: doc.find(".description").text(),
  };
}

function extractCategory(doc) {
  return {
    type: "category",
    name: doc.find("h1").text(),
    productCount: doc.find(".product-card").length(),
  };
}
```

---

## Extracting JSON from Script Tags

Many sites embed data as JSON in script tags:

```javascript
export default function({ doc }) {
  // Find script with JSON data
  const scripts = doc.find("script");
  let data = null;

  scripts.each(script => {
    const text = script.text();
    if (text.includes("__INITIAL_DATA__")) {
      // Extract JSON from: var __INITIAL_DATA__ = {...};
      const match = text.match(/__INITIAL_DATA__\s*=\s*(\{[\s\S]*?\});/);
      if (match) {
        data = JSON.parse(match[1]);
      }
    }
  });

  return { 
    embedded_data: data,
    // Also extract visible content as fallback
    title: doc.find("h1").text(),
  };
}
```

---

## Extracting All Links from a Page

```javascript
export default function({ doc, absoluteURL }) {
  const links = doc.find("a[href]").map(a => ({
    text: a.text().trim(),
    href: absoluteURL(a.attr("href")),
    isExternal: a.attr("href")?.startsWith("http"),
  })).filter(link => link.text && link.href);

  // Deduplicate
  const unique = [...new Map(links.map(l => [l.href, l])).values()];

  return { links: unique };
}
```

---

## Downloading Files with Organization

```javascript
import { download } from "flyscrape/http";

export default function({ doc, absoluteURL, url }) {
  // Create folder name from URL
  const folder = new URL(url).pathname.replace(/\//g, "_") || "root";

  // Download images
  doc.find("img[src]").each(img => {
    const src = absoluteURL(img.attr("src"));
    if (src.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      download(src, `downloads/${folder}/`);
    }
  });

  // Download PDFs
  doc.find("a[href$='.pdf']").each(link => {
    const href = absoluteURL(link.attr("href"));
    download(href, `downloads/pdfs/`);
  });

  return { page: url, folder };
}
```

---

## Rate-Limited Polite Scraping

```javascript
export const config = {
  url: "https://example.com",
  depth: 10,
  
  // Be polite
  rate: 20,           // Max 20 requests/minute
  concurrency: 1,     // One at a time
  
  // Cache to avoid re-fetching
  cache: "file",
  
  // Identify yourself
  headers: {
    "User-Agent": "MyScraper/1.0 (contact@example.com)",
  },
};
```

---

## Multi-Site Scraping with Different Extractors

```javascript
export const config = {
  urls: [
    "https://site-a.com/products",
    "https://site-b.com/items",
  ],
  allowedDomains: ["*"],
};

const extractors = {
  "site-a.com": (doc) => ({
    source: "site-a",
    items: doc.find(".product").map(p => ({
      name: p.find(".title").text(),
      price: p.find(".cost").text(),
    })),
  }),
  
  "site-b.com": (doc) => ({
    source: "site-b", 
    items: doc.find(".item-card").map(i => ({
      name: i.find("h3").text(),
      price: i.find(".price-tag").text(),
    })),
  }),
};

export default function({ doc, url }) {
  const domain = new URL(url).hostname.replace("www.", "");
  const extractor = extractors[domain];
  
  if (extractor) {
    return extractor(doc);
  }
  return { error: "No extractor for domain", domain };
}
```

---

## Extracting Metadata and SEO Info

```javascript
export default function({ doc, url }) {
  return {
    url,
    seo: {
      title: doc.find("title").text(),
      description: doc.find('meta[name="description"]').attr("content"),
      canonical: doc.find('link[rel="canonical"]').attr("href"),
      robots: doc.find('meta[name="robots"]').attr("content"),
    },
    openGraph: {
      title: doc.find('meta[property="og:title"]').attr("content"),
      description: doc.find('meta[property="og:description"]').attr("content"),
      image: doc.find('meta[property="og:image"]').attr("content"),
      type: doc.find('meta[property="og:type"]').attr("content"),
    },
    headings: {
      h1: doc.find("h1").map(h => h.text().trim()),
      h2: doc.find("h2").map(h => h.text().trim()),
    },
    links: {
      internal: doc.find('a[href^="/"]').length(),
      external: doc.find('a[href^="http"]').length(),
    },
  };
}
```

---

## Error Handling Pattern

```javascript
export default function({ doc, url }) {
  try {
    // Check if page loaded correctly
    const errorMessage = doc.find(".error-page, .not-found");
    if (errorMessage.length() > 0) {
      return {
        url,
        error: "Page error",
        message: errorMessage.text().trim(),
      };
    }

    // Check for expected content
    const mainContent = doc.find(".main-content");
    if (mainContent.length() === 0) {
      return {
        url,
        error: "Missing content",
        message: "Main content area not found",
      };
    }

    // Normal extraction
    return {
      url,
      success: true,
      title: doc.find("h1").text(),
      content: mainContent.text().trim().substring(0, 500),
    };

  } catch (e) {
    return {
      url,
      error: "Extraction failed",
      message: String(e),
    };
  }
}
```
