const NodeCache = require('node-cache');
const cache = new NodeCache();

const allResaleFlats = async () => {
  const cacheKey = 'allResaleFlatsData';
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
    img: "/assets/images/property/fp1.jpg",
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

module.exports = allResaleFlats;



/*const allResaleFlats = async () => {
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
    img: "/assets/images/property/fp1.jpg",
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

  return flats;
};

module.exports = allResaleFlats;
*/
/*
http://127.0.0.1:8000/all_house_price/?format=json
const allResaleFlats = async () => {
  const response = await fetch("https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&limit=14000");
  const data = await response.json();
  const flats = data.result.records.map((flat, index) => ({
    id: index + 1,
    img: "/assets/images/property/fp1.jpg",
    price: flat.resale_price,
    flatType: flat.flat_type,
    blockNumber: flat.block,
    streetName: flat.street_name,
  }));
  return flats;
};

module.exports = allResaleFlats;
*/


