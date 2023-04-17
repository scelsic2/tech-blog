const express = require('express');
const PORT = process.env.PORT || 3000;
const view_routes = require('./controllers/view_routes');
const db = require('./config/connection');
const { engine } = require('express-handlebars');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.engine('hbs', engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use('/', view_routes);

db.sync().then(() => {
  app.listen(PORT, () => console.log('Server started on port %s', PORT))
});