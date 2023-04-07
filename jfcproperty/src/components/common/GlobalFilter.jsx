import { useDispatch } from "react-redux"; // import useDispatch
import Router from "next/router";
import {
  addStreetName,
  addBlockNumber,
  addFlatType,
  addFlatModel,
  addTown,
} from "../../features/properties/propertiesSlice";
import { storeFilteredFlats } from "../../features/properties/propertiesSlice";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import allResaleFlats from "../../data/properties";


const GlobalFilter = ({ className = "" }) => {
  const router = useRouter();
  const dispatch = useDispatch(); // get dispatch function
  const [flatType, setFlatType] = useState([]);
  const [streetName, setStreetName] = useState([]);
  const [blockNumber, setBlockNumber] = useState([]);
  const [town, setTown] = useState([]);
  const [flatModel, setFlatModel] = useState([]);

  useEffect(() => {
    if (router.pathname === "/") {
      dispatch(addFlatType(""));
      dispatch(addStreetName(""));
      dispatch(addBlockNumber(""));
      dispatch(addTown(""));
      dispatch(addFlatModel(""));
      dispatch(storeFilteredFlats([]));
    }
  }, [router.pathname, dispatch]);
  // Fetch all flats from API
  const [allFlats, setAllFlats] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const flats = await allResaleFlats();
        setAllFlats(flats);
  
        const uniqueFlatTypes = [...new Set(flats.map(flat => flat.flatType))];
        setFlatType(uniqueFlatTypes);
  
        const uniqueStreetNames = [...new Set(flats.map(flat => flat.streetName))];
        setStreetName(uniqueStreetNames);
  
        const uniqueBlockNumbers = [...new Set(flats.map(flat => flat.blockNumber))];
        setBlockNumber(uniqueBlockNumbers);

        const uniqueTowns = [...new Set(flats.map(flat => flat.town))];
        setTown(uniqueTowns);

        const uniqueFlatModels = [...new Set(flats.map(flat => flat.flatModel))];
        setFlatModel(uniqueFlatModels);

      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  
   // submit handler
  const submitHandler = () => {
    const selectedFlatType = flatType.filter((type) => type.selected)[0]?.value;
    const selectedStreetName = streetName.filter((name) => name.selected)[0]?.value;
    const selectedBlockNumber = blockNumber.filter((number) => number.selected)[0]?.value;
    const selectedTown = town.filter((twn) => twn.selected)[0]?.value;
    const selectedFlatModel = flatModel.filter((model) => model.selected)[0]?.value;
  
    const newFilteredFlats = allFlats.filter((flat) => {
      return (
        (!selectedFlatType || flat.flat_type === selectedFlatType) &&
        (!selectedStreetName || flat.street_name === selectedStreetName) &&
        (!selectedBlockNumber || flat.block === selectedBlockNumber) &&
        (!selectedTown || flat.town == selectedTown) &&
        (!selectedFlatModel || flat.flatModel == selectedFlatModel)
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
          <div className="search_option_two">
            <div className="candidate_revew_select">
              <select
                className="selectpicker w100 form-select show-tick"
                onChange={(e) => dispatch(addTown(e.target.value))}
              >
                <option value="">Select Town</option>
                {town.map((t) => (
                  <option key={t}>{t}</option>
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
              onChange={(e) => dispatch(addFlatModel(e.target.value))}
            >
              <option value="">Select Flat Model</option>
              {flatModel.map((model) => (
                <option key={model}>{model}</option>
              ))}
            </select>
          </div>
        </li>
        {/* End li */}

        <li className="list-inline-item">
          
          <button
            onClick={submitHandler}
            type="submit"
            className="btn btn-thm"
          >
            Search
          </button>
          
        </li>
        {/* End li */}

      </ul>
    </div>
    
  );
};

export default GlobalFilter;
