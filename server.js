const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes/route');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use('/api', routes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`app is running in port ${port}`);
});
