import Router from "next/router";
import {
  addStreetName,
  addBlockNumber,
  addFlatType,
} from "../../features/properties/propertiesSlice";
import { useEffect, useState } from "react";

const GlobalFilter = ({ className = "" }) => {
  const [flatType, setFlatType] = useState([]);
  const [streetName, setStreetName] = useState([]);
  const [blockNumber, setBlockNumber] = useState([]);
  const [selectedFlatType, setSelectedFlatType] = useState("");
  const [selectedStreetName, setSelectedStreetName] = useState("");
  const [selectedBlockNumber, setSelectedBlockNumber] = useState("");
  
  useEffect(() => {
    // Fetch flat types from API
    fetch("/api/flatTypes")
      .then((response) => response.json())
      .then((data) => setFlatType(data));

    // Fetch street names from API
    fetch("/api/streetNames")
      .then((response) => response.json())
      .then((data) => setStreetName(data));

    // Fetch block numbers from API
    fetch("/api/blockNumbers")
      .then((response) => response.json())
      .then((data) => setBlockNumber(data));
  }, []);
  // submit handler
  const submitHandler = () => {
    //update selected values
    const selectedFlatType = document.getElementById("flatType").value;
    const selectedStreetName = document.getElementById("streetName").value;
    const selectedBlockNumber = document.getElementById("blockNumber").value;
    setSelectedFlatType(selectedFlatType);
    setSelectedStreetName(selectedStreetName);
    setSelectedBlockNumber(selectedBlockNumber);
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
