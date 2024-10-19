import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "./App.css"
import Profile from "./profile";

const LoginButton = () => {
    const { user, loginWithRedirect, isAuthenticated } = useAuth0();
    console.log(user);

    return (
        <div>
            {isAuthenticated ? (<Profile />) : (
                <div className="login-container">
                    <img
                        src="https://i.pinimg.com/736x/95/fe/7a/95fe7a6efd8ed2054a5552dda2d78731.jpg"
                        alt="Login Visual"
                        className="login-image"
                    />
                    <button className="login-button" onClick={() => loginWithRedirect()}>
                        Log In
                    </button>
                </div>)


            }
        </div>
    );
};

export default LoginButton;
