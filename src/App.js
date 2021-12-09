import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Userpage from "./components/Userpage";
import Allpage from "./components/Allpage";
import Header from "./components/Header";
import Home from "./components/Home";
import { login2, logout2 } from "./reducers/login";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
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
