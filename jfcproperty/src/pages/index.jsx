import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import HomeMain from "../components/home";

/*
import Chatbot from "../app/chatbot";

function App() {
  return (
    <div className="App">
      {}
      <Chatbot />
    </div>
  );
}
*/

const getCsrfToken = async () => {
  const response = await fetch('http://127.0.0.1:8000/get_csrf_token/', {
    method: 'GET',
    credentials: 'include',
  });
  const data = await response.json();
  console.log("csrf token:",data.csrf_token)
  document.cookie = `csrftoken=${data.csrf_token}; path=/;`;
  return data.csrf_token;
};

const index = () => {
  getCsrfToken();
  return (
    <>
      <Seo pageTitle="Home-1" />
      <HomeMain />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
