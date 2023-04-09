import { useState, useEffect } from "react";
import getResaleFlats from "../../data/comparePricing";
import Fuse from "fuse.js";
import Pagination from "../common/blog/Pagination";
import PredictionChart from "../common/chart/PredictionChart";
import ComparisonChart from "../common/chart/ComparisonChart";

const ComparePricing = () => {
  const [flats, setFlats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFlats, setSelectedFlats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchFlats = async () => {
      const data = await getResaleFlats();
      setFlats(data);
    };
    fetchFlats();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelect = (flat) => {
    if (selectedFlats.length < 2) {
      setSelectedFlats([...selectedFlats, flat]);
    }
  };

  const handleRemove = (flat) => {
    const newSelectedFlats = selectedFlats.filter(
      (selectedFlat) => selectedFlat.id !== flat.id
    );
    setSelectedFlats(newSelectedFlats);
  };
  const options = {
    keys: ["streetName", "flatType", "blockNumber"],
    threshold: 0.3,
  };

  const fuse = new Fuse(flats, options);

  // Filter flats based on searchQuery and whether the searchQuery is empty or not
  const filteredFlats =
    searchQuery.length > 0
      ? fuse.search(searchQuery).map((result) => result.item)
      : [];

  const flatsPerPage = 10;
  const indexOfLastFlat = currentPage * flatsPerPage;
  const indexOfFirstFlat = indexOfLastFlat - flatsPerPage;
  const currentFlats = filteredFlats.slice(indexOfFirstFlat, indexOfLastFlat);

  return (
    <>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by street name or flat type"
          style={{ width: "300px", height: "30px", fontSize: "16px" }}
        />
      </div>
      <div className="row">
        {currentFlats.map((flat) => (
          <div
            className="col-md-4"
            key={flat.id}
            onClick={() => handleSelect(flat)}
          >
            <div className="membership_header">
              <div className="thumb">
                <a href="#">
                  <span className="flaticon-close"></span>
                </a>
                <img className="img-fluid w-100" src={flat.img} alt="1.jpg" />
                <div className="price">${flat.price}</div>
              </div>
              <div className="flat_type">
                <h4>{flat.streetName}</h4>
                <p>BLK {flat.blockNumber}</p>
                <p>{flat.flatType}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedFlats.length === 2 ? (
        <>
        <div className="row">
          <div className="col-6">
            <div className="row">
              <div className="col-6">
                <div key={selectedFlats[0].id}>
                  <h4>{selectedFlats[0].streetName}</h4>
                  <p>BLK {selectedFlats[0].blockNumber}</p>
                  <p>{selectedFlats[0].flatType}</p>
                  <button onClick={() => handleRemove(selectedFlats[0])}>
                    Remove
                  </button>
                </div>
              </div>
              <div className="col-6">
                <img
                  className="img-fluid w-100"
                  src={selectedFlats[0].img}
                  alt="1.jpg"
                />
              </div>
            </div>
          </div>
      
          <div className="col-6">
            <div className="row">
              <div className="col-6">
                <div key={selectedFlats[1].id}>
                  <h4>{selectedFlats[1].streetName}</h4>
                  <p>BLK {selectedFlats[1].blockNumber}</p>
                  <p>{selectedFlats[1].flatType}</p>
                  <button onClick={() => handleRemove(selectedFlats[1])}>
                    Remove
                  </button>
                </div>
              </div>
              <div className="col-6">
                <img
                  className="img-fluid w-100"
                  src={selectedFlats[1].img}
                  alt="1.jpg"
                />
              </div>
            </div>
          </div>
        </div>
        <ComparisonChart flat1={selectedFlats[0]} flat2={selectedFlats[1]} />
      </>      
      ) : (
        <>
          {searchQuery.length === 0 && selectedFlats.length === 0 ? null : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {selectedFlats.map((flat) => (
                <div
                  key={flat.id}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div style={{ marginRight: "20px" }}>
                    <img
                      className="img-fluid w100"
                      src={flat.img}
                      alt="1.jpg"
                    />
                    <h4>{flat.streetName}</h4>
                    <p>BLK {flat.blockNumber}</p>
                    <p>{flat.flatType}</p>
                    <button onClick={() => handleRemove(flat)}>Remove</button>
                  </div>
                  <div>
                    <PredictionChart flat={flat} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <Pagination
        flatsPerPage={flatsPerPage}
        totalFlats={filteredFlats.length}
        paginate={(pageNumber) => setCurrentPage(pageNumber)}
      />
    </>
  );
};

export default ComparePricing;
