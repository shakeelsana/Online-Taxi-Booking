"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const port = 3000;
// Database connection
const db = require('./db');
db.connect();
// Driver registration endpoint
app.post('/driver', (req, res) => {
    const { name, email, phone, carMake, carModel, carYear } = req.body;
    const driver = { name, email, phone, carMake, carModel, carYear };
    // Save driver to database
    db.addDriver(driver)
        .then(() => {
        res.send('Driver registered successfully');
    })
        .catch((err) => {
        res.status(500).send(err.message);
    });
});
// Customer registration endpoint
app.post('/customer', (req, res) => {
    const { name, email, phone } = req.body;
    const customer = { name, email, phone };
    // Save customer to database
    db.addCustomer(customer)
        .then(() => {
        res.send('Customer registered successfully');
    })
        .catch((err) => {
        res.status(500).send(err.message);
    });
});
// Driver login endpoint
app.post('/driver/login', (req, res) => {
    const { email, password } = req.body;
    // Check if driver exists
    db.getDriverByEmail(email)
        .then((driver) => {
        if (!driver) {
            throw new Error('Driver not found');
        }
        // Check password
        if (driver.password !== password) {
            throw new Error('Incorrect password');
        }
        res.send('Driver logged in successfully');
    })
        .catch((err) => {
        res.status(401).send(err.message);
    });
});
// Customer login endpoint
app.post('/customer/login', (req, res) => {
    const { email, password } = req.body;
    // Check if customer exists
    db.getCustomerByEmail(email)
        .then((customer) => {
        if (!customer) {
            throw new Error('Customer not found');
        }
        // Check password
        if (customer.password !== password) {
            throw new Error('Incorrect password');
        }
        res.send('Customer logged in successfully');
    })
        .catch((err) => {
        res.status(401).send(err.message);
    });
});
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
