const fs = require('fs');
const path = require('path');

// Load the data
const filePath = path.join(__dirname, 'products.json');
let data;
try {
  data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
} catch (error) {
  console.error('Error reading or parsing file:', error);
}

// 1. Products that are out of stock, not on sale, and under $20
const outOfStockNotOnSaleUnder20 = data
  .filter(product => !product.in_stock && !product.on_sale && Number(product.price.replace('$', '')) < 20)
  .map(product => product.name);

console.log("Out of stock, not on sale, under $20:", outOfStockNotOnSaleUnder20);

// 2. Most commonly used category
const categoryCounts = data.reduce((counts, product) => {
  product.categories.forEach(category => {
    counts[category] = (counts[category] || 0) + 1;
  });
  return counts;
}, {});

const mostCommonCategory = Object.keys(categoryCounts).reduce((a, b) => categoryCounts[a] > categoryCounts[b] ? a : b);
console.log("Most common category:", mostCommonCategory);

// 3. Average price of sale items
const saleItems = data.filter(product => product.on_sale);
const averageSalePrice = saleItems.length
  ? saleItems.reduce((sum, product) => sum + Number(product.price.replace('$', '')), 0) / saleItems.length
  : 0;

console.log("Average sale price:", averageSalePrice.toFixed(2));

// 4. Number of women’s products that are out of stock, broken down by color
const womensOutOfStockByColor = data.reduce((counts, product) => {
  if (!product.in_stock && product.gender === "female") {
    counts[product.color] = (counts[product.color] || 0) + 1;
  }
  return counts;
}, {});

console.log("Women's products out of stock by color:", womensOutOfStockByColor);
