import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPass() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const reset = async () => {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/user/resetPassword`,
      { email }
    );
    console.log(result);

    //navigate(`/`);
  };

  return (
    <div>
      <h1>ResetPass</h1>

      <input
        type="email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={() => reset()}> reset </button>
    </div>
  );
}
