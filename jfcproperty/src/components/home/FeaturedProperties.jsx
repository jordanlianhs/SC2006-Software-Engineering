import Link from "next/link";
import Slider from "react-slick";
import properties from "../../data/properties";

const FeaturedProperties = () => {
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

  let content = properties?.slice(0, 12)?.map((item) => (
    <div className="item" key={item.id}>
      <div className="feat_property">
        <div className="thumb">
          <img className="img-whp" src={item.img} alt="fp1.jpg" />
          <div className="thmb_cntnt">

            <ul className="icon mb0">
              <li className="list-inline-item">
                <a href="#">
                  <span className="flaticon-heart"></span>
                </a>
              </li>
            </ul>
            {/* End .icon */}

            <Link href={`/listing-details-v1/${item.id}`}>
              <a className="fp_price">
                ${item.resalePrice}
              </a>
            </Link>
          </div>
        </div>
        {/* End .thumb */}

        <div className="details">
          <div className="tc_content">
            <p className="text-thm">{item.type}</p>
            <h4>
              <Link href={`/listing-details-v1/${item.id}`}>
                <a>{item.blockNumber}</a>
              </Link>
            </h4>
            <p>
              <span className="flaticon-placeholder"></span>
              {item.StreetName}
            </p>

          </div>
          {/* End .tc_content */}
 
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
