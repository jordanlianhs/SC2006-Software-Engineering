import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import ForgotPassword from "../components/forgot-password";

const index = () => {
  return (
    <>
      <Seo pageTitle="Login" />
      <ForgotPassword />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });