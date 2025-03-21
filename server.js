const express = require('express');
const app = express();
const fs = require('fs');
const products = require('./products.json');

app.use(express.json());
app.use(express.static('public'));

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/reviews/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const product = products.find(p => p.id === productId);
  res.json(product ? product.reviews : []);
});

app.post('/reviews', (req, res) => {
  const { productId, review } = req.body;
  const product = products.find(p => p.id == productId);
  if (product) {
    product.reviews.push(review);
    fs.writeFileSync('./products.json', JSON.stringify(products, null, 2));
    res.json({ message: 'Review added', reviews: product.reviews });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.listen(3000, () => console.log('Server running on port http://localhost:3000'));