"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// Use body-parser to parse requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Payment gateway API endpoint
app.post('/payment', (req, res) => {
    const { amount, currency, cardNumber, cardExpiration, cvv } = req.body;
    // Payment gateway integration code here
    // ...
    // Return response to client
    res.json({ success: true, message: 'Payment successful' });
});
// Start server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
