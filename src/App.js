import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { login2, logout2 } from "./reducers/login";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return state;
  });

  return (
    <>
      {!localStorage.getItem("token") ? (
        <>
          <Login />
          <br />
          <br />
          <hr />
          <br />
          <br />
          <Signup />
        </>
      ) : (
        <>
          {localStorage.getItem("role") === "61a48b1362b112055163b916" ? (
            <h1>Hello user</h1>
          ) : (
            <h1>Hello admin</h1>
          )}

          <button
            onClick={() => {
              const data = {
                token: "",
                role: "",
                ID: "",
              };

              dispatch(logout2(data));
            }}
          >
            logout{" "}
          </button>
        </>
      )}
    </>
  );
}

export default App;
