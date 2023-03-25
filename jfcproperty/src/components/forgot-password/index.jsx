import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader";
import PopupSignInUp from "../common/PopupSignInUp";
import BreadCrumbBanner from "./BreadCrumbBanner";
import ForgotPassword from "../../components/common/user-credentials/ForgotPassword";

const index = () => {
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!-- Modal --> */}
      <PopupSignInUp />
      
      <BreadCrumbBanner />
      {/* <!-- Our LogIn Register --> */}
      <section className="our-log bgc-fa">
        <div className="container">
          <div className="row  ">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <div className="login_form  inner_page">
                <ForgotPassword />
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

      {/* <!-- Our Footer Bottom Area --> */}
      <section className="footer_middle_area pt40 pb40">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
};

export default index;
