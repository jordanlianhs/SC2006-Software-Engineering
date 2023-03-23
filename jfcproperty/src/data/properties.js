/*to capture all data in resale flat dataset API
const flatData = require('resaleFlatAPI');
use the map() function to create a new array of objects, where each object represents a single flat & its info
module.exports = flatData.map(flat => ({
  id: flat.id,
  img: "/assets/images/property/fp1.jpg",
  type: flat.flat_type,
  location: `${flatData[0].block} ${flatData[0].street_name}`,
  resalePrice: flat.price,
}));*/

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

