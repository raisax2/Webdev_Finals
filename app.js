// apps.js file

const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://cat-fact.herokuapp.com/facts/random');
    const randomFact = response.data.text;
    res.render('index', { fact: randomFact });
  } catch (error) {
    console.error('Error fetching cat facts:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
