import React from 'react';
import Header from "@/components/Header.jsx";
import AuthRoute from "@/components/AuthRoute.jsx";

const Profile = () => {
    return (
        <AuthRoute>
            <div>
                <Header/>
                Profile
            </div>
        </AuthRoute>
    );
};

export default Profile;