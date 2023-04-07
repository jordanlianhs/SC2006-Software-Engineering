import Link from "next/link";
import { useRouter } from 'next/router';
import { useState } from "react";
import Cookies from 'universal-cookie'

const cookies = new Cookies();

const Form = () => {
  const router = useRouter();
  const successMessage = router.query.successMessage;
  console.log(successMessage)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Initialize error state to null
  
  function handleSubmit(event) {
    const csrftoken = cookies.get('csrftoken')
    console.log("csrftoken cookie: ", csrftoken)
    event.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    fetch('http://127.0.0.1:8000/login/', {
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
          console.log("redirect")
          router.push('/'); // Redirect to home page
        } else {
          throw new Error('Login failed');
        }
      })
      .catch((error) => {
        console.error(error);
        setError('Invalid email or password'); // Update error state with an error message
      });
  }

  return (
    <> 
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-3 py-1 rounded relative" role="alert">
        <strong className="font-bold ">Registration Success! </strong>
        <span className="block sm:inline">{successMessage}</span>
        <style jsx>{`
            .bg-green-100 {
            margin-bottom: 13px;
            }
        `}</style>
        </div>
      )}

      <form onSubmit={handleSubmit}>
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
            className="form-control"
            required
            placeholder="Key in your Username or Email Address"
            type="text"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="flaticon-password"></i>
            </div>
          </div>
        </div>
        {/* End .input-group */}

        {error && <p className="text-danger">{error}</p>} {/* Display error message if error state is not null */}

        <div className="form-group form-check custom-checkbox mb-3">

          <a className="btn-fpswd float-end" href="/forgot-password">
            Forgot password?
          </a>
        </div>
        {/* End .form-group */}

        <button type="submit" className="btn btn-log w-100 btn-thm">
          Log In
        </button>
        {/* login button */}

      </form>

    </>
    
  );
};

export default Form;
