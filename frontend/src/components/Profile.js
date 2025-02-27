import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const [citizen, setCitizen] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCitizen = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/profile/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCitizen(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error.response.data.error);
      } finally {
        setLoading(false);
      }
    };
    fetchCitizen();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!citizen) return <p>Citizen not found.</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Citizen Profile</h2>
      <p><strong>Name:</strong> {citizen.name}</p>
      <p><strong>Gender:</strong> {citizen.gender}</p>
      <p><strong>DOB:</strong> {citizen.dob}</p>
      <p><strong>Household ID:</strong> {citizen.household_id}</p>
      <p><strong>Education:</strong> {citizen.educational_qualification}</p>
      <p><strong>Role:</strong> {citizen.role}</p>
    </div>
  );
};

export default Profile;
