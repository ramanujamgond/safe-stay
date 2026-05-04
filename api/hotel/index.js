// Vercel Serverless Function to serve hotel data
import hotels from '../../db.json';

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { q, _page = '1', _limit = '10', _sort, _order, price_gte, price_lte } = req.query;
  let filteredHotels = [...hotels.hotel];

  // Search by query
  if (q) {
    const query = q.toLowerCase();
    filteredHotels = filteredHotels.filter(hotel => 
      hotel.name.toLowerCase().includes(query) || 
      hotel.place.toLowerCase().includes(query)
    );
  }

  // Filter by price range
  if (price_gte && price_lte) {
    filteredHotels = filteredHotels.filter(hotel => 
      hotel.price >= parseInt(price_gte) && hotel.price <= parseInt(price_lte)
    );
  }

  // Sort
  if (_sort && _order) {
    filteredHotels.sort((a, b) => {
      if (_order === 'asc') {
        return a[_sort] - b[_sort];
      } else {
        return b[_sort] - a[_sort];
      }
    });
  }

  // Pagination
  const page = parseInt(_page);
  const limit = parseInt(_limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedHotels = filteredHotels.slice(startIndex, endIndex);

  res.status(200).json(paginatedHotels);
}
