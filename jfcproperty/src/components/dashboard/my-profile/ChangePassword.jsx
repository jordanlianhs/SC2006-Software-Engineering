import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const ChangePassword = ({ uidb64, token }) => {
  const [pwReset, setPwReset] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [error, setError] = useState('');

  const handleClick = () => {
    
      if (password !== checkPassword) {
        setPwReset(false);
        setError('Passwords do not match');
      } else if (!isPasswordValid(password)) {
        setPwReset(false);
        setError('Password does not fulfill requirements.');
      } else {
        const csrftoken = cookies.get('csrftoken')
        console.log("csrftoken cookie: ", csrftoken)

        event.preventDefault();

        const formData = new FormData();
        formData.append('password', password);

        if (uidb64 && token) {
          formData.append('uid', uidb64);
          formData.append('token', token);

          console.log('running forgot password')
          console.log(uidb64, token)

          fetch(`http://127.0.0.1:8000/reset/${uidb64}/${token}/`, {
            method: 'POST',
            body: formData,
            credentials: 'include',
            headers: {
              'X-CSRFToken': csrftoken,
            },
          })
          .then((response) => {return response.json();})
          .then((data) => {
            console.log('data.success: ', data.success)
            if (data.success) {
              console.log("redirect");
              console.log('data.link_expired: ', data.link_expired);
              setError();
              setPwReset(true);
            } 
            else if (data.success == false) {
              setPwReset(false);
              setError('There was an error with the reset password link you clicked. Please go to Login/Sign-up -> Forgot Password? to get a new verification link.');

            }
            else {
              setPwReset(false);
              setError('The reset password link you clicked is not valid or has expired. Please check your inbox and click on the latest reset password link. If your link has expired, Go to Login/Sign-up -> Forgot Password? to get a new verification link.');
            }
            })
        }
        else {
          fetch('http://127.0.0.1:8000/password_change/', {
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
              setPwReset(true);
              setError();
            } else {
              throw new Error('Change password failed');
            }
          })
          .catch((error) => {
            console.error(error);
            setError('Password does not fulfill requirements.'); // Update error state with an error message
          });
      }
    }
  };

  const isPasswordValid = (password) => {
    // Password must contain at least 8 characters, including both upper and lower case alphabets and at least 1 special character.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password);
  }

  return (
    <>
      <div>
          {pwReset && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-3 py-1 rounded relative" role="alert">
              <strong className="font-bold ">Success!</strong>
              <span className="block sm:inline"> Password updated successfully. You can login with your new password now.</span>
              <style jsx>{`
                  .bg-green-100 {
                  margin-bottom: 13px;
                  }
              `}</style>
              </div>
          )}
      </div>

      <div className="row">
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleNewPass">New Password</label>
            <input
              type="password"
              className="form-control"
              id="formGroupExampleNewPass"
              placeholder="Enter your new password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleConfPass">
              Confirm New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="formGroupExampleConfPass"
              placeholder="Re-enter your new password"
              value={checkPassword}
              onChange={(event) => setCheckPassword(event.target.value)}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="my_profile_setting_input" style={{ marginBottom: '1.5rem' }}>
          <p>Please ensure your password:</p>
          <ul>
            <li>Contains at least 8 characters</li>
            <li>Includes both upper and lower case alphabets</li>
            <li>Has at least 1 numeric character</li>
            <li>Has at least 1 special character</li>
          </ul>
        </div>

        <div className="col-xl-12">
          <div className="my_profile_setting_input">
            <button onClick={handleClick} className="btn btn2">Update Password</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </div>
        {/* End .col */}
      </div>
    </>
  );
};

export default ChangePassword;
