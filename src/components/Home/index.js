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
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

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
          <Tabs variant="enclosed">
            <TabList>
              <Tab>Login</Tab>
              <Tab>Signup</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>

          <br />
          <br />
          <hr />
          <br />
          <br />

          <br />
          <br />
          <hr />
          <br />
          <br />

          <GoogleLogin2 />
        </>
      ) : (
        <>
          <>{navigate(`/user`)}</>
          {/* {localStorage.getItem("role") === "61a48b1362b112055163b916" ? (
            
          ) : (
            <>
              <h1>Hello admin</h1>
            </>
          )} */}
        </>
      )}
    </div>
  );
}
