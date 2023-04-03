import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const ProfileInfo = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const usernameCookie = cookies.get('username');
        const emailCookie = cookies.get('email');
        if (usernameCookie) {
            setUsername(usernameCookie);
            setEmail(emailCookie);
        }
    }, []);

    const [profile, setProfile] = useState(null);

    // upload profile
    const uploadProfile = (e) => {
        setProfile(e.target.files[0]);
    };

    return (
        <div className="row">

            <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleEmail">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="formGroupExampleEmail"
                        placeholder={email}
                    />
                </div>
            </div>
            {/* End .col */}

            <div className="col-xl-12 text-right">
                <div className="my_profile_setting_input">
                    <button className="btn btn1">View Public Profile</button>
                    <button className="btn btn2">Update Profile</button>
                </div>
            </div>
            {/* End .col */}
        </div>
    );
};

export default ProfileInfo;
