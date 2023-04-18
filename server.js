const express = require('express');
const PORT = process.env.PORT || 3000;
const view_routes = require('./controllers/view_routes');
const db = require('./config/connection');
const { engine } = require('express-handlebars');
const session = require("express-session");
const { sequelize } = require('./models/BlogPost');
const { Sequelize } = require('sequelize');
const SequelizeStore = require("connect-session-sequelize")(session.Store)

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
// app.use(session({
//   secret: "exploding-kittens",
//   resave: false,
//   saveUninitialized: false,
// }))

const Session = sequelize.define("Session", {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  expires:Sequelize.STRING(15000)
})

app.use(session({
  secret: "exploding-kittens",
  store: new SequelizeStore({
    db: sequelize,
    table: "Session",
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 24 * 60 * 60 * 1000,
  }),
  resave:false,
  saveUninitialized: false
}))

app.get(("/set-session"), (req, res)=>{
  req.session.session = "session";
  res.send("Session variable set")
})

app.get("/get-session", (req, res) => {
  res.send("Session variable: ${req.session.session")
})

app.engine('hbs', engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use('/', view_routes);

db.sync().then(() => {
  app.listen(PORT, () => console.log('Server started on port %s', PORT))
});