const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes/route');
const authRoutes = require('./routes/authRoutes');
const { responseClient } = require('./helper');

const app = express();
const port = 8080;
const router = express.Router();

app.use(bodyParser.json());
app.use('/api', routes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`app is running in port ${port}`);
});

router.post('/', (req, res) => {
  res.status(200).json(
    responseClient(
      'success',
      'Selamat Datang di Welcome :) xixi',
      {
        backendDev: 'gerin tampan sekali',
        cloudEng: 'bang habib sang penakluk awan google',
      },
    ),
  );
});
