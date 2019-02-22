const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.registrarse', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req,username,password,done) => {
    console.log(req.body);
    const newUser={
        username,
        password
    };
    newUser.password = await helpers.encriptarPassword(password);
    const result = await pool.query('INSERT INTO usuarios SET ?', [newUser]);
    newUser.id = result.insertId;
    
    return done(null,newUser);
}));

passport.use('local.login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE username = ?', [username]);
    if (rows.length > 0) {
      const user = rows[0];
      const validPassword = await helpers.compararPassword(password, user.password);
      if (validPassword) {
        done(null, user, req.flash('success', 'Hola ' + user.username));
      } else {
        done(null, false, req.flash('message', 'La contraseña introducida es incorrecta'));
      }
    } else {
      return done(null, false, req.flash('message', 'El usuario no existe, pero tu +2ª matricula sí.'));
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    done(null, rows[0]);
});