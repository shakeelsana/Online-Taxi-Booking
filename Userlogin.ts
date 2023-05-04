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
passport.use(new LocalStrategy(
  function(username: string, password: string, done: (arg0: null, arg1: boolean, arg2: { message: string; } | undefined) => any) {
    const user = users.find(user => user.username === username);
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    //return done(null, true, user);
  }
));

passport.serializeUser(function(user: { id: any; }, done: (arg0: null, arg1: any) => void) {
  done(null, user.id);
});

passport.deserializeUser(function(id: number, done: (arg0: null, arg1: { id: number; username: string; password: string; } | undefined) => void) {
  const user = users.find(user => user.id === id);
  done(null, user);
});

// Setup routes for login and protected resource
app.get('/', (req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Home page');
});

app.get('/login', (req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Login page');
});

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req: any, res: { redirect: (arg0: string) => void; }) {
    res.redirect('/dashboard');
  }
);

app.get('/dashboard',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req: any, res: { send: (arg0: string) => void; }) {
    res.send('Dashboard page');
  }
);

// Start server
app.listen(3000, () => console.log('Server started on port 3000'));
