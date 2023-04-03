import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';
//import Cookie from 'js-cookie'

const cookies = new Cookies();

const HeaderMenuContent = ({ float = "" }) => {

  const [username, setUsername] = useState('');

  useEffect(() => {
    const usernameCookie = cookies.get('username');
    if (usernameCookie) {
      setUsername(usernameCookie);
    }
  }, []);

  console.log(username)

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

  if (username)
    return (
      <ul
        id="respMenu"
        className="ace-responsive-menu text-end d-lg-block d-none"
        data-menu-style="horizontal"
      >
        <li className="dropitem">
          <Link href="/">
            <a
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


        <li className={`list-inline-item list_s ${float}`}>
          <a
            href="http://127.0.0.1:3000/my-profile"
            className="btn flaticon-user"
            // data-bs-toggle="modal"
            // data-bs-target=".bd-example-modal-lg"
          >
            <span className="dn-lg">{username}</span>
          </a>
        </li>
        {/* End .dropitem */}

      </ul>
    );
    return (
      <ul
        id="respMenu"
        className="ace-responsive-menu text-end d-lg-block d-none"
        data-menu-style="horizontal"
      >
        <li className="dropitem">
          <Link href="/">
            <a
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
  
  
        <li className={`list-inline-item list_s ${float}`}>
          <a
            href="http://127.0.0.1:8000/login/"
            className="btn flaticon-user"
            // data-bs-toggle="modal"
            // data-bs-target=".bd-example-modal-lg"
          >
            <span className="dn-lg">Login/Signup</span>
          </a>
        </li>
        {/* End .dropitem */}
  
      </ul>
    );
};

export default HeaderMenuContent;
