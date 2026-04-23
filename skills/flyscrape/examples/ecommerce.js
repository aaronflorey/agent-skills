// E-commerce product scraper with pagination
// Demonstrates: depth, follow, rate limiting, nested scraping
// Usage: flyscrape run ecommerce.js

export const config = {
  url: "https://example-shop.com/products",
  
  // Follow pagination up to 10 pages
  depth: 10,
  follow: [".pagination a.next", ".load-more"],
  
  // Be polite to the server
  rate: 30,        // 30 requests per minute
  concurrency: 2,  // Max 2 concurrent requests
  
  // Cache during development
  cache: "file",
  
  // Output to file
  output: {
    file: "products.json",
    format: "json",
  },
};

export default function({ doc, absoluteURL, scrape }) {
  const productCards = doc.find(".product-card");
  
  return {
    products: productCards.map(card => {
      const name = card.find(".product-name").text().trim();
      const price = card.find(".price").text().trim();
      const detailUrl = absoluteURL(card.find("a").attr("href"));
      const imageUrl = absoluteURL(card.find("img").attr("src"));
      
      // Nested scrape: get additional details from product page
      const details = scrape(detailUrl, ({ doc }) => ({
        description: doc.find(".product-description").text().trim(),
        sku: doc.find(".sku").text().trim(),
        availability: doc.find(".stock-status").text().trim(),
        specs: doc.find(".spec-item").map(spec => ({
          label: spec.find(".spec-label").text(),
          value: spec.find(".spec-value").text(),
        })),
      }));
      
      return {
        name,
        price,
        url: detailUrl,
        image: imageUrl,
        ...details,
      };
    }),
  };
}
