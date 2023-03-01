import Link from "next/link";
import Form from "./Form";

const ErrorPageContent = () => {
  return (
    <div className="error_page footer_apps_widget">
      <img
        className="img-fluid img-thumb"
        src="/assets/images/resource/error.png"
        alt="error.png"
      />
      <div className="erro_code">
        <h1>JFC Property - 404 Page</h1>
      </div>
      <p>Sorry the page you're looking for doesn't exist!</p>

      <Form />
      {/* End form */}

      <Link href="http://localhost:3000">
        <a className="btn btn_error btn-thm">Back To Home</a>
      </Link>
    </div>
  );
};

export default ErrorPageContent;
