const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

const API_URL = 'https://wizard-world-api.herokuapp.com/houses';

app.get('/houses', async (req, res) => {
  try {
    const { name } = req.query;
    const response = await axios.get(API_URL);
    let filteredHouses = response.data;
    if (name) {
      filteredHouses = filteredHouses.filter(house => house.name.toLowerCase().includes(name.toLowerCase()));
    }
    res.json(filteredHouses);
  } catch (error) {
    console.error('Error fetching houses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
