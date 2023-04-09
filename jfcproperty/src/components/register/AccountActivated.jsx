import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

// currently the link in activate_account does not bring me to this component

function AccountActivated() {
  const router = useRouter();
  const { uidb64, token } = router.query;

  useEffect(() => {
    const csrftoken = Cookies.get('csrftoken'); // Get the csrf token from the cookie
    const activationData = { uidb64, token }; // Create the activation data object

    // Send a post request to activate the user account with csrf token
    fetch(`http://127.0.0.1:8000/activate/${uidb64}/${token}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(activationData),
      credentials: 'include',
    })
    .then((response) => {
        console.log('Response: ', response)
        return response.json();
    })
    .then((data) => {
    if (data.success) {
        setSuccess(true);
        console.log("redirect");
    } else {
        throw new Error('Registration failed');
    }
    })
    .catch((error) => {
        console.error(error);
        setError('Registration Failed'); // Update error state with an error message
    });
  }, [uidb64, token]);

  return (
    <div>
      <p>Your account has been activated. You can login with your new account.</p>
      <button onClick={() => router.push('/login')}>Go to Login</button>
    </div>
  );
}

export default AccountActivated;
