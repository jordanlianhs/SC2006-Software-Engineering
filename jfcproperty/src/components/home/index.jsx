import Footer from "../common/footer/Footer";
import FeaturedProperties from "./FeaturedProperties";
import Header from "./Header";
import Hero from "./Hero";
import PopupSignInUp from "../common/PopupSignInUp";

const Index = () => {
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Home Design --> */}
      <Hero />

      {/* <!-- Feature Properties --> */}
      <section id="feature-property" className="feature-property bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center mb40">
                <h2>Recommended Properties</h2>
                <p>Personalised Listings That You Might Like...</p>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="feature_property_slider gutter-x15">
                <FeaturedProperties />
              </div>
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


    </>
  );
};

export default Index;
