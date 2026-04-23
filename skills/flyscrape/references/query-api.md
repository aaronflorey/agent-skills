# Flyscrape Query API Reference

The Query API provides jQuery-like methods for extracting data from HTML documents.

## Finding Elements

### doc.find(selector)
Find elements matching a CSS selector. Returns a selection that can be a single element or collection.

```javascript
const title = doc.find("h1");
const links = doc.find("a.nav-link");
const items = doc.find("ul.products > li");
const dataItems = doc.find("[data-product-id]");
```

---

## Element Properties

### text()
Get the text content (without HTML tags).

```javascript
// <h1>Hello <span>World</span></h1>
doc.find("h1").text();  // "Hello World"
```

### html()
Get the outer HTML including the element itself.

```javascript
// <div class="box">Content</div>
doc.find(".box").html();  // '<div class="box">Content</div>'
```

### name()
Get the tag name.

```javascript
// <article>...</article>
doc.find("article").name();  // "article"
```

### attr(name)
Get an attribute value.

```javascript
// <a href="/page" data-id="123">Link</a>
doc.find("a").attr("href");     // "/page"
doc.find("a").attr("data-id");  // "123"
```

### hasAttr(name)
Check if attribute exists.

```javascript
// <img src="pic.jpg" alt="Photo">
doc.find("img").hasAttr("alt");    // true
doc.find("img").hasAttr("title");  // false
```

### hasClass(className)
Check if element has a class.

```javascript
// <div class="card featured">...</div>
doc.find(".card").hasClass("featured");  // true
doc.find(".card").hasClass("hidden");    // false
```

---

## Collection Methods

### length()
Count elements in selection.

```javascript
const count = doc.find("li").length();  // 5
```

### first()
Get the first element.

```javascript
const firstItem = doc.find("li").first();
```

### last()
Get the last element.

```javascript
const lastItem = doc.find("li").last();
```

### get(index)
Get element by index (0-based).

```javascript
const secondItem = doc.find("li").get(1);
```

### map(fn)
Transform each element to an array.

```javascript
// <ul>
//   <li>Apple</li>
//   <li>Banana</li>
//   <li>Cherry</li>
// </ul>

const fruits = doc.find("li").map(item => item.text());
// ["Apple", "Banana", "Cherry"]

const links = doc.find("a").map(a => ({
  text: a.text(),
  href: a.attr("href"),
}));
// [{text: "Home", href: "/"}, {text: "About", href: "/about"}]
```

### filter(fn)
Filter elements by predicate.

```javascript
// Get only items with "active" class
const activeItems = doc.find("li").filter(item => item.hasClass("active"));

// Get links with external URLs
const externalLinks = doc.find("a").filter(a => 
  a.attr("href")?.startsWith("http")
);
```

### each(fn)
Iterate over elements (for side effects like downloading).

```javascript
doc.find("img").each(img => {
  const src = img.attr("src");
  download(absoluteURL(src), "images/");
});
```

---

## Traversal Methods

### parent()
Get the parent element.

```javascript
// <div class="container">
//   <span class="target">Text</span>
// </div>

doc.find(".target").parent().attr("class");  // "container"
```

### children()
Get direct child elements.

```javascript
// <ul>
//   <li>One</li>
//   <li>Two</li>
// </ul>

const items = doc.find("ul").children();
items.length();  // 2
```

### siblings()
Get all sibling elements (excluding self).

```javascript
// <ul>
//   <li class="a">One</li>
//   <li class="b">Two</li>
//   <li class="c">Three</li>
// </ul>

doc.find(".b").siblings();  
// [<li class="a">One</li>, <li class="c">Three</li>]
```

### prev()
Get the immediately preceding sibling.

```javascript
// <li>One</li>
// <li class="current">Two</li>
// <li>Three</li>

doc.find(".current").prev().text();  // "One"
```

### next()
Get the immediately following sibling.

```javascript
doc.find(".current").next().text();  // "Three"
```

### prevAll()
Get all preceding siblings.

```javascript
// <li>A</li>
// <li>B</li>
// <li class="current">C</li>
// <li>D</li>

doc.find(".current").prevAll();
// [<li>B</li>, <li>A</li>]  (in reverse DOM order)
```

### nextAll()
Get all following siblings.

```javascript
doc.find(".current").nextAll();
// [<li>D</li>]
```

### prevUntil(selector)
Get preceding siblings until (not including) selector match.

```javascript
// <h2>Section 1</h2>
// <p>Para 1</p>
// <p>Para 2</p>
// <h2>Section 2</h2>
// <p>Para 3</p>

doc.find("h2").get(1).prevUntil("h2");
// [<p>Para 2</p>, <p>Para 1</p>]
```

### nextUntil(selector)
Get following siblings until (not including) selector match.

```javascript
doc.find("h2").first().nextUntil("h2");
// [<p>Para 1</p>, <p>Para 2</p>]
```

---

## Chaining

Methods can be chained for complex traversal:

```javascript
// Get text of the link inside the parent container
doc.find(".item")
   .first()
   .parent()
   .find("a")
   .text();

// Get all product prices from featured section
doc.find(".featured")
   .children()
   .filter(item => item.hasClass("product"))
   .map(product => product.find(".price").text());
```

---

## Parsing External HTML

Use the `parse` function to parse HTML strings:

```javascript
import { parse } from "flyscrape";

const html = `<div class="data">
  <span class="value">42</span>
</div>`;

const doc = parse(html);
const value = doc.find(".value").text();  // "42"
```

Useful for parsing HTML embedded in JavaScript variables or API responses.

---

## Common Patterns

### Extract Table Data
```javascript
const rows = doc.find("table tbody tr").map(row => {
  const cells = row.find("td");
  return {
    name: cells.get(0).text(),
    price: cells.get(1).text(),
    stock: cells.get(2).text(),
  };
});
```

### Extract Structured Data
```javascript
const products = doc.find(".product-card").map(card => ({
  name: card.find(".product-name").text(),
  price: card.find(".price").text(),
  image: card.find("img").attr("src"),
  link: card.find("a").attr("href"),
  inStock: card.hasClass("in-stock"),
  rating: card.find("[data-rating]").attr("data-rating"),
}));
```

### Handle Missing Elements
```javascript
const subtitle = doc.find(".subtitle");
return {
  title: doc.find("h1").text(),
  // Check if element exists before accessing
  subtitle: subtitle.length() > 0 ? subtitle.text() : null,
};
```

### Extract All Links
```javascript
const links = doc.find("a[href]").map(a => ({
  text: a.text().trim(),
  href: absoluteURL(a.attr("href")),
})).filter(link => link.text.length > 0);
```
