const express = require('express');
const bodyParser = require('body-parser');

const homeRoutes = require('./routes/homeRoutes');
const publicRoutes = require('./routes/publicRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use('/', homeRoutes);
app.use('/api', publicRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`app is running in port ${port}`);
});
