import Pagination from "../../common/blog/Pagination";
import CopyrightFooter from "../../common/footer/CopyrightFooter";
import Footer from "../../common/footer/Footer";
import Header from "../../common/header/DefaultHeader";
import PopupSignInUp from "../../common/PopupSignInUp";
import BreadCrumb2 from "./BreadCrumb2";
import allResaleFlats from "../../../data/properties"
import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from "react-redux";
import {
  selectFlatType,
  selectStreetName,
  selectBlockNumber,
  selectTown,
  selectFlatModel,
  storeFilteredFlats, // Make sure this is imported
} from "../../../features/properties/propertiesSlice";


const Index = () => {
  const selectedFlatType = useSelector(selectFlatType);
  const selectedStreetName = useSelector(selectStreetName);
  const selectedBlockNumber = useSelector(selectBlockNumber);
  const selectedTown = useSelector(selectTown);
  const selectedFlatModel = useSelector(selectFlatModel);
  const filteredFlats = useSelector(storeFilteredFlats);
  
  const[flats,setFlats] = useState([]);
  const[currentPage,setCurrentPage] = useState(1);
  const[flatsPerPage,setFlatsPerPage] = useState(10);
  // Add state for favorite flats
  const [favoriteFlats, setFavoriteFlats] = useState([]);

  // Add a function to handle adding/removing favorite flats
  // Add save to user favaourites link
  // Remove 
  const toggleFavoriteFlat = (flat) => {
    if (favoriteFlats.find((f) => f.id === flat.id)) {
      const updatedFavorites = favoriteFlats.filter((f) => f.id !== flat.id);
      setFavoriteFlats(updatedFavorites);
      localStorage.setItem('favoriteFlats', JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favoriteFlats, flat];
      setFavoriteFlats(updatedFavorites);
      localStorage.setItem('favoriteFlats', JSON.stringify(updatedFavorites));
    }
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteFlats');
    if (storedFavorites) {
      setFavoriteFlats(JSON.parse(storedFavorites));
    }
    
    if (filteredFlats.length) {
      setFlats(filteredFlats);
    } else {
      const fetchFlats = async () => {
        const fetchedFlats = await allResaleFlats();
        const filteredFetchedFlats = fetchedFlats.filter((flat) => {
          return (
            (!selectedFlatType || flat.flatType === selectedFlatType) &&
            (!selectedStreetName || flat.streetName === selectedStreetName) &&
            (!selectedBlockNumber || flat.blockNumber === selectedBlockNumber) &&
            (!selectedTown || flat.town == selectedTown) &&
            (!selectedFlatModel || flat.flatModel == selectedFlatModel)
          );
        });
        setFlats(filteredFetchedFlats);
      };
      fetchFlats();
    }
  }, [filteredFlats, selectedFlatType, selectedStreetName, selectedBlockNumber, selectedFlatModel, selectedTown]);

  const indexOfLastFlat = currentPage * flatsPerPage;
  const indexOfFirstFlat = indexOfLastFlat - flatsPerPage;
  const currentFlats = flats.slice(indexOfFirstFlat, indexOfLastFlat);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />
      {/* <!-- Modal --> */}
      <PopupSignInUp />
      <section className="our-listing bgc-f7 pb30-991 mt85 md-mt0 ">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <BreadCrumb2 />
            </div>
            {/* End .col */}

          </div>
          {/* End Page Breadcrumb*/}
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="row">
                <div className="col-lg-12 mt20">
                  <div className="mbp_pagination">
                    <Pagination flatsPerPage={flatsPerPage}
                      totalFlats={flats.length}
                      paginate={paginate}
                    />
                  </div>
                </div>
                {/* End paginaion .col */}
              </div>
              <div className="row">
                {currentFlats.map((flat)  => (
                  
                  <div className="col-md-6 col-lg-6" key={flat.id}>
                    <div className="feat_property home7 style4">
                      <div className="thumb">
                        <img
                          className="img-whp"
                          src={flat.img}
                          alt="fp1.jpg"
                        />
                        <div className="thmb_cntnt">
                          <Link href={`/listing-details-v1/${flat.id}`}>
                            <a className="fp_price">
                              ${flat.price}
                            </a>
                          </Link>
                        </div>
                      </div>
                      <div className="details">
                        <div className="tc_content">
                          <p className="text-thm">{flat.flatType}</p>
                          <h4>
                            <Link href={`/listing-details-v1/${flat.id}`}>
                              <a>{`${flat.blockNumber} ${flat.streetName}`}</a>
                            </Link>
                          </h4>
                          <p>
                            <span className="flaticon-placeholder"></span>
                            {`${flat.blockNumber} ${flat.streetName}`}
                          </p>
                        </div>
                        <div className="fp_footer">
                          <div className="fp_pdate float-end">2023</div>
                        </div>
                        <button
                        className={`favorite-button ${
                          favoriteFlats.find((f) => f.id === flat.id) ? 'favorited' : ''
                        }`}
                        onClick={() => toggleFavoriteFlat(flat)}
                        >
                          ♥
                        </button>
                        {/* <a
                        href={`http://localhost:8000/favourite_add/${flat.id}`}
                        className={`favorite-button ${
                          favoriteFlats.find((f) => f.id === flat.id) ? 'favorited' : ''
                        }`}
                        onClick={() => toggleFavoriteFlat(flat)}
                        >
                          ♥
                        </a> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* End .row */}
            </div>
            {/* End  page conent */}
          </div>
          {/* End .row */}
        </div>
      </section>

      {/* <!-- Our Footer --> */}
      <section className="footer_one">
        <div className="container">
          <div className="row">
            <Footer />
          </div>
        </div>
      </section>

      {/* <!-- Our Footer Bottom Area --> */}
      <section className="footer_middle_area pt40 pb40">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
};

export default Index;
