import Link from "next/link";
import { useRouter } from 'next/router';
import { useState } from "react";
import Cookies from 'universal-cookie'

const cookies = new Cookies();

const Form = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // Initialize error state to null
  const [success, setSuccess] = useState(); // Initialize error state to null

  function handleSubmit(event) {
    const csrftoken = cookies.get('csrftoken')
    console.log("csrftoken cookie: ", csrftoken)
    event.preventDefault();

    console.log(password)
    console.log(confirmPassword)

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);

    fetch('http://127.0.0.1:8000/register/', {
      method: 'POST',
      body: formData,
      credentials: 'include',
      headers: {
        'X-CSRFToken': csrftoken,
      },
    })
      .then((response) => {
        console.log('Response: ', response)
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setSuccess(true);
          console.log("redirect");
          router.push('/login'); // Redirect to home page
        } else {
          throw new Error('Registration failed');
        }
      })
      .catch((error) => {
        console.error(error);
        setError('Registration Failed'); // Update error state with an error message
      });
  }

  return (
    <form onSubmit={handleSubmit}>
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
          type="username"
          className="form-control"
          required
          placeholder="Username"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
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
          type="email"
          className="form-control"
          required
          placeholder="Email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
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
      {/* End .form-group */}

      <div className="form-group input-group  ">
        <input
          type="password"
          className="form-control"
          required
          placeholder="Re-enter password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}

        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-password"></i>
          </div>
        </div>
      </div>
      {/* End .form-group */}

      {error && <p className="text-danger">{error}</p>} {/* Display error message if error state is not null */}

      <button type="submit" className="btn btn-log w-100 btn-thm">
        Register
      </button>
      {/* register button */}

      
    </form>
  );
};

export default Form;
