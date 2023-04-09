const NodeCache = require('node-cache');
const cache = new NodeCache();

const getRandomImage = () => {
  const randIndex = Math.floor(Math.random() * 28)+1; 
  return `/assets/images/property/rand/${randIndex}.jpg`
};

const getResaleFlats = async () => {
  const cacheKey = 'getResaleFlatsData';
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const url = "http://127.0.0.1:8000/all_house_price/?limit=30000";
  let flats = [];
  let nextUrl = url;

  do {
    const response = await fetch(nextUrl);
    const data = await response.json();
    flats = flats.concat(data.results);
    nextUrl = data.links.next;
  } while (nextUrl);

  flats = flats.map((flat, index) => ({
    id: index + 1,
    // img: "/assets/images/property/rand/fp1.jpg",
    img: getRandomImage(),
    town: flat.town,
    flatType: flat.flat_type,
    flatModel: flat.flat_model,
    blockNumber: flat.block,
    streetName: flat.street_name,
    storeyRange: flat.storey_range,
    floorArea: flat.floor_area_sqm,
    leaseCommencementDate: flat.remaining_lease,
    price: flat.resale_price,
    price_aft1year: flat.resale_price_aft1year,
    price_aft2year: flat.resale_price_aft2year,
    price_aft3year: flat.resale_price_aft3year,
    price_aft4year: flat.resale_price_aft4year,
    price_aft5year: flat.resale_price_aft5year,
  }));

  // Store the data in the cache
  cache.set(cacheKey, flats, 60 * 60); // Cache for 1 hour

  return flats;
};

module.exports = getResaleFlats;