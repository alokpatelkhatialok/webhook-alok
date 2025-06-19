const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Shopify Webhook Route
app.post('/webhook/order-created', (req, res) => {
  const order = req.body;

  console.log('🔔 New Order Created:', {
    id: order.id,
    email: order.email,
    total_price: order.total_price,
    line_items: order.line_items.map(item => item.name)
  });

  res.status(200).send('Webhook received');
});

app.get('/', (req, res) => {
    res.send('✅ Server is running');
});

app.get('/webhook/order-created', (req, res) => {
    res.send('This route only accepts POST requests for order webhooks.');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
