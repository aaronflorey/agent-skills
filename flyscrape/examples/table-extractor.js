// Table data extraction with proper structure
// Demonstrates: table parsing, handling headers, data cleaning
// Usage: flyscrape run table-extractor.js

export const config = {
  url: "https://example.com/data-table",
  cache: "file",
};

export default function({ doc }) {
  const tables = doc.find("table");
  
  return {
    tables: tables.map((table, tableIndex) => {
      // Get headers from first row or thead
      const headerRow = table.find("thead tr").length() > 0 
        ? table.find("thead tr").first()
        : table.find("tr").first();
      
      const headers = headerRow.find("th, td").map(cell => 
        cell.text().trim().toLowerCase().replace(/\s+/g, "_")
      );
      
      // Get data rows (skip header if in tbody, or skip first row)
      const dataRows = table.find("tbody tr").length() > 0
        ? table.find("tbody tr")
        : table.find("tr").filter((_, idx) => idx > 0);
      
      const rows = dataRows.map(row => {
        const cells = row.find("td");
        const rowData = {};
        
        headers.forEach((header, idx) => {
          const cell = cells.get(idx);
          if (cell) {
            rowData[header] = cell.text().trim();
          }
        });
        
        return rowData;
      });
      
      return {
        tableIndex,
        caption: table.find("caption").text() || null,
        headers,
        rowCount: rows.length,
        data: rows,
      };
    }),
  };
}
