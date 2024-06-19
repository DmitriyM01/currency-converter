const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;
const authRoutes = require('./controllers/User');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(bodyParser.json());
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
