import Link from "next/link";
import { useRouter } from "next/router";

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
          href="#"
          className="btn flaticon-user"
          data-bs-toggle="modal"
          data-bs-target=".bd-example-modal-lg"
        >
          <span className="dn-lg">Login/Register</span>
        </a>
      </li>
      {/* End .dropitem */}

    </ul>
  );
};

export default HeaderMenuContent;
