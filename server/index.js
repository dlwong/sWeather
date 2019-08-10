const path = require('path');
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/public')));

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});

app.get('/api', (req, res) => res.send('Hello from the SERVER'))
