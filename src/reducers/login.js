const instialState = {
  role: "",
  token: "",
  ID: "",
  avter: "",
  username: "",
};

const signIn = (state = instialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      const { role, token, ID, avter, username } = payload;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("ID", ID);
      localStorage.setItem("avter", avter);
      localStorage.setItem("username", username);
      return { role, token, ID, avter, username };
    case "LOGOUT":
      localStorage.clear();
      return payload;

    default:
      return state;
  }
};

export default signIn;

export const login2 = (data) => {
  return {
    type: "LOGIN",
    payload: data,
  };
};

export const logout2 = (data) => {
  return {
    type: "LOGOUT",
    payload: data,
  };
};
