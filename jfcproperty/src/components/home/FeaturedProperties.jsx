import React, {useState, useEffect} from "react";
import Link from "next/link";
import Slider from "react-slick";
import properties from "../../data/properties";

const FeaturedProperties = () => {
  const[flats, setFlats] = useState([]);
  const [favoriteFlats, setFavoriteFlats] = useState([]);

  const toggleFavoriteFlat = (flat) => {
    if (favoriteFlats.find((f) => f.id === flat.id)) {
      setFavoriteFlats(favoriteFlats.filter((f) => f.id !== flat.id));
    } else {
      setFavoriteFlats([...favoriteFlats, flat]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await properties();
      setFlats(data);
    };
    fetchData();
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    speed: 1200,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
        },
      },
    ],
  };

  let content = flats?.slice(0, 12)?.map((item) => (
    <div className="item" key={item.id}>
      <div className="feat_property">
        <div className="thumb">
          <img className="img-whp" src={item.img} alt="fp1.jpg" />
          <div className="thmb_cntnt">

            <Link href={`/listing-details-v1/${item.id}`}>
              <a className="fp_price">
                ${item.price}
              </a>
            </Link>
          </div>
        </div>
        {/* End .thumb */}

        <div className="details">
          <div className="tc_content">
            <p className="text-thm">{item.flatType}</p>
            <h4>
              <Link href={`/listing-details-v1/${item.id}`}>
                <a>BLK {item.blockNumber}</a>
              </Link>
            </h4>
            <p>
              <span className="flaticon-placeholder"></span>
              {item.streetName}
            </p>

          </div>
          {/* End .tc_content */}
          <button
            className={`favorite-button ${
              favoriteFlats.find((f) => f.id === item.id) ? 'favorited' : ''
            }`}
            onClick={() => toggleFavoriteFlat(item)}
          >
            ♥
          </button>
        </div>
        {/* End .details */}
      </div>
    </div>
  ));

  return (
    <>
      <Slider {...settings} arrows={false}>
        {content}
      </Slider>
    </>
  );
};

export default FeaturedProperties;
