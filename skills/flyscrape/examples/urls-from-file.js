// Load URLs from an external file
// Demonstrates: importing text files, processing URL lists
// Usage: Create urls.txt first, then: flyscrape run urls-from-file.js

// urls.txt should contain one URL per line:
// https://example.com/page1
// https://example.com/page2
// https://example.com/page3

import urls from "./urls.txt"

export const config = {
  urls: urls.split("\n").filter(line => line.trim()),
  cache: "file",
  rate: 30,
};

export default function({ doc, url }) {
  return {
    url,
    title: doc.find("title").text().trim(),
    h1: doc.find("h1").text().trim(),
    description: doc.find('meta[name="description"]').attr("content") || null,
  };
}
