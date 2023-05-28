require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes/route');
const authRoutes = require('./routes/authRoutes');

const app = express();
const { PORT } = process.env;

app.use(bodyParser.json());
app.use('/', routes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`app is running in port ${PORT}`);
});
