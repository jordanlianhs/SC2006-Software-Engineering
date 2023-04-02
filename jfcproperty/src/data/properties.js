const allResaleFlats = async () => {
  const response = await fetch("http://127.0.0.1:8000/all_house_price/?format=json");
  const data = await response.json();
  const flats = data.map((flat, index) => ({
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
  }));
  return flats;
};
module.exports = allResaleFlats;
/*
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


