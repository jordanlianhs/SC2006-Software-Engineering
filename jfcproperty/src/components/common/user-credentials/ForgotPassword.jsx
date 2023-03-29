import React from "react";

const ForgotPassword = () => {
  return (
    <div className="forgot-password container">
      <h2>Reset Your Password</h2>
      <p>Please enter your email address to receive a password reset link.</p>
      <form action="#">
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email Address"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
