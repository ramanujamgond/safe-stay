// Vercel Serverless Function to serve single hotel data
const hotels = require('../../db.json').hotel;

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;
  const hotel = hotels.find(h => h.id === parseInt(id));

  if (hotel) {
    res.status(200).json(hotel);
  } else {
    res.status(404).json({ error: 'Hotel not found' });
  }
}
