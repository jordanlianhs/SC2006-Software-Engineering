// pages/listing-details-v1/[id].js
import React from "react";
import allResaleFlats from "../../data/properties";
import Header from "../../components/common/header/DefaultHeader";
import Footer from "../../components/common/footer/Footer";
import CopyrightFooter from "../../components/common/footer/CopyrightFooter";
import PredictionChart from "../../components/common/chart/PredictionChart";

const ListingDetails = ({ flat }) => {
  if (!flat) {
    return <div>Loading...</div>;
  }
  // Render the listing details using the flat data
  return (
    <>
      <Header />
      {/* Render the details of the flat here */}
      <section className="listing-title-area mt85 md-mt0">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="mb-3">{`${flat.blockNumber} ${flat.streetName}`}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <p>
                <strong>Town:</strong> {flat.town}
              </p>
              <p>
                <strong>Flat Type:</strong> {flat.flatType}
              </p>
              <p>
                <strong>Flat Model:</strong> {flat.flatModel}
              </p>
              <p>
                <strong>Price:</strong> ${flat.price}
              </p>
              <p>
                <strong>Storey Range:</strong> {flat.storeyRange}
              </p>
              <p>
                <strong>Floor Area:</strong> {flat.floorArea}
              </p>
              <p>
                <strong>Remaining Lease:</strong> {flat.leaseCommencementDate}
              </p>
              <PredictionChart flat={flat} />
            </div>
            <div className="col-md-6">
              <img
                src={flat.img}
                alt={`${flat.blockNumber} ${flat.streetName}`}
                className="img-fluid"
              />
            </div>
          </div>
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

export async function getServerSideProps({ params }) {
  const flats = await allResaleFlats();
  const flat = flats.find((flat) => flat.id === parseInt(params.id, 10));

  return {
    props: {
      flat,
    },
  };
}

export default ListingDetails;
