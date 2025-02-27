import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    gender: "",
    dob: "",
    household_id: "",
    educational_qualification: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/register", formData);
      alert("Registration Successful! Citizen ID: " + response.data.citizen_id);
      navigate(`/profile/${response.data.citizen_id}`);
    } catch (error) {
      console.error("Registration failed:", error.response.data.error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Register Citizen</h2>
      <form onSubmit={handleSubmit} style={{ display: "inline-block", textAlign: "left" }}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input type="date" name="dob" onChange={handleChange} required />
        <input type="text" name="household_id" placeholder="Household ID" onChange={handleChange} required />
        <input type="text" name="educational_qualification" placeholder="Education" onChange={handleChange} required />
        <input type="text" name="role" placeholder="Role" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
