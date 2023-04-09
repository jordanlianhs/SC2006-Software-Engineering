import Header from '../common/header/DefaultHeader';
import ChangePassword from '../dashboard/my-profile/ChangePassword';

const index = ({uidb64, token}) => {
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!-- Our Dashbord --> */}
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                

                <div className="col-lg-12 mb10">
                  <div className="breadcrumb_content style2">
                    <h2 className="breadcrumb_title">Confirm Reset Password</h2>
                    <p>Enter your new password</p>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-12">
                  {/* End profile info wrapper end */}

                  <div className="my_dashboard_review mt30">
                    <div className="row">
                      <div className="col-xl-2">
                        <h4>Change password</h4>
                      </div>
                      <div className="col-xl-10">
                        <ChangePassword uidb64={uidb64} token={token}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>© JFC Property</p>
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
