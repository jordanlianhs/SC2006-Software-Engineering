import Link from "next/link";

const Form = () => {
  return (
    <form action="#">
      <div className="heading text-center">
        <h3>Register to your account</h3>
        <p className="text-center">
          Already have an account?{" "}
          <Link href="/login">
            <a className="text-thm">Login</a>
          </Link>
        </p>
      </div>
      {/* End .heading */}

      <div className="form-group input-group  ">
        <input
          type="email"
          className="form-control"
          required
          placeholder="Email"
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fa fa-envelope-o"></i>
          </div>
        </div>
      </div>
      {/* End .form-group */}

      <div className="form-group input-group  ">
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
      {/* End .form-group */}

      <div className="form-group input-group  ">
        <input
          type="password"
          className="form-control"
          required
          placeholder="Re-enter password"
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-password"></i>
          </div>
        </div>
      </div>
      {/* End .form-group */}

      

      <button type="submit" className="btn btn-log w-100 btn-thm">
        Register
      </button>
      {/* login button */}

      
    </form>
  );
};

export default Form;
