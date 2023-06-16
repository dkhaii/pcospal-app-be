const express = require('express');
const bodyParser = require('body-parser');

const homeRoutes = require('./routes/homeRoutes');
const publicRoutes = require('./routes/publicRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 8080;
const HOST = '0.0.0.0';

app.use(bodyParser.json());
app.use('/', homeRoutes);
app.use('/api', publicRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, HOST, () => {
  console.log(`app is running on http://${HOST}:${PORT}`);
});
