import Link from "next/link";
import { useRouter } from "next/router";
import MyAccount from "./MyAccount";
import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const LoggedInHeaderMenuContent = ({ float = "" }) => {
  const route = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const usernameCookie = cookies.get('username');
    const emailCookie = cookies.get('email');
    if (usernameCookie) {
      setUsername(usernameCookie);
    }
    if (emailCookie) {
      setEmail(emailCookie);
    }
  }, []);

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

  return (
    <ul
      id="respMenu"
      className="ace-responsive-menu text-end d-lg-block d-none"
      data-menu-style="horizontal"
    >
      <li className="dropitem">
        <Link href="/">
          <a className={
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


      <li className="user_setting">
        <div className="dropdown">
          <a className="btn dropdown-toggle" href="#" data-bs-toggle="dropdown">
            {/* <img
              className="rounded-circle"
              src="/assets/images/team/e1.png"
              alt="e1.png"
            /> */}
            <p className="btn flaticon-user"></p>
            <span className="dn-1199 ms-1">{username}</span>
          </a>
          <div className="dropdown-menu">
            <MyAccount username={username} email={email}/>
          </div>
        </div>
      </li>
      {/* End ."user_setting */}
    </ul>
  ); 
};

export default LoggedInHeaderMenuContent;
