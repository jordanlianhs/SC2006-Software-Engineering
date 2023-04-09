import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const ProfileInfo = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isUpdated, setIsUpdated] = useState(false);
    const [error, setError] = useState(''); // Initialize error state to null
    const [profile, setProfile] = useState(null);

    function handleClick(event) {
        const csrftoken = cookies.get('csrftoken')
        const oldUsername = cookies.get('username')
        const oldEmail = cookies.get('email')
    
        console.log("csrftoken cookie: ", csrftoken)
    
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
    
        fetch(`http://127.0.0.1:8000/edit-profile/${oldUsername}/`, {
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
                setError('')
                console.log("redirect");
                cookies.set("username", username);
                cookies.set("email", email);
                //router.reload(); // Redirect to home page
                setIsUpdated(true);
            } else {
                setIsUpdated(false);
                throw new Error('Invalid email/username');
            }
          })
          .catch((error) => {
            console.error(error);
            setError('That username/email has been taken. Please enter a new username/email.'); // Update error state with an error message
          });
      }

    useEffect(() => {
        const usernameCookie = cookies.get('username');
        const emailCookie = cookies.get('email');
        if (usernameCookie) {
            setUsername(usernameCookie);
            setEmail(emailCookie);
        }
    }, []);

    // upload profile
    const uploadProfile = (e) => {
        setProfile(e.target.files[0]);
    };

    return (
        <>
            <div>
                {isUpdated && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-3 py-1 rounded relative" role="alert">
                    <strong className="font-bold ">Success!</strong>
                    <span className="block sm:inline"> User details updated successfully.</span>
                    <style jsx>{`
                        .bg-green-100 {
                        margin-bottom: 13px;
                        }
                    `}</style>
                    </div>
                )}
            </div>

            {error && <p className="text-danger">{error}</p>} {/* Display error message if error state is not null */}

            <div className="row">
                <div className="col-lg-6 col-xl-6">

                    <div className="my_profile_setting_input form-group">
                        <label htmlFor="formGroupExampleUsername">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="formGroupExampleUsername"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>

                    <div className="my_profile_setting_input form-group">
                        <label htmlFor="formGroupExampleEmail">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="formGroupExampleEmail"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                </div>
                {/* End .col */}

                <div className="col-xl-12 text-right">
                    <div className="my_profile_setting_input">
                        {/* <button className="btn btn1">View Public Profile</button> */}
                        <button onClick={handleClick} className="btn btn2">Update Profile</button>
                    </div>
                </div>
                {/* End .col */}
            </div>
        </>
    );
};

export default ProfileInfo;
