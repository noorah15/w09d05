import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { login2, logout2 } from "./../../reducers/login";
import { useDispatch, useSelector } from "react-redux";
import GoogleLogout2 from "./../GoogleLogout2";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return state;
  });
  return (
    <div>
      {localStorage.getItem("ID") ? (
        <>
          <Link to="/user">user</Link>
          <br />
          <Link to="/all">all</Link>
          <br />

          <button
            onClick={() => {
              const data = {
                token: "",
                role: "",
                ID: "",
              };

              dispatch(logout2(data));
              navigate("/");
            }}
          >
            logout{" "}
          </button>
        </>
      ) : (
        <GoogleLogout2 />
      )}
    </div>
  );
}
