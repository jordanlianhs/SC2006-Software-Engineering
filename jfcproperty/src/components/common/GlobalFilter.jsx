import { useDispatch } from "react-redux"; // import useDispatch
import Router from "next/router";
import {
  addStreetName,
  addBlockNumber,
  addFlatType,
} from "../../features/properties/propertiesSlice";
import { storeFilteredFlats } from "../../features/properties/propertiesSlice";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

const GlobalFilter = ({ className = "" }) => {
  const router = useRouter();
  const dispatch = useDispatch(); // get dispatch function
  const [flatType, setFlatType] = useState([]);
  const [streetName, setStreetName] = useState([]);
  const [blockNumber, setBlockNumber] = useState([]);
  const [filteredFlats, setFilteredFlats] = useState([]);
  useEffect(() => {
    if (router.pathname === "/") {
      dispatch(addFlatType(""));
      dispatch(addStreetName(""));
      dispatch(addBlockNumber(""));
      dispatch(storeFilteredFlats([]));
    }
  }, [router.pathname, dispatch]);
  // Fetch all flats from API
  const [allFlats, setAllFlats] = useState([]);
  useEffect(() => {
    fetch("https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&limit=50")
      .then((response) => response.json())
      .then((data) => {
        setAllFlats(data.result.records);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    // Fetch flat types from API
    fetch("https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&fields=flat_type&limit=50")
      .then((response) => response.json())
      .then((data) => {
        const uniqueFlatTypes = [...new Set(data.result.records.map(record => record.flat_type))];
        setFlatType(uniqueFlatTypes);
      })
      .catch((error) => console.error(error));

    // Fetch street names from API
    fetch("https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&fields=street_name&limit=50")
      .then((response) => response.json())
      .then((data) => {
        const uniqueStreetNames = [...new Set(data.result.records.map(record => record.street_name))];
        setStreetName(uniqueStreetNames);
      })
      .catch((error) => console.error(error));

    // Fetch block numbers from API
    fetch("https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&fields=block&limit=50")
      .then((response) => response.json())
      .then((data) => {
        const uniqueBlockNumbers = [...new Set(data.result.records.map(record => record.block))];
        setBlockNumber(uniqueBlockNumbers);
      })
      .catch((error) => console.error(error));
  }, []);
   // submit handler
  const submitHandler = () => {
    const selectedFlatType = flatType.filter((type) => type.selected)[0]?.value;
    const selectedStreetName = streetName.filter((name) => name.selected)[0]?.value;
    const selectedBlockNumber = blockNumber.filter((number) => number.selected)[0]?.value;
  
    const newFilteredFlats = allFlats.filter((flat) => {
      return (
        (!selectedFlatType || flat.flat_type === selectedFlatType) &&
        (!selectedStreetName || flat.street_name === selectedStreetName) &&
        (!selectedBlockNumber || flat.block === selectedBlockNumber)
      );
    });
  
    // Dispatch the action to store the filtered flats in the Redux state
    dispatch(storeFilteredFlats(newFilteredFlats));
  
    // Remove the query from the Router.push call
    Router.push("/listing-grid-v1");
  };

  return (
    <div className={`home1-advnc-search ${className}`}>
      <ul className="h1ads_1st_list mb0">
        <li className="list-inline-item">
          <div className="search_option_two">
            <div className="candidate_revew_select">
              <select
               className="selectpicker w100 form-select show-tick"
               onChange = {(e) => dispatch(addFlatType(e.target.value))}
              >
                <option value="">Select Flat Type</option>
                {flatType.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </li>
        {/* End li */}

        <li className="list-inline-item">
          <div className="form-group">
            <select
              className="selectpicker w100 form-select show-tick"
              onChange={(e) => dispatch(addStreetName(e.target.value))}
            >
              <option value="">Select Street Name</option>
              {streetName.map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>  
          </div>
        </li>
        {/* End li */}

        <li className="list-inline-item">
          <div className="form-group">
            <select
              className="selectpicker w100 form-select show-tick"
              onChange={(e) => dispatch(addBlockNumber(e.target.value))}
            >
              <option value="">Select Block Number</option>
              {blockNumber.map((number) => (
                <option key={number}>{number}</option>
              ))}
            </select>
          </div>
        </li>
        {/* End li */}
        
        <li className="list-inline-item">
          <div className="search_option_button">
            <button
              onClick={submitHandler}
              type="submit"
              className="btn btn-thm"
            >
              Search
            </button>
          </div>
        </li>
        {/* End li */}

      </ul>
    </div>
  );
};

export default GlobalFilter;
