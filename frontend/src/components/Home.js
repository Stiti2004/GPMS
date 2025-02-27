import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Citizen Management</h1>
      <p>Register a new citizen and manage their profile</p>
      <button onClick={() => navigate("/register")}>Register Citizen</button>
    </div>
  );
};

export default Home;
