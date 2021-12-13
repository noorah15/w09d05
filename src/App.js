import "./App.css";

import Signup from "./components/Signup";
import Userpage from "./components/Userpage";
import Allpage from "./components/Allpage";
import Header from "./components/Header";
import Home from "./components/Home";
import ShowComments from "./components/ShowComments";
import CompleteResetPassword from "./components/CompleteResetPassword";
import ResetPass from "./components/ResetPass";
import { login2, logout2 } from "./reducers/login";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/reset-pass" element={<ResetPass />} />
        <Route
          exact
          path="user/completeResetPassword/:id"
          element={<CompleteResetPassword />}
        />

        <Route exact path="/showComments/:id" element={<ShowComments />} />
        <Route
          exact
          path="/user"
          element={
            <>
              <Header />
              <Userpage />
            </>
          }
        />
        <Route
          exact
          path="/all"
          element={
            <>
              <Header />
              <Allpage />
            </>
          }
        />
        {/* <Route exact path="/admin" element={<Fav />} />
        <Route exact path="/favorite" element={<Fav />} /> */}
        <Route path="*" element={<h1> 404 </h1>} />
      </Routes>
    </>
  );
}

export default App;
