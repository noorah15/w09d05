import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function CompleteResetPassword() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const reset = async () => {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/user/completeResetPassword/${id}`,
      { id, password }
    );
    console.log(result);

    //navigate(`/`);
  };

  return (
    <div>
      <h1>CompleteResetPassword</h1>

      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={() => reset()}> reset </button>
    </div>
  );
}
