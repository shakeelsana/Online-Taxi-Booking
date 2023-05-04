"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const app = express();
// Setup User database
const users = [
    { id: 1, username: 'john', password: 'password' },
    { id: 2, username: 'jane', password: 'password' }
];
// Configure passport middleware
passport.use(new LocalStrategy(function (username, password, done) {
    const user = users.find(user => user.username === username);
    if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
    }
    if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
    }
    //return done(null, true, user);
}));
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    const user = users.find(user => user.id === id);
    done(null, user);
});
// Setup routes for login and protected resource
app.get('/', (req, res) => {
    res.send('Home page');
});
app.get('/login', (req, res) => {
    res.send('Login page');
});
app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function (req, res) {
    res.redirect('/dashboard');
});
app.get('/dashboard', require('connect-ensure-login').ensureLoggedIn(), function (req, res) {
    res.send('Dashboard page');
});
// Start server
app.listen(3000, () => console.log('Server started on port 3000'));
