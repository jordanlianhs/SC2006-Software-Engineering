import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState(null); // Initialize error state to null
  
  function handleSubmit(event) {
    const csrftoken = cookies.get('csrftoken')
    console.log("csrftoken cookie: ", csrftoken)

    event.preventDefault();

    const formData = new FormData();
    formData.append('email', email);

    fetch('http://127.0.0.1:8000/password_reset/', {
      method: 'POST',
      body: formData,
      credentials: 'include',
      headers: {
        'X-CSRFToken': csrftoken,
      },
    })
      .then((response) => {return response.json();})
      .then((data) => {
        if (data.success) {
          console.log("redirect");
          setSuccess(true);
        } else if (!data.success){
          setError('Email could not be sent to the given email address. Please check that you have entered the correct email address.');
        }
        else if (data == 'user_dont_exist'){
          setError('Email could not be sent to the given email address. Please check that you have entered the correct email address.');
        }
      })
    }

  return (
    <>
      {success && <p className="text-alert">
        Password reset email sent.
        We have emailed you instructions for setting your password, if an account exists with the email you entered. 
        You should receive them shortly. If you do not receive an email, please make sure you have entered the email 
        address you have registered with, and check your spam folder.
        </p>}

      <div className="forgot-password container">
        <h2>Reset Your Password</h2>
        <p>Please enter your email address to receive a password reset link.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Send Reset Link
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
