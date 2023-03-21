import Link from "next/link";
import { useRouter } from "next/router";
import MyAccount from "./MyAccount";

const HeaderMenuContent = ({ float = "" }) => {
  const route = useRouter();

  const home = [
    {
      id: 1,
      name: "Home 1",
      routerPath: "/",
    }  ];

  const compareFlats = [
    {
      id: 1,
      name: "Compare Flat 1",
      routerPath: "/compare",
    }
  ]
  
  const contact = [
    {
      id: 1, 
      name:"Contact 1",
      routerPath: "/contact",
    }
  ]

  return (
    <ul
      id="respMenu"
      className="ace-responsive-menu text-end d-lg-block d-none"
      data-menu-style="horizontal"
    >
      <li className="dropitem">
        <Link href="/">
          <a
            href="/"
            className={
              home.some((page) => page.routerPath === route.pathname)
                ? "ui-active"
                : undefined
            }
          >
            <span className="title">Home</span>
          </a>
        </Link>
      </li>


      <li className="2">
        <Link href="/compare">
          <a
            className={route.pathname === "/compare" ? "ui-active" : undefined}
          >
            Compare Flats
          </a>
        </Link>
      </li>
      {/* End .dropitem */}

      <li className="4">
        <Link href="/contact">
          <a
            className={route.pathname === "/contact" ? "ui-active" : undefined}
          >
            Contact
          </a>
        </Link>
      </li>
      {/* End .dropitem */}

      <li className="user_setting">
        <div className="dropdown">
          <a className="btn dropdown-toggle" href="#" data-bs-toggle="dropdown">
            <img
              className="rounded-circle"
              src="/assets/images/team/e1.png"
              alt="e1.png"
            />
            <span className="dn-1199 ms-1">SMALL SHEEP</span>
          </a>
          <div className="dropdown-menu">
            <MyAccount />
          </div>
        </div>
      </li>
      {/* End ."user_setting */}
    </ul>
  ); 
};

export default HeaderMenuContent;
