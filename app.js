// app.js file

const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Function to detect if a string contains English words
function isEnglish(text) {
  // Regular expression to match English words
  const englishRegex = /^[A-Za-z0-9!@#$%^&*(),.?":{}|<> ]*$/;
  return englishRegex.test(text);
}

app.get('/', async (req, res) => {
  try {
    let randomFact;
    let isEnglishFact = false;

    while (!isEnglishFact) {
      const response = await axios.get('https://cat-fact.herokuapp.com/facts/random');
      randomFact = response.data.text;
      isEnglishFact = isEnglish(randomFact);
    }

    res.render('index', { fact: randomFact });
  } catch (error) {
    console.error('Error fetching cat facts:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
