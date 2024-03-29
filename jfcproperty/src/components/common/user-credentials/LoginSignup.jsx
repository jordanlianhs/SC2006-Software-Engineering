import React from "react";
import Link from "next/link";

const LoginSignup = () => {
    return (
        <div className="modal-content">
            <div className="modal-header">
                <button
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    className="btn-close"
                ></button>
            </div>
            {/* End .modal-header */}

            <div className="modal-body container pb20">
                <div className="row">
                    <div className="col-lg-12">
                        <ul
                            className="sign_up_tab nav nav-tabs"
                            id="myTab"
                            role="tablist"
                        >
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    id="home-tab"
                                    data-bs-toggle="tab"
                                    href="#home"
                                    role="tab"
                                    aria-controls="home"
                                    aria-selected="true"
                                >
                                    Login
                                </a>
                            </li>
                            {/* End login tab */}

                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    id="profile-tab"
                                    data-bs-toggle="tab"
                                    href="#profile"
                                    role="tab"
                                    aria-controls="profile"
                                    aria-selected="false"
                                >
                                    Register
                                </a>
                            </li>
                            {/* End Register tab */}
                        </ul>
                        {/* End .sign_up_tab */}
                    </div>
                </div>
                {/* End .row */}

                <div className="tab-content container" id="myTabContent">
                    <div
                        className="row mt25 tab-pane fade show active"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                    >
                        <div className="col-lg-6 col-xl-6">
                            <div className="login_thumb">
                                <img
                                    className="img-fluid w100"
                                    src="/assets/images/resource/regstr.jpg"
                                    alt="regstr.jpg"
                                />
                            </div>
                        </div>
                        {/* End col */}

                        <div className="col-lg-6 col-xl-6">
                            <div className="login_form">
                                <form action="#">
                                    <div className="heading">
                                        <h4>Login</h4>
                                    </div>
                                    {/* End heading */}

                                    
                                    <hr />

                                    <div className="input-group mb-2 mr-sm-2">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inlineFormInputGroupUsername2"
                                            placeholder="Insert Email Address"
                                        />
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <i className="flaticon-user"></i>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End input-group */}

                                    <div className="input-group form-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Password"
                                        />
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <i className="flaticon-password"></i>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End input-group */}

                                    <div className="form-group form-check custom-checkbox mb-3">
                                        <Link href="/forgot-password">
                                            <a className="btn-fpswd float-end">Lost your password?</a>
                                        </Link>
                                    </div>
                                    {/* End remember me checkbox */}

                                    <button
                                        type="submit"
                                        className="btn btn-log w-100 btn-thm"
                                    >
                                        Log In
                                    </button>
                                    {/* End submit button */}
                                </form>
                            </div>
                            {/* End .col .login_form */}
                        </div>
                    </div>
                    {/* End .tab-pane */}

                    <div
                        className="row mt25 tab-pane fade"
                        id="profile"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                    >
                        <div className="col-lg-6 col-xl-6">
                            <div className="regstr_thumb">
                                <img
                                    className="img-fluid w100"
                                    src="/assets/images/resource/regstr.jpg"
                                    alt="regstr.jpg"
                                />
                            </div>
                        </div>
                        {/* End . left side image for register */}

                        <div className="col-lg-6 col-xl-6">
                            <div className="sign_up_form">
                                <div className="heading">
                                    <h4>Register</h4>
                                </div>
                                {/* End .heading */}

                                <form action="#">

                                    <hr />


                                    <div className="form-group input-group  mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="exampleInputEmail2"
                                            placeholder="Email"
                                        />
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <i className="fa fa-envelope-o"></i>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End .row */}

                                    <div className="form-group input-group  mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="exampleInputPassword2"
                                            placeholder="Password"
                                        />
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <i className="flaticon-password"></i>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End .row */}

                                    <div className="form-group input-group  mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="exampleInputPassword3"
                                            placeholder="Re-enter password"
                                        />
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <i className="flaticon-password"></i>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End .row */}

                                    <button
                                        type="submit"
                                        className="btn btn-log w-100 btn-thm"
                                    >
                                        Sign Up
                                    </button>
                                    {/* End btn */}

                                </form>
                                {/* End .form */}
                            </div>
                        </div>
                        {/* End register content */}
                    </div>
                    {/* End .tab-pane */}
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
