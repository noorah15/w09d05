import React from "react";
import { GoogleLogin } from "react-google-login";
// refresh token
import { refreshTokenSetup } from "./../../utils/refreshToken";
import { useNavigate } from "react-router";

const clientId =
  "707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com";

function GoogleLogin2() {
  const navigate = useNavigate();

  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res.profileObj);
    alert(`Logged in successfully welcome ${res.profileObj.name}`);
    refreshTokenSetup(res);
    localStorage.setItem("token", res.accessToken);
    console.log(res);
    navigate("/all");
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    alert(`Failed to login.`);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
        isSignedIn={true}
      />
    </div>
  );
}

export default GoogleLogin2;
