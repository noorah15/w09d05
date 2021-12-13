import React from "react";
import { GoogleLogout } from "react-google-login";
import { Link, useNavigate } from "react-router-dom";
import { login2, logout2 } from "./../../reducers/login";
import { useDispatch, useSelector } from "react-redux";

const clientId =
  "707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com";

function GoogleLogout2() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSuccess = () => {
    console.log("Logout made successfully");
    const data = {
      token: "",
      role: "",
      ID: "",
    };

    dispatch(logout2(data));
    navigate("/");

    alert("Logout made successfully");
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default GoogleLogout2;
