import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import HeaderMenuContent from "./HeaderMenuContent";
import LoggedInHeaderMenuContent from "./dashboard/LoggedInHeaderMenuContent";

const cookies = new Cookies();

const Header = () => {
  const username = cookies.get('username')
  const email = cookies.get('email')

  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 95) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  if (username)
    return (
      <header
        className={`header-nav menu_style_home_one style2 navbar-scrolltofixed stricky main-menu  ${
          navbar ? "stricky-fixed " : ""
        }`}
      >
        <div className="container-fluid p0">
          {/* <!-- Menu Toggle btn--> */}
          <Link href="/">
            <a className="navbar_brand float-start dn-smd">
              <img
                className="logo1 img-fluid"
                src="/assets/images/header-logo2.png"
                alt="header-logo2.png"
              />
              <img
                className="logo2 img-fluid"
                src="/assets/images/header-logo2.png"
                alt="header-logo2.png"
              />
              <span>JFC Property</span>
            </a>
          </Link>
          {/* site logo brand */}

          <nav>
            <LoggedInHeaderMenuContent />
          </nav>
          {/* End .navbar */}
        </div>
      </header>
      // {/* <!-- /.theme-main-menu --> */}
    );
    return (
      <header
        className={`header-nav menu_style_home_one style2 navbar-scrolltofixed stricky main-menu  ${
          navbar ? "stricky-fixed " : ""
        }`}
      >
        <div className="container-fluid p0">
          {/* <!-- Menu Toggle btn--> */}
          <Link href="/">
            <a className="navbar_brand float-start dn-smd">
              <img
                className="logo1 img-fluid"
                src="/assets/images/header-logo2.png"
                alt="header-logo2.png"
              />
              <img
                className="logo2 img-fluid"
                src="/assets/images/header-logo2.png"
                alt="header-logo2.png"
              />
              <span>JFC Property</span>
            </a>
          </Link>
          {/* site logo brand */}

          <nav>
            <HeaderMenuContent />
          </nav>
          {/* End .navbar */}
        </div>
      </header>
      // {/* <!-- /.theme-main-menu --> */}
    );
};

export default Header;
