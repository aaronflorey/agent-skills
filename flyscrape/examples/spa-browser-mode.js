// Scrape a JavaScript-heavy SPA site using browser mode
// Demonstrates: browser mode, waiting for dynamic content
// Usage: flyscrape run spa-site.js

export const config = {
  url: "https://spa-example.com/",
  
  // Enable headless browser for JavaScript rendering
  browser: true,
  headless: true,  // Set to false to see the browser
  
  // Cache rendered pages
  cache: "file",
  
  // Single page, no following
  depth: 0,
};

export default function({ doc }) {
  // By the time this runs, JavaScript has executed
  // and dynamic content is available in the DOM
  
  const items = doc.find("[data-component='product-list'] .item");
  
  return {
    products: items.map(item => ({
      name: item.find(".title").text(),
      price: item.find(".price").text(),
      rating: item.attr("data-rating"),
      reviews: item.find(".review-count").text(),
    })),
    
    // Also grab any data from script tags
    totalCount: doc.find("[data-total-products]").attr("data-total-products"),
  };
}
