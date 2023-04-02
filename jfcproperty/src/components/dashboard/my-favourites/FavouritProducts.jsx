import React, { useState, useEffect } from "react";
import Header from "../../common/header/DefaultHeader";
import Link from 'next/link';

const FavoriteFlats = () => {
  const [favoriteFlats, setFavoriteFlats] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteFlats");
    if (storedFavorites) {
      setFavoriteFlats(JSON.parse(storedFavorites));
    }
  }, []);

  const toggleFavoriteFlat = (flat) => {
    const updatedFavorites = favoriteFlats.filter((f) => f.id !== flat.id);
    setFavoriteFlats(updatedFavorites);
    localStorage.setItem("favoriteFlats", JSON.stringify(updatedFavorites));
  };


  return (
    <>
      <Header />
      <section className="our-listing bgc-f7 pb30-991 mt85 md-mt0">
        <div className="container">
          <div className="row">
            {favoriteFlats.map((flat) => (
              <div className="col-md-6 col-lg-6" key={flat.id}>
                <div className="feat_property home7 style4">
                  {/* ... display flat details similar to Index page ... */}
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
                  </div>
                  <button
                    className={`favorite-button ${
                      favoriteFlats.find((f) => f.id === flat.id) ? "favorited" : ""
                    }`}
                    onClick={() => toggleFavoriteFlat(flat)}
                  >
                    ♥
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FavoriteFlats;

