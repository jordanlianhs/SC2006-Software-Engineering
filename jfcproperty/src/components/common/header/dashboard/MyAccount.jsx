import Link from "next/link";
import { useRouter } from "next/router";
import { isSinglePageActive } from "../../../../utils/daynamicNavigation";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const MyAccount = (props) => {
  const { username, email } = props;

  const profileMenuItems = [
    { id: 1, name: "My Profile", ruterPath: "/my-profile" },
    { id: 2, name: " My Favourites", ruterPath: "/my-favourites" },
    { id: 3, name: " Log out", ruterPath: "/" },
  ];
  const route = useRouter();

  const handleLogout = () => {
    console.log("Logout clicked");
    const csrftoken = cookies.get("csrftoken");
    fetch("http://127.0.0.1:8000/logout/", {
      method: "POST",
      credentials: "include",
      headers: {
        "X-CSRFToken": csrftoken,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("redirect");
          route.push("/"); // Redirect to home page
        } else {
          throw new Error("Login failed");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="user_set_header">
        <div style={{ display: "flex", justifyContent: "normal" }}>
          <img
            src="/assets/images/team/user1.png"
            alt="user1.png"
            style={{ marginRight: "10px" }}
          />
          <p style={{ margin: "auto 0 10px 0" }}>{username}</p>
        </div>
        <p className="address">{email}</p>
      </div>

      {/* End user_set_header */}

      <div className="user_setting_content">
        {profileMenuItems.map((item) => (
          <Link href={item.ruterPath} key={item.id}>
            <a
              className="dropdown-item"
              style={
                isSinglePageActive(`${item.ruterPath}`, route.pathname)
                  ? { color: "#ff5a5f" }
                  : { color: "black" }
              }
              onClick={item.ruterPath === "/" ? handleLogout : null}
            >
              {item.name}
            </a>
          </Link>
        ))}
      </div>
    </>
  );
};

export default MyAccount;
