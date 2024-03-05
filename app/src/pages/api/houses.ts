import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_URL = 'https://wizard-world-api.herokuapp.com/houses';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query;

  try {
    const response = await axios.get(API_URL);
    let filteredHouses = response.data;
    if (name) {
      filteredHouses = filteredHouses.filter((house: any) =>
        house.name.toLowerCase().includes(name.toString().toLowerCase())
      );
    }
    res.status(200).json(filteredHouses);
  } catch (error) {
    console.error('Error fetching houses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
