require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
// const session = require('express-session');
const routes = require('./routes/route');

const app = express();
const { PORT } = process.env;

// app.use(session({
//   secret: 'saya-emang-mantap',
//   resave: false,
//   saveUninitialized: false,
// }));
app.use(bodyParser.json());
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`app is running in port ${PORT}`);
});
