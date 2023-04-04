// pages/listing-details-v1/[id].js
import React from "react";
import allResaleFlats from "../../data/properties";
import Header from "../../components/common/header/DefaultHeader";
import Footer from "../../components/common/footer/Footer";
import CopyrightFooter from "../../components/common/footer/CopyrightFooter";
import Chart from "chart.js/auto";

const ListingDetails = ({ flat }) => {
  const canvasRef = React.useRef();

  function renderChart() {
    const labels = ["2023", "2024", "2025", "2026", "2027", "2028"];
    const data = [
      flat.price,
      flat.price_aft1year,
      flat.price_aft2year,
      flat.price_aft3year,
      flat.price_aft4year,
      flat.price_aft5year,
    ];
    new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Price",
            data: data,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            min: Math.min(...data) - 10000, // set the minimum value of y-axis to be the minimum value of data minus 10000
            max: Math.max(...data) + 10000, // set the maximum value of y-axis to be the maximum value of data plus 10000
            ticks: {
              stepSize: 5000, // set the interval between ticks to be 5000
              precision: 0, // set the precision to be 0 to show only integers
            },
          },
        },
        maintainAspectRatio: false,
      },
    });
  }
  React.useEffect(() => {
    renderChart();
  }, []);

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
              <div>
                <canvas id="myChart" ref={canvasRef}></canvas>
              </div>
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
