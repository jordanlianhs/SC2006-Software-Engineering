import Link from "next/link";

const Form = () => {
  return (
    <form action="#">
      <div className="heading text-center">
        <h3>Login to your account</h3>
        <p className="text-center">
          Dont have an account?{" "}
          <Link href="/register">
            <a className="text-thm">Sign Up!</a>
          </Link>
        </p>
      </div>
      {/* End .heading */}

      <div className="input-group mb-2 mr-sm-2">
        <input
          type="text"
          className="form-control"
          required
          placeholder="Key in your Email Address"
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-user"></i>
          </div>
        </div>
      </div>
      {/* End .input-group */}

      <div className="input-group form-group">
        <input
          type="password"
          className="form-control"
          required
          placeholder="Password"
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-password"></i>
          </div>
        </div>
      </div>
      {/* End .input-group */}

      <div className="form-group form-check custom-checkbox mb-3">

        <a className="btn-fpswd float-end" href="#">
          Forgot password?
        </a>
      </div>
      {/* End .form-group */}

      <button type="submit" className="btn btn-log w-100 btn-thm">
        Log In
      </button>
      {/* login button */}

      <div className="divide">
        <span className="lf_divider">Or</span>
        <hr />
      </div>
      {/* divider */}

    </form>
  );
};

export default Form;
