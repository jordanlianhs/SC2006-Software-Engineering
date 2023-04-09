import Header from "../../common/header/dashboard/Header";
import FavouritProducts from "./FavouritProducts";
import Pagination from "../../common/blog/Pagination";
import Footer from "../../common/footer/Footer";
import CopyrightFooter from "../../common/footer/CopyrightFooter";

const index = () => {
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!-- Our Dashbord --> */}    
      <div className="col-lg-12 maxw100flex-992"style={{ marginTop: "100px" }}>
        <div className="row">

          

          <div className="col-lg-12">
            <div className="my_dashboard_review mb40">
              <div className="favorite_item_list">
                
                <h2 className="breadcrumb_title">My Favorites</h2>
                <FavouritProducts />
                {/* <Pagination /> */}
              </div>
            </div>
          </div>
          {/* End .col */}
        </div>
        {/* End .row */}
        <section className="footer_one">
          <div className="container">
            <div className="row">
              <Footer />
            </div>
          </div>
        </section>
        <section className="footer_middle_area pt40 pb40">
          <div className="container">
            <CopyrightFooter />
          </div>
        </section>
      </div>
      {/* End .col */}
          
        
      
    </>
  );
};

export default index;
