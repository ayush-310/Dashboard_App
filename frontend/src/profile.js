import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import DataDisplay from "./components/DataDisplay"

const Profile = () => {
    const { user, isAuthenticated, isLoading, logout } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            <div className="home">

                {/* Topbar  */}
                <div className="top-bar">
                    <div className="aa">
                        <img src={user.picture} alt={user.name} />
                        <div>
                            <h2>{user.name}</h2>
                            <p>{user.email}</p>
                        </div>
                    </div>
                    <h1 className="text">Product Analytics Dashboard</h1>

                    <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
                </div>

                <DataDisplay />            </div>

        )
    );
};

export default Profile;