import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import HeaderMenuContent from "../common/header/HeaderMenuContent";
import LoggedInHeaderMenuContent from "../common/header/dashboard/LoggedInHeaderMenuContent";
  
const cookies = new Cookies();

const Header = () => {
  const [navbar, setNavbar] = useState(false);

  const username = cookies.get('username')
  const email = cookies.get('email')

  // const [username, setUsername] = useState('');

  // useEffect(() => {
  //   const usernameCookie = cookies.get('username');
  //   if (usernameCookie) {
  //     setUsername(usernameCookie);
  //   }
  // }, []);

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
        className={`header-nav menu_style_home_one navbar-scrolltofixed stricky main-menu  ${
          navbar ? "stricky-fixed " : ""
        }`}
      >
        <div className="container-fluid p0">
          {/* <!-- Ace Responsive Menu --> */}

          <Link href="/">
            <a className="navbar_brand float-start dn-smd">
              <img
                className="logo1 img-fluid"
                src="/assets/images/header-logo.png"
                alt="header-logo.png"
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
        className={`header-nav menu_style_home_one navbar-scrolltofixed stricky main-menu  ${
          navbar ? "stricky-fixed " : ""
        }`}
      >
        <div className="container-fluid p0">
          {/* <!-- Ace Responsive Menu --> */}

          <Link href="/">
            <a className="navbar_brand float-start dn-smd">
              <img
                className="logo1 img-fluid"
                src="/assets/images/header-logo.png"
                alt="header-logo.png"
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
