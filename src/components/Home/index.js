import React from "react";
import Login from "./../Login";
import Signup from "./../Signup";
import Userpage from "./../Userpage";
import Allpage from "./../Allpage";
import Header from "./../Header";
import { login2, logout2 } from "./../../reducers/login";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import GoogleLogin2 from "./../GoogleLogin2";
import GoogleLogout2 from "./../GoogleLogout2";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return state;
  });
  return (
    <div>
      {!localStorage.getItem("token") ? (
        <>
          <Login />
          <br />
          <br />
          <hr />
          <br />
          <br />
          <Signup />
          <br />
          <br />
          <hr />
          <br />
          <br />

          <GoogleLogin2 />
        </>
      ) : (
        <>
          {localStorage.getItem("role") === "61a48b1362b112055163b916" ? (
            <>{navigate(`/user`)}</>
          ) : (
            <>
              <h1>Hello admin</h1>
            </>
          )}
        </>
      )}
    </div>
  );
}
