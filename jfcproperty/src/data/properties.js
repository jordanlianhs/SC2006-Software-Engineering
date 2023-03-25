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

