import Link from "next/link";
import allResaleFlats from "../../../data/properties";
import featureContent from "../../../data/properties";

const FeaturedListings = async () => {
  const featureContent = await allResaleFlats();
  return (
    <>
      {featureContent.slice(27, 30).map((item) => (
        <div className="media d-flex" key={item.id}>
          <Link href={`/listing-details/${item.id}`}>
            <a>
              <img
                className="align-self-start me-3"
                src={item.img}
                alt="featured listing image"
              />
            </a>
          </Link>

          <div className="media-body">
            <h5 className="mt-0 post_title">
              <Link href={`/listing-details/${item.id}`}>
                <a>BLK {item.blockNumber} {item.streetName}</a>
              </Link>
            </h5>
            <Link href={`/listing-details/${item.id}`}>
              <a>
                {" "}
                ${item.price}
              </a>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedListings;
